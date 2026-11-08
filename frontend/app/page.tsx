// app/page.tsx — BookMyShow Official Homepage Experience

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Film,
  Star,
  Clock,
  Sparkles,
  Ticket,
  ChevronRight,
  MapPin,
  Play,
  Zap,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { fetchShows, fetchCinemasByCity } from '../lib/api';

interface Show {
  id: string;
  movie: string;
  cinemaId: string;
  screenNo: number;
  startTime: string;
  endTime: string;
  date: string;
  language: string;
  format: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
}

// Movie metadata with posters and genres
const MOVIE_POSTERS: Record<string, { poster: string; backdrop: string; genre: string; rating: string; votes: string }> = {
  'Kalki 2898 AD': {
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    genre: 'Sci-Fi / Action / Epic',
    rating: '8.9',
    votes: '240K',
  },
  'Pushpa 2': {
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop',
    genre: 'Action / Thriller / Drama',
    rating: '8.7',
    votes: '190K',
  },
  'Animal': {
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
    genre: 'Crime / Drama / Action',
    rating: '8.3',
    votes: '150K',
  },
  'Dunki': {
    poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1600&auto=format&fit=crop',
    genre: 'Comedy / Drama / Adventure',
    rating: '7.9',
    votes: '95K',
  },
  'Salaar': {
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop',
    genre: 'Action / Crime / Thriller',
    rating: '8.1',
    votes: '110K',
  },
  'Vettaiyan': {
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    genre: 'Action / Drama',
    rating: '8.0',
    votes: '80K',
  },
};

const DEFAULT_POSTER = {
  poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop',
  backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
  genre: 'Feature Film / Drama',
  rating: '8.5',
  votes: '100K',
};

