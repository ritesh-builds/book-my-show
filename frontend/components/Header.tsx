// components/Header.tsx — Ultra-sleek Cinema Experience Topbar with Dynamic Show Selector

'use client';

import React from 'react';
import { Star, Volume2, ChevronDown, Film } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { selectShow } from '../store/seatSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.seat.currentShow);
  const availableShows = useAppSelector((state) => state.seat.availableShows);

  const cinemaNames: Record<string, string> = {
    cn1: 'PVR Juhu, Mumbai',
    cn2: 'INOX Nariman Point, Mumbai',
    cn3: 'PVR Select Citywalk, Delhi',
    cn4: 'Cinepolis Ambience Mall, Delhi',
    cn5: 'PVR Orion Mall, Bengaluru',
    cn6: 'INOX Garuda Mall, Bengaluru',
    cn7: 'PVR Seasons Mall, Pune',
    cn8: 'Cinepolis Westend Mall, Pune',
    cn9: 'Sathyam Cinemas, Chennai',
    cn10: 'PVR VR Mall, Chennai',
    cn11: 'Prasads IMAX, Hyderabad',
    cn12: 'PVR Inorbit Mall, Hyderabad',
    cn13: 'INOX Quest Mall, Kolkata',
    cn14: 'PVR Mani Square, Kolkata',
    cn15: 'PVR Acropolis Mall, Ahmedabad',
    cn_ggn_1: 'PVR Ambience Mall, Gurugram',
    cn_ggn_2: 'Cinepolis DLF Mega Mall, Gurugram',
    cn_fbd_1: 'INOX Crown Interiorz, Faridabad',
    cn_fbd_2: 'PVR SRS Cinemas, Faridabad',
    cn_pnp_1: 'Cinepolis Mittal Mega Mall, Panipat',
    cn_amb_1: 'PVR Galaxy Mall, Ambala',
    cn_rtk_1: 'PVR Sheetal Mall, Rohtak',
    cn_knl_1: 'MovieMax Kessel Mall, Karnal',
    cn_snp_1: 'Miraj Cinemas, Sonipat',
    cn_pkl_1: 'PVR Shalimar Mega Mall, Panchkula',
    cn_chd_1: 'PVR Elante Mall, Chandigarh',
    cn_chd_2: 'Cinepolis Jagat Mall, Chandigarh',
    cn_jpr_1: 'Raj Mandir Cinema, Jaipur',
    cn_lko_1: 'PVR Phoenix Palassio, Lucknow',
    cn_pat_1: 'Cinepolis P&M Mall, Patna',
    cn_bpl_1: 'Cinepolis DB City Mall, Bhopal',
    cn_koc_1: 'PVR Lulu Mall, Kochi',
    cn_ind_1: 'INOX Treasure Island, Indore',
    cn_noi_1: 'PVR Superplex Mall of India, Noida',
    cn_ldh_1: 'PVR Pavilion Mall, Ludhiana',
    cn_asr_1: 'Cinepolis Mall of Amritsar',
  };

  const handleShowChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const foundShow = availableShows.find((s: any) => s.id === selectedId);
    if (foundShow) {
      dispatch(
        selectShow({
          id: foundShow.id,
          movie: foundShow.movie,
          cinema: cinemaNames[foundShow.cinemaId] || 'PVR Cinemas',
          hall: `Screen ${foundShow.screenNo}`,
          time: foundShow.startTime,
          date: foundShow.date,
          format: foundShow.format,
          price: foundShow.price,
        }),
      );
    }
  };

  return (
    <header className="border-b bg-white/95 dark:bg-[#0d0f14]/90 border-slate-200 dark:border-zinc-800/80 backdrop-blur-xl sticky top-0 z-40 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          
          {/* Left: Brand + Movie Details */}
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 p-[1px] shadow-lg shadow-rose-950/40 shrink-0">
              <div className="h-full w-full bg-white dark:bg-[#0d0f14] rounded-[11px] flex items-center justify-center font-black tracking-tight text-rose-600 dark:text-white text-base">
                BM
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  {show.movie}
                </h1>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  <Star className="h-3 w-3 fill-amber-500 dark:fill-amber-400" />
                  8.9
                </span>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800/90 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/60">
                  {show.format}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 mt-0.5 flex-wrap">
                <span className="text-slate-800 dark:text-zinc-300 font-medium">{show.cinema}</span>
                <span>&bull;</span>
                <span className="text-rose-600 dark:text-rose-400 font-mono font-medium">{show.time}</span>
                <span>&bull;</span>
                <span className="text-slate-400 dark:text-zinc-500">{show.date}</span>
              </div>
            </div>
          </div>

          {/* Right: Movie Switcher Dropdown & Badges */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Dynamic Seeded Show Selector */}
            {availableShows.length > 0 && (
              <div className="relative">
                <select
                  value={show.id}
                  onChange={handleShowChange}
                  className="appearance-none bg-zinc-900/90 text-zinc-200 border border-zinc-700/80 rounded-xl px-3 py-1.5 pr-8 text-xs font-mono font-medium focus:outline-none focus:border-rose-500 transition-colors cursor-pointer shadow-sm"
                >
                  {availableShows.map((s: any) => (
                    <option key={s.id} value={s.id} className="bg-zinc-900 text-white">
                      {s.movie} ({s.startTime} • {s.format})
                    </option>
                  ))}
                </select>
                <ChevronDown className="h-3.5 w-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            )}

            {/* Audio tech badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/80 text-zinc-400 border border-zinc-800 text-[11px] font-medium">
              <Volume2 className="h-3.5 w-3.5 text-zinc-500" />
              <span>Dolby Atmos 7.1</span>
            </div>

            {/* Redis Distributed Lock Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium shadow-inner shadow-emerald-950/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Redis Live</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
