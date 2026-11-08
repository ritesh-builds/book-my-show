// components/SeatGrid.tsx — Ultra-Sleek Cinema Matrix with Recliner Styling

'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { toggleSeatSelection } from '../store/seatSlice';
import type { FrontendSeat } from '../store/types';
import { Crown, Sparkles, Lock } from 'lucide-react';

export default function SeatGrid() {
  const dispatch = useAppDispatch();
  const seats = useAppSelector((state) => state.seat.seats);
  const selectedSeats = useAppSelector((state) => state.seat.selectedSeatNumbers);
  const lockedSeats = useAppSelector((state) => state.seat.lockedSeatNumbers);

  const tiers = [
    {
      title: 'VIP RECLINERS',
      price: '₹480',
      badge: 'Plush Leather & Footrest',
      icon: Crown,
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      rows: ['J', 'I', 'H'],
    },
    {
      title: 'EXECUTIVE PRIME',
      price: '₹375',
      badge: 'Prime Viewing Angle',
      icon: Sparkles,
      badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      rows: ['G', 'F', 'E', 'D'],
    },
    {
      title: 'NORMAL CLASS',
      price: '₹300',
      badge: 'Comfort Seating',
      badgeColor: 'text-zinc-400 bg-zinc-800/60 border-zinc-700/40',
      rows: ['C', 'B', 'A'],
    },
  ];

  const handleSeatClick = (seat: FrontendSeat) => {
    if (seat.status === 'BOOKED') return;
    if (seat.status === 'LOCKED' && !lockedSeats.includes(seat.seatNumber)) return;
    dispatch(toggleSeatSelection(seat.seatNumber));
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-7 select-none my-4">
      {tiers.map((tier) => {
        const IconComponent = tier.icon;

        return (
          <div
            key={tier.title}
            className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#0f1117]/80 border border-slate-200 dark:border-zinc-800/70 shadow-sm dark:shadow-lg backdrop-blur-sm transition-colors"
          >
            {/* Tier Header with Price & Badge */}
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100 dark:border-zinc-800/60">
              <div className="flex items-center gap-2">
                {IconComponent && <IconComponent className="h-4 w-4 text-amber-500 dark:text-amber-400" />}
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wide">
                  {tier.title}
                </span>
                <span className="text-xs font-mono font-bold text-rose-400">
                  {tier.price}
                </span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${tier.badgeColor}`}
              >
                {tier.badge}
              </span>
            </div>

            {/* Rows Container */}
            <div className="space-y-2.5">
              {tier.rows.map((rowName) => {
                const rowSeats = seats.filter((s) => s.row === rowName);

                return (
                  <div
                    key={rowName}
                    className="flex items-center justify-between gap-1 sm:gap-3"
                  >
                    {/* Left Row Indicator */}
                    <span className="w-5 text-center text-xs font-mono font-bold text-zinc-500 shrink-0">
                      {rowName}
                    </span>

                    {/* Seats with Center Aisle */}
                    <div className="flex items-center justify-center gap-1 sm:gap-2 flex-1">
                      {rowSeats.map((seat, index) => {
                        const isSelected = selectedSeats.includes(seat.seatNumber);
                        const isUserLocked = lockedSeats.includes(seat.seatNumber);
                        const isExternalLocked =
                          seat.status === 'LOCKED' && !isUserLocked;
                        const isBooked = seat.status === 'BOOKED';

                        // Advanced Theater Seat Styling
                        let containerClasses =
                          'bg-slate-100 dark:bg-[#191c24] text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700/70 hover:border-slate-400 dark:hover:border-zinc-400 hover:bg-slate-200 dark:hover:bg-[#232733] hover:scale-105 active:scale-95';
                        let seatContent: React.ReactNode = seat.number;

                        if (isBooked) {
                          containerClasses =
                            'bg-slate-100 dark:bg-zinc-900/60 text-slate-300 dark:text-zinc-700 border-slate-200 dark:border-zinc-900/40 cursor-not-allowed opacity-50';
                          seatContent = '✕';
                        } else if (isExternalLocked) {
                          containerClasses =
                            'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400/90 border-amber-300 dark:border-amber-500/40 cursor-not-allowed opacity-85';
                        } else if (isSelected || isUserLocked) {
                          containerClasses =
                            'bg-rose-600 text-white font-bold border-rose-400 seat-selected-glow scale-105';
                        }

                        return (
                          <React.Fragment key={seat.seatNumber}>
                            {/* Visual Center Walkway Aisle (after Seat 5) */}
                            {index === 5 && (
                              <div className="w-4 sm:w-8 h-8 flex items-center justify-center shrink-0">
                                <div className="w-[1px] h-4 bg-zinc-800" />
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={() => handleSeatClick(seat)}
                              disabled={isBooked || isExternalLocked}
                              title={`${seat.seatNumber} — ₹${seat.price} (${seat.status})`}
                              className={`group relative h-8 w-7 sm:h-9 sm:w-8 rounded-t-lg rounded-b-md border text-[11px] font-mono flex flex-col items-center justify-center transition-all duration-150 shadow-sm ${containerClasses}`}
                            >
                              {/* Recliner Top Headrest Curve Visual */}
                              <div
                                className={`w-3/4 h-1 rounded-full mb-0.5 ${
                                  isSelected || isUserLocked
                                    ? 'bg-rose-300'
                                    : isExternalLocked
                                    ? 'bg-amber-400/50'
                                    : 'bg-zinc-700/60'
                                }`}
                              />

                              {/* Seat Number or Status Icon */}
                              {isExternalLocked ? (
                                <Lock className="h-3 w-3 text-amber-400" />
                              ) : (
                                <span>{seatContent}</span>
                              )}
                            </button>
                          </React.Fragment>
                        );
                      })}
                    </div>

                    {/* Right Row Indicator */}
                    <span className="w-5 text-center text-xs font-mono font-bold text-zinc-500 shrink-0">
                      {rowName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
