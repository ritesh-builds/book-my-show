  // app/page.tsx — BookMyShow Official Homepage Experience with Dynamic City Filtering

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
  Building2,
  Search,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { fetchShows, fetchCinemasByCity, fetchCities } from '../lib/api';
import { getMovieMetadata, CINEMA_NAMES } from '../lib/movieMetadata';

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
  isHot?: boolean;
}

interface Cinema {
  id: string;
  name: string;
  cityId: string;
  address: string;
  screens: number;
}

interface City {
  id: string;
  name: string;
  state: string;
}

export default function HomePage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState('c_hr_karnal'); // Defaults to Karnal if no cache
  const [cityCinemas, setCityCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('HOT');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Restore cached city from localStorage or default to Karnal
  useEffect(() => {
    const saved = localStorage.getItem('bms_selected_city');
    if (saved) {
      setSelectedCity(saved);
    }
  }, []);

  // 2. Fetch shows, cities, and cinemas for selected city
  useEffect(() => {
    async function loadData() {
      try {
        const [showsData, cinemasData, citiesData] = await Promise.all([
          fetchShows(),
          fetchCinemasByCity(selectedCity).catch(() => []),
          fetchCities().catch(() => []),
        ]);

        if (Array.isArray(showsData)) setShows(showsData);
        if (Array.isArray(cinemasData)) setCityCinemas(cinemasData);
        if (Array.isArray(citiesData)) setCities(citiesData);
      } catch (err) {
        console.warn('Could not load homepage data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedCity]);

  // Current City Object
  const currentCityObj = cities.find((c) => c.id === selectedCity);
  const currentCityName = currentCityObj ? currentCityObj.name : 'Your City';

  // Find shows matching this city's multiplexes
  const cityCinemaIds = cityCinemas.map((c) => c.id);
  const localShows = shows.filter((s) => cityCinemaIds.includes(s.cinemaId));

  // If local shows exist, use them; otherwise show all shows
  const activeShows = localShows.length > 0 ? localShows : shows;

  // Unique movies list from seeded shows (100 movies total)
  const uniqueMovies = Array.from(new Set(shows.map((s) => s.movie))).map((title) => {
    // Check if this movie has showtimes in the selected city
    const movieLocalShows = localShows.filter((s) => s.movie === title);
    const movieAllShows = shows.filter((s) => s.movie === title);
    const displayShows = movieLocalShows.length > 0 ? movieLocalShows : movieAllShows;
    const meta = getMovieMetadata(title);
    const isHot = movieAllShows.some((s) => s.isHot);

    return {
      title,
      shows: displayShows,
      hasLocalShows: movieLocalShows.length > 0,
      isHot,
      ...meta,
    };
  });

  // Filter movies by category pill and search query
  const filteredMovies = uniqueMovies.filter((m) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchGenre = m.genre.toLowerCase().includes(q);
      const matchFormat = m.shows.some((s) => s.format.toLowerCase().includes(q));
      const matchLang = m.shows.some((s) => s.language.toLowerCase().includes(q));
      if (!matchTitle && !matchGenre && !matchFormat && !matchLang) return false;
    }

    // 2. Category Filter
    if (activeFilter === 'HOT') return m.isHot;
    if (activeFilter === 'IMAX') return m.shows.some((s) => s.format.includes('IMAX'));
    if (activeFilter === 'ACTION') return m.genre.includes('Action');
    if (activeFilter === 'DRAMA') return m.genre.includes('Drama');
    if (activeFilter === 'PUNJABI') return m.shows.some((s) => s.language === 'Punjabi');
    return true;
  });

  // Hero Spotlight Movie (prioritizes local show)
  const heroShow = activeShows[0] || shows[0];
  const heroMeta = heroShow ? getMovieMetadata(heroShow.movie) : getMovieMetadata('Kalki 2898 AD');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090c] text-slate-900 dark:text-zinc-100 flex flex-col selection:bg-rose-500 selection:text-white transition-colors">
      {/* 1. Global Navigation Bar */}
      <Navbar selectedCity={selectedCity} onCityChange={setSelectedCity} />

      {/* 2. Hero Movie Spotlight Banner */}
      {heroShow && (
        <section className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] overflow-hidden bg-black flex items-center">
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
                  Now Showing in {currentCityName}
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
                  <span>Book Seats ({heroShow.startTime})</span>
                </Link>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 px-3 py-2 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
                  <Clock className="h-3.5 w-3.5 text-rose-400" />
                  <span>{CINEMA_NAMES[heroShow.cinemaId] || 'Multiplex'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full space-y-12">
        
        {/* Recommended Movies Section */}
        <section className="space-y-5">
          {/* Row 1: Section Title, Badge & Subtitle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-2 border-b border-slate-200/60 dark:border-zinc-800/60">
            <div>
              <div className="flex items-center flex-wrap gap-2.5">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <Film className="h-5 w-5 text-rose-600 shrink-0" />
                  <span>Recommended Movies in {currentCityName}</span>
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 shrink-0">
                  {filteredMovies.length} {filteredMovies.length === 1 ? 'Title' : 'Titles'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5 flex-wrap">
                <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500 inline shrink-0" />
                <span>Top 25 Hot-Tier blockbusters cached in Redis RAM • Full 100-Movie Catalog ({shows.length} Showtimes)</span>
              </p>
            </div>
          </div>

          {/* Row 2: Search Input & Category Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-0.5">
            {/* Instant Search Bar */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search 100 movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-full text-xs bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500 placeholder:text-slate-400 dark:placeholder:text-zinc-500 shadow-sm transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none touch-pan-x">
              {[
                { label: '🔥 Top 25 Hot (Redis)', id: 'HOT' },
                { label: 'All 100 Movies', id: 'ALL' },
                { label: 'IMAX 3D', id: 'IMAX' },
                { label: 'Action', id: 'ACTION' },
                { label: 'Drama', id: 'DRAMA' },
                { label: 'Punjabi', id: 'PUNJABI' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium font-mono whitespace-nowrap transition-all duration-200 active:scale-95 cursor-pointer shrink-0 ${
                    activeFilter === filter.id
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 scale-102 font-bold'
                      : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 hover:text-slate-900 dark:hover:text-zinc-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Movie Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredMovies.map((movie) => {
              const primaryShow = movie.shows[0];

              return (
                <div
                  key={movie.title}
                  className="group rounded-2xl overflow-hidden bg-white dark:bg-[#0f1118] border border-slate-200 dark:border-zinc-800/80 shadow-md hover:shadow-2xl hover:shadow-rose-500/10 dark:shadow-none hover:border-rose-500/40 dark:hover:border-rose-500/40 card-hover-lift flex flex-col justify-between transition-all"
                >
                  {/* Poster Thumbnail */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url(${movie.poster})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent group-hover:opacity-90 transition-opacity" />

                    {/* Format Badge */}
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-semibold border border-white/20">
                      {primaryShow?.format || '2D'}
                    </span>

                    {/* Hot Tier Redis Badge */}
                    {movie.isHot && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-rose-600/95 backdrop-blur-md text-white font-mono text-[10px] font-bold flex items-center gap-1 border border-rose-400/40 animate-pulse-bloom">
                        <Zap className="h-2.5 w-2.5 fill-current" />
                        Redis Hot
                      </span>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-xs font-semibold border border-white/10 group-hover:border-rose-500/40 transition-colors">
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
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-wider block">
                          Showtimes ({CINEMA_NAMES[primaryShow?.cinemaId] || 'Theater'})
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {movie.shows.slice(0, 3).map((showItem) => (
                          <Link
                            key={showItem.id}
                            href={`/book/${showItem.id}`}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-slate-100 dark:bg-zinc-800/80 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700/60 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white hover:border-rose-600 transition-all cursor-pointer shadow-sm"
                          >
                            {showItem.startTime}
                          </Link>
                        ))}
                      </div>

                      <Link
                        href={`/book/${primaryShow?.id || 's1'}`}
                        className="w-full mt-2 py-2 rounded-xl bg-slate-900 dark:bg-zinc-800 text-white dark:text-zinc-200 hover:bg-rose-600 dark:hover:bg-rose-600 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Reserve Seats</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Multiplexes in Selected City Section */}
        {cityCinemas.length > 0 && (
          <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-zinc-800/80 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-rose-600" />
                  Cinemas & Multiplexes in {currentCityName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  Real-time seat availability across screens
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold border border-slate-200 dark:border-zinc-700">
                {cityCinemas.length} Theaters Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {cityCinemas.map((cinema) => {
                const cinemaShows = shows.filter((s) => s.cinemaId === cinema.id);

                return (
                  <div
                    key={cinema.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {cinema.name}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {cinema.screens} Screens
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                        {cinema.address}
                      </p>
                    </div>

                    {/* Shows in this cinema */}
                    <div className="pt-2 border-t border-slate-200 dark:border-zinc-800/80">
                      <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase block mb-1.5">
                        Running Shows:
                      </span>
                      {cinemaShows.length > 0 ? (
                        <div className="flex items-center gap-2 flex-wrap">
                          {cinemaShows.map((s) => (
                            <Link
                              key={s.id}
                              href={`/book/${s.id}`}
                              className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:border-rose-600 hover:text-rose-600 transition-colors cursor-pointer shadow-sm"
                            >
                              {s.movie} ({s.startTime})
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 dark:text-zinc-500 font-mono">
                          Next shows scheduling shortly
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 5. System Design & Concurrency Benchmark Banner */}
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
                href="/book/s_knl_1"
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

      {/* 6. Minimalist Footer */}
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
