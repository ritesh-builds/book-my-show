// store/types.ts — TypeScript types for frontend seat state & booking flow

export type SeatStatus = 'AVAILABLE' | 'LOCKED' | 'BOOKED';
export type SeatCategory = 'NORMAL' | 'EXECUTIVE' | 'VIP';

export interface FrontendSeat {
  seatNumber: string;
  row: string;
  number: number;
  category: SeatCategory;
  price: number;
  status: SeatStatus;
  lockedBy?: string;
  lockedUntil?: string;
}

export interface ShowInfo {
  id: string;
  movie: string;
  cinema: string;
  hall: string;
  time: string;
  date: string;
  format: string;
  price: number;
}

