// components/CheckoutBar.tsx — High-Impact Bottom Reservation Dock

'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Lock, RefreshCw, X, XCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { lockSeatsApi, confirmBookingApi, unlockSeatsApi } from '../lib/api';
import {
  setLocking,
  setLockSuccess,
  setLockError,
  setBookingSuccess,
  resetSelections,
  toggleSeatSelection,
  releaseLockSuccess,
} from '../store/seatSlice';

export default function CheckoutBar() {
  const dispatch = useAppDispatch();
  const seats = useAppSelector((state) => state.seat.seats);
  const selectedSeats = useAppSelector((state) => state.seat.selectedSeatNumbers);
  const lockedSeats = useAppSelector((state) => state.seat.lockedSeatNumbers);
  const show = useAppSelector((state) => state.seat.currentShow);
  const userId = useAppSelector((state) => state.seat.userId);
  const isLocking = useAppSelector((state) => state.seat.isLocking);
  const lockError = useAppSelector((state) => state.seat.lockError);
  const bookingSuccess = useAppSelector((state) => state.seat.bookingSuccess);

  const [isConfirming, setIsConfirming] = useState(false);
  const [isReleasing, setIsReleasing] = useState(false);

  // Price calculations
  const selectedSeatObjects = seats.filter((s) => selectedSeats.includes(s.seatNumber));
  const totalPrice = selectedSeatObjects.reduce((acc, curr) => acc + curr.price, 0);

  // Lock seats via Redis Distributed Lock
  const handleLockSeats = async () => {
    if (selectedSeats.length === 0) return;

    dispatch(setLocking(true));
    const res = await lockSeatsApi(show.id, selectedSeats, userId);

    if (res.success) {
      dispatch(
        setLockSuccess({
          showId: show.id,
          lockedSeats: res.data.lockedSeats,
          expiresAt: res.data.expiresAt,
          expiresInSeconds: res.data.expiresInSeconds,
        }),
      );
    } else {
      dispatch(setLockError(res.error));
    }
  };

  // Release/unlock seats immediately from Redis
  const handleReleaseSeats = async () => {
    if (lockedSeats.length === 0) return;

    setIsReleasing(true);
    try {
      const res = await unlockSeatsApi(show.id, lockedSeats, userId);
      if (res.success) {
        dispatch(releaseLockSuccess());
      } else {
        dispatch(setLockError(res.error || 'Failed to release seats'));
      }
    } catch (err: any) {
      dispatch(setLockError(err.message || 'Error releasing seats'));
    } finally {
      setIsReleasing(false);
    }
  };

  // Confirm booking & simulate payment
  const handleConfirmPayment = async () => {
    if (lockedSeats.length === 0) return;

    setIsConfirming(true);
    const simulatedOrderId = `order_${Math.random().toString(36).substring(2, 9)}`;
    const simulatedPaymentId = `pay_${Math.random().toString(36).substring(2, 9)}`;

    const res = await confirmBookingApi({
      showId: show.id,
      seatNumbers: lockedSeats,
      userId,
      orderId: simulatedOrderId,
      paymentId: simulatedPaymentId,
      signature: 'simulated_hmac_sha256_verified_signature',
      customerEmail: 'ritesh.kumar@example.com',
      customerPhone: '+919876543210',
    });

    if (res.success) {
      dispatch(setBookingSuccess(res.data.bookingId));
    } else {
      dispatch(setLockError(res.error));
    }
    setIsConfirming(false);
  };

  return (
    <>
      {/* Booking Confirmation Celebratory Modal */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-[#0e1118] border border-emerald-500/40 p-6 text-center space-y-4 shadow-2xl">
            <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Tickets Confirmed!</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Booking ID: <span className="font-mono text-emerald-400 font-bold">{bookingSuccess}</span>
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-left text-xs font-mono space-y-1.5 text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-500">Movie</span>
                <span className="text-white font-medium">{show.movie}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Seats</span>
                <span className="text-rose-400 font-bold">{lockedSeats.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Cinema</span>
                <span>{show.cinema}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Showtime</span>
                <span>{show.time}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => dispatch(resetSelections())}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              Book Another Show
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Action Dock */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#090b10]/95 backdrop-blur-2xl border-t border-slate-200 dark:border-zinc-800/90 shadow-[0_-8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_-8px_32px_rgba(0,0,0,0.8)] transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          {/* Lock Conflict Error Alert */}
          {lockError && (
            <div className="mb-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-500 dark:text-rose-400" />
                <span>{lockError}</span>
              </div>
              <button
                type="button"
                onClick={() => dispatch(setLockError(null))}
                className="text-slate-400 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Left: Seat Pills & Total */}
            <div className="flex items-center gap-4 flex-wrap">
              {selectedSeats.length > 0 ? (
                <>
                  {/* Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {selectedSeatObjects.map((seat) => (
                      <span
                        key={seat.seatNumber}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800/90 border border-slate-200 dark:border-zinc-700 text-xs font-mono text-slate-800 dark:text-zinc-200"
                      >
                        <span className="font-bold text-slate-900 dark:text-white">{seat.seatNumber}</span>
                        <span className="text-slate-500 dark:text-zinc-400 text-[10px]">₹{seat.price}</span>
                        <button
                          type="button"
                          onClick={() => dispatch(toggleSeatSelection(seat.seatNumber))}
                          className="hover:text-rose-500 cursor-pointer ml-0.5"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="pl-2 sm:border-l sm:border-slate-200 dark:sm:border-zinc-800">
                    <span className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-mono block">Total Price</span>
                    <span className="text-lg font-black font-mono text-slate-900 dark:text-white">₹{totalPrice}</span>
                  </div>
                </>
              ) : (
                <div className="text-xs text-slate-400 dark:text-zinc-500 font-mono">
                  No seats selected. Click on available seats to reserve.
                </div>
              )}
            </div>

            {/* Right: Action Button */}
            <div className="flex items-center gap-3">
              {lockedSeats.length > 0 ? (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleReleaseSeats}
                    disabled={isConfirming || isReleasing}
                    className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-zinc-800 text-rose-600 dark:text-rose-400 border border-slate-200 dark:border-zinc-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:border-rose-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                    title="Release these locks immediately in Redis so others can book"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>{isReleasing ? 'Releasing...' : 'Release'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmPayment}
                    disabled={isConfirming || isReleasing}
                    className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isConfirming ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Verifying Signature...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Pay & Confirm (₹{totalPrice})</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleLockSeats}
                  disabled={selectedSeats.length === 0 || isLocking}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLocking ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Acquiring Redis Lock...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>Reserve Seats (8m Lock)</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