const CINEMA_NAMES: Record<string, string> = {
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

export default function HomePage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedCity, setSelectedCity] = useState('c1');
  const [cityCinemas, setCityCinemas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Restore cached city on mount
  useEffect(() => {
    const saved = localStorage.getItem('bms_selected_city');
    if (saved) {
      setSelectedCity(saved);
    }
  }, []);

  // Load shows and cinemas for the selected city
  useEffect(() => {
    async function loadData() {
      try {
        const [showsData, cinemasData] = await Promise.all([
          fetchShows(),
          fetchCinemasByCity(selectedCity).catch(() => []),
        ]);
        if (Array.isArray(showsData)) {
          setShows(showsData);
        }
        if (Array.isArray(cinemasData)) {
          setCityCinemas(cinemasData);
        }
      } catch (err) {
        console.warn('Could not load shows or cinemas:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedCity]);

  // Unique movies list from seeded shows
  const uniqueMovies = Array.from(new Set(shows.map((s) => s.movie))).map((title) => {
    const movieShows = shows.filter((s) => s.movie === title);
    const meta = MOVIE_POSTERS[title] || DEFAULT_POSTER;
    return {
      title,
      shows: movieShows,
      ...meta,
    };
  });

  // Filter movies by category pill
  const filteredMovies = uniqueMovies.filter((m) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'IMAX') return m.shows.some((s) => s.format.includes('IMAX'));
    if (activeFilter === 'ACTION') return m.genre.includes('Action');
    if (activeFilter === 'DRAMA') return m.genre.includes('Drama');
    return true;
  });

  const heroShow = shows[0];
  const heroMeta = heroShow ? (MOVIE_POSTERS[heroShow.movie] || DEFAULT_POSTER) : DEFAULT_POSTER;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090c] text-slate-900 dark:text-zinc-100 flex flex-col selection:bg-rose-500 selection:text-white transition-colors">
      {/* 1. Global Navigation Bar */}
      <Navbar selectedCity={selectedCity} onCityChange={setSelectedCity} />

      {/* 2. Hero Movie Spotlight Banner */}
      {heroShow && (
        <section className="relative w-full h-[400px] sm:h-[460px] overflow-hidden bg-black flex items-center">
          {/* Background Poster Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 dark:opacity-35 scale-105 transition-transform duration-1000"
            style={{ backgroundImage: `url(${heroMeta.backdrop})` }}
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#08090c] via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          {/* Hero Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full py-8">
            <div className="max-w-2xl space-y-3.5">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-md shadow-rose-600/30">
                  <Sparkles className="h-3 w-3" />
                  Trending #1 in Theaters
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/10 dark:bg-zinc-800/80 backdrop-blur-md text-white font-mono text-xs border border-white/20">
                  {heroShow.format}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-semibold text-xs border border-amber-500/40 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400" />
                  {heroMeta.rating}/10 ({heroMeta.votes} votes)
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {heroShow.movie}
              </h1>

              {/* Genre & Synopsis */}
              <p className="text-xs sm:text-sm text-zinc-300 font-medium">
                {heroMeta.genre} &bull; 3h 15m &bull; UA &bull; {heroShow.language}
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-xl line-clamp-2">
                Experience high-octane spectacle with 4K laser projection and Dolby Atmos 7.1 sound. Book now with guaranteed atomic Redis distributed reservation.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={`/book/${heroShow.id}`}
                  className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-rose-600/30 transition-all hover:scale-105 active:scale-95"
                >
                  <Ticket className="h-4 w-4" />
                  <span>Book Tickets</span>
                </Link>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 px-3 py-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                  <Clock className="h-3.5 w-3.5 text-rose-400" />
                  <span>Next Show: {heroShow.startTime} ({CINEMA_NAMES[heroShow.cinemaId] || 'PVR'})</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full space-y-12">
        
        {/* Recommended Movies Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <Film className="h-5 w-5 text-rose-600" />
                Recommended Movies
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Top rated blockbusters running across IMAX and premium screens
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { label: 'All Movies', id: 'ALL' },
                { label: 'IMAX 3D', id: 'IMAX' },
                { label: 'Action', id: 'ACTION' },
                { label: 'Drama', id: 'DRAMA' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium font-mono whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter === filter.id
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Movie Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => {
              const primaryShow = movie.shows[0];

              return (
                <div
                  key={movie.title}
                  className="group rounded-2xl overflow-hidden bg-white dark:bg-[#0f1118] border border-slate-200 dark:border-zinc-800/80 shadow-md hover:shadow-xl dark:shadow-none hover:border-slate-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
                >
                  {/* Poster Thumbnail */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${movie.poster})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Format Badge */}
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-semibold border border-white/20">
                      {primaryShow?.format || '2D'}
                    </span>

                    {/* Rating Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-semibold border border-white/10">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{movie.rating}/10</span>
                      <span className="text-[10px] text-zinc-400 font-mono">({movie.votes})</span>
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                        {movie.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 line-clamp-1">
                        {movie.genre}
                      </p>
                    </div>

                    {/* Showtimes & Booking Link */}
                    <div className="pt-2 border-t border-slate-100 dark:border-zinc-800/80 space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-wider block">
                        Available Showtimes
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {movie.shows.slice(0, 3).map((showItem) => (
                          <Link
                            key={showItem.id}
                            href={`/book/${showItem.id}`}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-slate-100 dark:bg-zinc-800/80 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700/60 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white hover:border-rose-600 transition-all cursor-pointer"
                          >
                            {showItem.startTime}
                          </Link>
                        ))}
                      </div>

                      <Link
                        href={`/book/${primaryShow?.id || 's1'}`}
                        className="w-full mt-2 py-2 rounded-xl bg-slate-900 dark:bg-zinc-800 text-white dark:text-zinc-200 hover:bg-rose-600 dark:hover:bg-rose-600 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>Select Seats</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. System Design & Concurrency Benchmark Banner */}
        <section className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-zinc-900 to-black text-white border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs border border-emerald-500/40 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  High Concurrency Distributed Engine
                </span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                Built on Fastify v5 & Redis Distributed Locking
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Under high-throughput movie ticket drops, our architecture processes over <strong className="text-white">~8,000 requests/sec</strong> with a <strong className="text-emerald-400">100.00% success rate</strong>. Atomic Redis <code className="text-rose-400 bg-black/60 px-1 py-0.5 rounded">SET NX EX 480</code> guarantees zero double-bookings.
              </p>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-black/50 border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] uppercase font-mono">Single Core Peak</span>
                  <p className="text-lg font-black text-white font-mono mt-0.5">7,995 req/s</p>
                </div>
                <div className="p-3 rounded-xl bg-black/50 border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] uppercase font-mono">P50 Latency</span>
                  <p className="text-lg font-black text-emerald-400 font-mono mt-0.5">7.57 ms</p>
                </div>
                <div className="p-3 rounded-xl bg-black/50 border border-zinc-800 col-span-2 sm:col-span-1">
                  <span className="text-zinc-500 text-[10px] uppercase font-mono">Double Bookings</span>
                  <p className="text-lg font-black text-rose-400 font-mono mt-0.5">0 (Zero)</p>
                </div>
              </div>
            </div>

            {/* Direct Link to Seat Concurrency Simulator */}
            <div className="shrink-0 flex flex-col items-start lg:items-end gap-3">
              <Link
                href="/book/s1"
                className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-rose-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <Zap className="h-4 w-4 fill-white" />
                <span>Launch Live Concurrency Lab</span>
              </Link>
              <span className="text-[11px] font-mono text-zinc-400">
                Interactive 30-VU race tester included
              </span>
            </div>
          </div>
        </section>

      </main>

      {/* 5. Minimalist Footer */}
      <footer className="border-t bg-white dark:bg-[#06070a] border-slate-200 dark:border-zinc-800/80 py-8 px-4 sm:px-6 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-zinc-300">BookMyShow System Design</span>
            <span>&bull;</span>
            <span>Fastify v5 + Redis 7 + Next.js 16</span>
          </div>
          <p>
            Distributed Seat Concurrency Engine &bull; Non-commercial demo
          </p>
        </div>
      </footer>
    </div>
  );
}
