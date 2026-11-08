// store/seatSlice.ts — Redux Toolkit slice for interactive seat selection and locking

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FrontendSeat, ShowInfo } from './types';

interface SeatState {
  currentShow: ShowInfo;
  availableShows: any[];
  seats: FrontendSeat[];
  selectedSeatNumbers: string[]; // Seats the user is clicking on
  lockedSeatNumbers: string[];   // Seats successfully locked in Redis
  lockExpiresAt: string | null;  // ISO timestamp of 8-minute TTL expiry
  lockTimeRemaining: number;     // Remaining seconds for live countdown
  userId: string;
  isLocking: boolean;
  lockError: string | null;
  bookingSuccess: string | null;
}

const initialShow: ShowInfo = {
  id: 's1',
  movie: 'Kalki 2898 AD',
  cinema: 'PVR Juhu, Mumbai',
  hall: 'Screen 1',
  time: '10:00 AM',
  date: '2024-12-20',
  format: '3D IMAX',
  price: 450,
};

function getPersistentUserId(): string {
  if (typeof window === 'undefined') return 'user_server_default';
  let stored = localStorage.getItem('bms_user_id');
  if (!stored) {
    stored = `user_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('bms_user_id', stored);
  }
  return stored;
}

const initialState: SeatState = {
  currentShow: initialShow,
  availableShows: [],
  seats: [],
  selectedSeatNumbers: [],
  lockedSeatNumbers: [],
  lockExpiresAt: null,
  lockTimeRemaining: 0,
  userId: getPersistentUserId(),
  isLocking: false,
  lockError: null,
  bookingSuccess: null,
};

export const seatSlice = createSlice({
  name: 'seat',
  initialState,
  reducers: {
    // Populate available shows from GET /api/v1/shows
    setAvailableShows: (state, action: PayloadAction<any[]>) => {
      state.availableShows = action.payload;
    },

    // User switches to a different movie / show
    selectShow: (state, action: PayloadAction<ShowInfo>) => {
      state.currentShow = action.payload;
      state.selectedSeatNumbers = [];
      state.lockedSeatNumbers = [];
      state.lockTimeRemaining = 0;
      state.lockError = null;
      state.bookingSuccess = null;
    },

    // Populate seat grid from backend GET /api/v1/shows/:id/seats
    setSeatMap: (state, action: PayloadAction<FrontendSeat[]>) => {
      state.seats = action.payload;
    },

    // User toggles a seat on the UI
    toggleSeatSelection: (state, action: PayloadAction<string>) => {
      const seatNum = action.payload;
      const seat = state.seats.find(s => s.seatNumber === seatNum);

      // Cannot select booked or externally locked seats
      if (!seat || seat.status === 'BOOKED' || (seat.status === 'LOCKED' && !state.lockedSeatNumbers.includes(seatNum))) {
        return;
      }

      if (state.selectedSeatNumbers.includes(seatNum)) {
        state.selectedSeatNumbers = state.selectedSeatNumbers.filter(s => s !== seatNum);
      } else {
        if (state.selectedSeatNumbers.length >= 10) {
          state.lockError = 'Maximum 10 seats allowed per booking';
          return;
        }
        state.selectedSeatNumbers.push(seatNum);
        state.lockError = null;
      }
    },

    // Lock request in progress
    setLocking: (state, action: PayloadAction<boolean>) => {
      state.isLocking = action.payload;
    },

    // Lock acquired successfully via Redis
    setLockSuccess: (
      state,
      action: PayloadAction<{ showId?: string; lockedSeats: string[]; expiresAt: string; expiresInSeconds: number }>,
    ) => {
      state.isLocking = false;
      state.lockedSeatNumbers = action.payload.lockedSeats;
      state.lockExpiresAt = action.payload.expiresAt;
      state.lockTimeRemaining = action.payload.expiresInSeconds;
      state.lockError = null;

      // Cache active lock in localStorage for refresh resilience
      if (typeof window !== 'undefined') {
        const lockSession = {
          showId: action.payload.showId || state.currentShow.id,
          lockedSeats: action.payload.lockedSeats,
          expiresAt: action.payload.expiresAt,
          userId: state.userId,
        };
        localStorage.setItem('bms_active_lock', JSON.stringify(lockSession));
      }

      // Mark these seats as LOCKED locally
      state.seats = state.seats.map(s => {
        if (action.payload.lockedSeats.includes(s.seatNumber)) {
          return { ...s, status: 'LOCKED', lockedBy: state.userId };
        }
        return s;
      });
    },

    // Restore active lock from localStorage after page refresh
    restoreActiveLock: (
      state,
      action: PayloadAction<{
        showId: string;
        lockedSeats: string[];
        expiresAt: string;
        remainingSeconds: number;
      }>,
    ) => {
      state.lockedSeatNumbers = action.payload.lockedSeats;
      state.selectedSeatNumbers = action.payload.lockedSeats;
      state.lockExpiresAt = action.payload.expiresAt;
      state.lockTimeRemaining = action.payload.remainingSeconds;
      state.lockError = null;

      // Mark restored seats as LOCKED by this user
      state.seats = state.seats.map(s => {
        if (action.payload.lockedSeats.includes(s.seatNumber)) {
          return { ...s, status: 'LOCKED', lockedBy: state.userId };
        }
        return s;
      });
    },

    // Lock failed (Concurrency Conflict / 409)
    setLockError: (state, action: PayloadAction<string | null>) => {
      state.isLocking = false;
      state.lockError = action.payload;
    },

    // Live countdown tick (called every second)
    decrementTimer: (state) => {
      if (state.lockTimeRemaining > 0) {
        state.lockTimeRemaining -= 1;
      } else if (state.lockedSeatNumbers.length > 0) {
        // Timer Expired: Auto-release seats & clear storage cache
        state.lockedSeatNumbers = [];
        state.selectedSeatNumbers = [];
        state.lockExpiresAt = null;
        state.lockError = 'Lock timer expired. Please select seats again.';
        if (typeof window !== 'undefined') {
          localStorage.removeItem('bms_active_lock');
        }
      }
    },

    // Clear current selections
    resetSelections: (state) => {
      state.selectedSeatNumbers = [];
      state.lockedSeatNumbers = [];
      state.lockExpiresAt = null;
      state.lockTimeRemaining = 0;
      state.lockError = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('bms_active_lock');
      }
    },

    // Explicit user release of locked seats
    releaseLockSuccess: (state) => {
      // Revert locally locked seats to AVAILABLE
      state.seats = state.seats.map(s => {
        if (state.lockedSeatNumbers.includes(s.seatNumber)) {
          return { ...s, status: 'AVAILABLE', lockedBy: undefined };
        }
        return s;
      });
      state.lockedSeatNumbers = [];
      state.selectedSeatNumbers = [];
      state.lockExpiresAt = null;
      state.lockTimeRemaining = 0;
      state.lockError = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('bms_active_lock');
      }
    },

    // Final booking confirmed
    setBookingSuccess: (state, action: PayloadAction<string | null>) => {
      state.bookingSuccess = action.payload;
      if (action.payload) {
        state.selectedSeatNumbers = [];
        state.lockedSeatNumbers = [];
        state.lockTimeRemaining = 0;
        if (typeof window !== 'undefined') {
          localStorage.removeItem('bms_active_lock');
        }
      }
    },
  },
});

export const {
  setAvailableShows,
  selectShow,
  setSeatMap,
  toggleSeatSelection,
  setLocking,
  setLockSuccess,
  setLockError,
  decrementTimer,
  resetSelections,
  releaseLockSuccess,
  restoreActiveLock,
  setBookingSuccess,
} = seatSlice.actions;

export default seatSlice.reducer;

