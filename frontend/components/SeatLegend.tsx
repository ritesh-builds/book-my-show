// components/SeatLegend.tsx — Status & Color Reference

'use client';

import React from 'react';
import { Lock, Check } from 'lucide-react';

export default function SeatLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-2.5 px-4 bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 rounded-2xl max-w-xl mx-auto my-6 text-xs font-mono select-none shadow-sm dark:shadow-none backdrop-blur-md transition-colors">
      {/* Available */}
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded-[5px] bg-slate-200 dark:bg-[#1a1d24] border border-slate-300 dark:border-zinc-700/70 shadow-sm flex items-center justify-center text-[9px] text-slate-600 dark:text-zinc-400">
          •
        </div>
        <span className="text-slate-600 dark:text-zinc-400">Available</span>
      </div>

      {/* Selected */}
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded-[5px] bg-rose-600 border border-rose-400 text-white flex items-center justify-center text-[10px] shadow-sm shadow-rose-600/40">
          <Check className="h-3 w-3 stroke-[3]" />
        </div>
        <span className="text-slate-900 dark:text-zinc-200 font-semibold">Selected</span>
      </div>

      {/* Locked (8m TTL) */}
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded-[5px] bg-amber-500/15 dark:bg-amber-500/20 border border-amber-500/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[9px]">
          <Lock className="h-3 w-3" />
        </div>
        <span className="text-amber-600 dark:text-amber-400/90 font-medium">Locked (8m TTL)</span>
      </div>

      {/* Booked (Sold Out) */}
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded-[5px] bg-slate-100 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800/50 text-slate-400 dark:text-zinc-600 flex items-center justify-center text-[10px] line-through">
          ✕
        </div>
        <span className="text-slate-400 dark:text-zinc-500">Sold</span>
      </div>
    </div>
  );
}
