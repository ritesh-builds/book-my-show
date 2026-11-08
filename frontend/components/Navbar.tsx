// components/Navbar.tsx — Global Navigation Bar with City Selector & Dark Mode Toggle

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Search, ChevronDown, Zap, Film } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { fetchCities } from '../lib/api';

interface City {
  id: string;
  name: string;
  state: string;
}

export default function Navbar({
  selectedCity,
  onCityChange,
}: {
  selectedCity?: string;
  onCityChange?: (cityId: string) => void;
}) {
  const [cities, setCities] = useState<City[]>([
    { id: 'c1', name: 'Mumbai', state: 'Maharashtra' },
    { id: 'c2', name: 'Delhi', state: 'Delhi' },
    { id: 'c3', name: 'Bangalore', state: 'Karnataka' },
    { id: 'c4', name: 'Pune', state: 'Maharashtra' },
    { id: 'c5', name: 'Chennai', state: 'Tamil Nadu' },
  ]);
  const [currentCity, setCurrentCity] = useState(selectedCity || 'c1');

  useEffect(() => {
    // 1. Restore cached city location from localStorage
    const savedCity = localStorage.getItem('bms_selected_city');
    if (savedCity) {
      setCurrentCity(savedCity);
      if (onCityChange) onCityChange(savedCity);
    }

    // 2. Fetch cities from Fastify backend (Redis cached)
    async function loadCities() {
      try {
        const data = await fetchCities();
        if (Array.isArray(data) && data.length > 0) {
          setCities(data);
        }
      } catch {
        // Fall back to seed defaults
      }
    }
    loadCities();
  }, []);

  const handleCitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCurrentCity(val);
    localStorage.setItem('bms_selected_city', val);
    if (onCityChange) onCityChange(val);
  };

  return (
    <nav className="border-b bg-white/95 dark:bg-[#0c0e14]/90 border-slate-200 dark:border-zinc-800/80 backdrop-blur-xl sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* 1. Left: Brand */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 p-[1px] shadow-md shadow-rose-900/20 group-hover:scale-105 transition-transform">
              <div className="h-full w-full bg-white dark:bg-[#0c0e14] rounded-[11px] flex items-center justify-center font-black tracking-tight text-rose-600 dark:text-white text-base">
                BM
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white flex items-center">
                book<span className="text-rose-600">my</span>show
              </span>
              <span className="block text-[10px] font-mono text-slate-500 dark:text-zinc-500 tracking-wider uppercase">
                Distributed Ticketing
              </span>
            </div>
          </Link>

          {/* 2. Middle: Search Input */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Search for Movies, Cinemas, Screen Formats..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-100 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 transition-colors"
              />
            </div>
          </div>

          {/* 3. Right: City Selector + Redis Badge + Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* City Selector */}
            <div className="relative flex items-center">
              <MapPin className="h-3.5 w-3.5 text-rose-500 absolute left-2.5 pointer-events-none" />
              <select
                value={currentCity}
                onChange={handleCitySelect}
                className="appearance-none pl-8 pr-7 py-2 rounded-xl text-xs font-medium bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-rose-500 cursor-pointer shadow-sm transition-colors"
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.id} className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">
                    {city.name} {city.state ? `(${city.state})` : ''}
                  </option>
                ))}
              </select>
              <ChevronDown className="h-3 w-3 text-slate-400 dark:text-zinc-500 absolute right-2.5 pointer-events-none" />
            </div>

            {/* Redis Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Redis Lock Live</span>
            </div>

            {/* Dark / Light Mode Switcher */}
            <ThemeToggle />
          </div>

        </div>
      </div>
    </nav>
  );
}

