// seeds/bookings.seed.ts — Initial seed data for confirmed bookings and occupied seats

import type { Booking } from '../src/modules/bookings/bookings.types.ts';

export interface ShowSeatSeed {
  showId: string;
  bookedSeats: string[];
}

// Initial permanently occupied seats per show
export const bookedSeatsSeed: ShowSeatSeed[] = [
  {
    showId: 's1', // Kalki 2898 AD — PVR Juhu
    bookedSeats: ['A1', 'A2', 'D5', 'D6', 'H1', 'H2'],
  },
  {
    showId: 's3', // Pushpa 2 — PVR Juhu
    bookedSeats: ['B3', 'B4', 'E5', 'E6', 'I9', 'I10'],
  },
  {
    showId: 's6', // Kalki 2898 AD — PVR Select Citywalk Delhi
    bookedSeats: ['C5', 'C6', 'C7', 'G1', 'G2', 'J5'],
  },
];

// Sample confirmed booking history
export const bookingsSeed: Booking[] = [
  {
    id: 'bkg_seed_101',
    showId: 's1',
    userId: 'user_rahul_99',
    seatNumbers: ['A1', 'A2'],
    totalAmount: 900,
    status: 'CONFIRMED',
    paymentId: 'pay_rzp_seed_001',
    createdAt: new Date('2024-12-19T08:30:00Z'),
  },
  {
    id: 'bkg_seed_102',
    showId: 's1',
    userId: 'user_priya_21',
    seatNumbers: ['D5', 'D6'],
    totalAmount: 1125,
    status: 'CONFIRMED',
    paymentId: 'pay_rzp_seed_002',
    createdAt: new Date('2024-12-19T09:15:00Z'),
  },
  {
    id: 'bkg_seed_103',
    showId: 's6',
    userId: 'user_amit_84',
    seatNumbers: ['C5', 'C6', 'C7'],
    totalAmount: 1500,
    status: 'CONFIRMED',
    paymentId: 'pay_rzp_seed_003',
    createdAt: new Date('2024-12-19T10:00:00Z'),
  },
];

