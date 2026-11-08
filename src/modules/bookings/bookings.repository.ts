// modules/bookings/bookings.repository.ts — In-memory & MongoDB booking data layer

import type { Booking } from './bookings.types.ts';

// In-memory confirmed bookings storage (simulating permanent DB records)
const confirmedBookings: Booking[] = [
  {
    id: 'bkg_sample_1',
    showId: 's1',
    userId: 'user_sample',
    seatNumbers: ['A1', 'A2'],
    totalAmount: 900,
    status: 'CONFIRMED',
    paymentId: 'pay_sample_1',
    createdAt: new Date('2024-12-01T10:00:00Z'),
  },
];

// In-memory set of permanently booked seats: showId -> Set of seatNumbers
const bookedSeatsStore = new Map<string, Set<string>>([
  ['s1', new Set(['A1', 'A2'])],
  ['s6', new Set(['C5', 'C6', 'C7'])],
]);

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

