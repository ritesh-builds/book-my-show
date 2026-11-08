// components/CountdownBanner.tsx — Active Redis Lock TTL Countdown

'use client';

import React, { useEffect } from 'react';
import { Timer, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { decrementTimer } from '../store/seatSlice';

export default function CountdownBanner() {
  const dispatch = useAppDispatch();
  const lockedSeats = useAppSelector((state) => state.seat.lockedSeatNumbers);
  const remainingSeconds = useAppSelector((state) => state.seat.lockTimeRemaining);
  const show = useAppSelector((state) => state.seat.currentShow);

  useEffect(() => {
    if (lockedSeats.length === 0 || remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    return () => clearInterval(interval);
  }, [lockedSeats, remainingSeconds, dispatch]);

  if (lockedSeats.length === 0 || remainingSeconds <= 0) {
    return null;
  }

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const percentLeft = Math.max(0, Math.min(100, (remainingSeconds / 480) * 100));

  return (
    <div className="w-full max-w-3xl mx-auto my-3 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#181410] to-amber-950/40 border border-amber-500/40 p-4 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Left: Lock info */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Timer className="h-5 w-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">
                Seats Temporarily Reserved
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] border border-amber-500/30">
                {lockedSeats.join(', ')}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Held via atomic Redis Lock (`SET NX EX 480`). Complete payment before timeout.
            </p>
          </div>
        </div>

        {/* Right: Big Digital Timer */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="text-right">
            <span className="text-2xl font-black font-mono tracking-wider text-amber-400">
              {formattedTime}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-1000 ease-linear rounded-full"
          style={{ width: `${percentLeft}%` }}
        />
      </div>
    </div>
  );
}
