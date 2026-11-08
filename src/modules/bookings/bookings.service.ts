// modules/bookings/bookings.service.ts — Business logic for seat locking, seat map, and booking confirmation

import { showsRepository } from '../shows/shows.repository.ts';
import { bookingsRepository } from './bookings.repository.ts';
import { seatLockManager, LOCK_TTL_SECONDS } from './bookings.lock.ts';
import { razorpayService } from '../../integrations/payments/razorpay.ts';
import { emailService } from '../../integrations/messaging/email.ts';
import { whatsappService } from '../../integrations/messaging/whatsapp.ts';
import { NotFoundError, ConflictError, ValidationError } from '../../shared/errors.ts';
import type {
  Seat,
  SeatMapResponse,
  LockSeatsInput,
  LockSeatsResult,
  ConfirmBookingInput,
  Booking,
  SeatCategory,
} from './bookings.types.ts';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const SEATS_PER_ROW = 10;

export const bookingsService = {
  /**
   * Generates or fetches the dynamic seat layout combining:
   * 1. Permanent Booked seats from MongoDB/Repo (Red)
   * 2. Live Distributed Locked seats from Redis with remaining TTL (Grey)
   * 3. Available seats (Green)
   */
  async getSeatMap(showId: string): Promise<SeatMapResponse> {
    const show = showsRepository.findById(showId);
    if (!show) {
      throw new NotFoundError(`Show with id '${showId}'`);
    }

    const bookedSeats = bookingsRepository.getBookedSeats(showId);
    const activeLocks = await seatLockManager.getActiveLocksForShow(showId);

    const seats: Seat[] = [];
    let availableCount = 0;
    let lockedCount = 0;
    let bookedCount = 0;

    for (const row of ROWS) {
      for (let num = 1; num <= SEATS_PER_ROW; num++) {
        const seatNumber = `${row}${num}`;

        // Tier classification: Rows A-C = Normal, D-G = Executive, H-J = VIP
        let category: SeatCategory = 'NORMAL';
        let price = show.price;

        if (['D', 'E', 'F', 'G'].includes(row)) {
          category = 'EXECUTIVE';
          price = Math.round(show.price * 1.25);
        } else if (['H', 'I', 'J'].includes(row)) {
          category = 'VIP';
          price = Math.round(show.price * 1.6);
        }

        // Determine current status
        if (bookedSeats.has(seatNumber)) {
          bookedCount++;
          seats.push({
            seatNumber,
            row,
            number: num,
            category,
            price,
            status: 'BOOKED',
          });
        } else if (activeLocks.has(seatNumber)) {
          lockedCount++;
          const lockInfo = activeLocks.get(seatNumber)!;
          const lockedUntil = new Date(Date.now() + lockInfo.ttl * 1000);
          seats.push({
            seatNumber,
            row,
            number: num,
            category,
            price,
            status: 'LOCKED',
            lockedBy: lockInfo.userId,
            lockedUntil,
          });
        } else {
          availableCount++;
          seats.push({
            seatNumber,
            row,
            number: num,
            category,
            price,
            status: 'AVAILABLE',
          });
        }
      }
    }

    return {
      showId,
      totalSeats: seats.length,
      availableCount,
      lockedCount,
      bookedCount,
      seats,
    };
  },

  /**
   * Acquire atomic temporary lock for a user on one or more seats.
   */
  async lockSeats(input: LockSeatsInput): Promise<LockSeatsResult> {
    const { showId, seatNumbers, userId } = input;

    // 1. Verify show exists
    const show = showsRepository.findById(showId);
    if (!show) {
      throw new NotFoundError(`Show with id '${showId}'`);
    }

    // 2. Check if any seat is already permanently booked
    const alreadyBooked = bookingsRepository.areSeatsAlreadyBooked(showId, seatNumbers);
    if (alreadyBooked) {
      throw new ConflictError(`Seat '${alreadyBooked}' is already permanently booked`);
    }

    // 3. Attempt atomic distributed lock in Redis
    const lockResult = await seatLockManager.acquireLocks(showId, seatNumbers, userId, LOCK_TTL_SECONDS);

    if (!lockResult.acquired) {
      throw new ConflictError(
        `Seat '${lockResult.failedSeat}' is currently locked by another customer. Please choose other seats.`,
      );
    }

    const expiresAt = new Date(Date.now() + LOCK_TTL_SECONDS * 1000).toISOString();

    return {
      success: true,
      showId,
      lockedSeats: seatNumbers,
      expiresInSeconds: LOCK_TTL_SECONDS,
      expiresAt,
      message: `Seats reserved for ${LOCK_TTL_SECONDS / 60} minutes. Complete payment before timer expires.`,
    };
  },

  /**
   * Release / Unlock temporarily locked seats from Redis.
   */
  async unlockSeats(input: { showId: string; seatNumbers: string[]; userId: string }): Promise<{ success: boolean; releasedSeats: string[]; message: string }> {
    const { showId, seatNumbers } = input;

    // Verify show exists
    const show = showsRepository.findById(showId);
    if (!show) {
      throw new NotFoundError(`Show with id '${showId}'`);
    }

    // Release locks from Redis
    await seatLockManager.releaseSeats(showId, seatNumbers);

    return {
      success: true,
      releasedSeats: seatNumbers,
      message: `${seatNumbers.length} seat(s) released successfully from Redis lock.`,
    };
  },

  /**
   * Confirm booking: verifies payment, releases Redis lock, writes to DB, dispatches ticket.
   */
  async confirmBooking(input: ConfirmBookingInput): Promise<Booking> {
    const { showId, seatNumbers, userId, paymentId, orderId, signature, customerEmail, customerPhone } = input;

    // 1. Verify show exists
    const show = showsRepository.findById(showId);
    if (!show) {
      throw new NotFoundError(`Show with id '${showId}'`);
    }

    // 2. Verify Razorpay Payment Signature
    const isValidSignature = razorpayService.verifySignature(orderId, paymentId, signature);
    if (!isValidSignature) {
      throw new ValidationError('Invalid payment signature. Transaction verification failed.');
    }

    // 3. Verify user actually holds the lock on these seats
    for (const seat of seatNumbers) {
      const lockHolder = await seatLockManager.getLockHolder(showId, seat);
      if (lockHolder !== userId) {
        throw new ConflictError(`Lock on seat '${seat}' has expired or is held by another user.`);
      }
    }

    // 4. Calculate total amount
    const totalAmount = seatNumbers.length * show.price;
    const bookingId = `bkg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // 5. Create permanent booking record
    const booking: Booking = {
      id: bookingId,
      showId,
      userId,
      seatNumbers,
      totalAmount,
      status: 'CONFIRMED',
      paymentId,
      createdAt: new Date(),
    };

    bookingsRepository.createBooking(booking);

    // 6. Release Redis temporary locks
    await seatLockManager.releaseSeats(showId, seatNumbers);

    // 7. Trigger async notifications (Non-blocking)
    if (customerEmail) {
      emailService.sendBookingConfirmation(customerEmail, bookingId).catch(() => {});
    }
    if (customerPhone) {
      whatsappService.sendBookingConfirmation(customerPhone, bookingId, show.movie).catch(() => {});
    }

    return booking;
  },
};

