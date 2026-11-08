// modules/bookings/bookings.repository.ts — In-memory & MongoDB booking data layer

import type { Booking } from './bookings.types.ts';
import { bookingsSeed, bookedSeatsSeed } from '../../../seeds/bookings.seed.ts';

// Initial confirmed bookings loaded from standalone seed data
const confirmedBookings: Booking[] = [...bookingsSeed];

// In-memory set of permanently booked seats initialized from seed: showId -> Set of seatNumbers
const bookedSeatsStore = new Map<string, Set<string>>(
  bookedSeatsSeed.map(item => [item.showId, new Set<string>(item.bookedSeats)])
);

export const bookingsRepository = {
  /**
   * Get all permanently booked seats for a show.
   */
  getBookedSeats(showId: string): Set<string> {
    return bookedSeatsStore.get(showId) ?? new Set<string>();
  },

  /**
   * Check if any of the requested seats are already permanently booked.
   */
  areSeatsAlreadyBooked(showId: string, seatNumbers: string[]): string | null {
    const booked = this.getBookedSeats(showId);
    for (const seat of seatNumbers) {
      if (booked.has(seat)) {
        return seat;
      }
    }
    return null;
  },

  /**
   * Create a new confirmed booking and permanently mark seats as BOOKED.
   */
  createBooking(booking: Booking): Booking {
    confirmedBookings.push(booking);

    // Update booked seats cache/store
    const currentBooked = bookedSeatsStore.get(booking.showId) ?? new Set<string>();
    for (const seat of booking.seatNumbers) {
      currentBooked.add(seat);
    }
    bookedSeatsStore.set(booking.showId, currentBooked);

    return booking;
  },

  /**
   * Find booking by ID.
   */
  findById(bookingId: string): Booking | undefined {
    return confirmedBookings.find(b => b.id === bookingId);
  },
};

