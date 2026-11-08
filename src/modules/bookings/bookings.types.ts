// modules/bookings/bookings.types.ts — TypeScript types for seat locking and booking engine

export type SeatStatus = 'AVAILABLE' | 'LOCKED' | 'BOOKED';

export type SeatCategory = 'NORMAL' | 'EXECUTIVE' | 'VIP';

export interface Seat {
  seatNumber: string; // e.g. "A1", "A2", "B1"
  row: string;        // "A", "B", "C"
  number: number;     // 1, 2, 3
  category: SeatCategory;
  price: number;
  status: SeatStatus;
  lockedBy?: string;  // userId if currently locked
  lockedUntil?: Date; // lock expiry time
}

export interface SeatMapResponse {
  showId: string;
  totalSeats: number;
  availableCount: number;
  lockedCount: number;
  bookedCount: number;
  seats: Seat[];
}

export interface LockSeatsInput {
  showId: string;
  seatNumbers: string[];
  userId: string;
}

export interface LockSeatsResult {
  success: boolean;
  showId: string;
  lockedSeats: string[];
  expiresInSeconds: number;
  expiresAt: string;
  message?: string;
}

export interface ConfirmBookingInput {
  showId: string;
  seatNumbers: string[];
  userId: string;
  paymentId: string;
  orderId: string;
  signature: string;
  customerEmail?: string | undefined;
  customerPhone?: string | undefined;
}

export interface Booking {
  id: string;
  showId: string;
  userId: string;
  seatNumbers: string[];
  totalAmount: number;
  status: 'CONFIRMED' | 'FAILED' | 'CANCELLED';
  paymentId: string;
  createdAt: Date;
}
