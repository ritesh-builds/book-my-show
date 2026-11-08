// components/TheaterScreen.tsx — High-Impact IMAX Curved Screen

'use client';

import React from 'react';

export default function TheaterScreen() {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-2 pb-6 select-none relative overflow-hidden">
      {/* 1. Projector Light Cone Beam casting down */}
      <div className="projector-beam w-full max-w-2xl h-24 absolute top-0 pointer-events-none animate-projector" />

      {/* 2. Ambient glow behind the screen */}
      <div className="w-3/4 max-w-xl h-10 bg-gradient-to-b from-rose-500/25 via-sky-500/15 to-transparent blur-xl pointer-events-none -mb-3 animate-pulse" />

      {/* 3. Curved Screen Bar */}
      <div className="relative w-full max-w-xl flex flex-col items-center px-4">
        {/* Curved Screen Edge */}
        <div className="w-full h-3 border-t-[3px] border-zinc-200/90 rounded-[50%] shadow-[0_-6px_24px_rgba(255,255,255,0.25)] relative">
          {/* Center IMAX badge */}
          <div className="absolute left-1/2 -top-3.5 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#08090c] border border-zinc-700/80 text-[10px] font-mono tracking-widest text-zinc-300 uppercase shadow-md">
            IMAX Screen
          </div>
        </div>

        {/* Screen Instruction Label */}
        <p className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mt-2.5">
          All Eyes Toward The Screen
        </p>
      </div>
    </div>
  );
}
