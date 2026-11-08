// components/Navbar.tsx — Global Navigation Bar with City Modal & Hybrid Geolocation

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Search, ChevronDown, Zap, Film, User as UserIcon, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import CityModal from './CityModal';
import AuthModal from './AuthModal';
import { fetchCities } from '../lib/api';
import { detectCityByIP, findBestMatchingCity } from '../lib/location';

interface City {
  id: string;
  name: string;
  state: string;
}

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Navbar({
  selectedCity,
  onCityChange,
}: {
  selectedCity?: string;
  onCityChange?: (cityId: string) => void;
}) {
  const [cities, setCities] = useState<City[]>([]);
  const [currentCityId, setCurrentCityId] = useState(selectedCity || 'c1');
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Check saved user session
    const savedUser = localStorage.getItem('bms_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('bms_jwt_token');
    localStorage.removeItem('bms_user');
    setCurrentUser(null);
  };

  useEffect(() => {
    async function initLocation() {
      // 1. Fetch all Indian cities from backend (Redis cached)
      let availableCities: City[] = [];
      try {
        const data = await fetchCities();
        if (Array.isArray(data) && data.length > 0) {
          availableCities = data;
          setCities(data);
        }
      } catch {
        // Fall back to seed defaults
      }

      // 2. Check localStorage cache
      const cachedCity = localStorage.getItem('bms_selected_city');
      if (cachedCity) {
        setCurrentCityId(cachedCity);
        if (onCityChange) onCityChange(cachedCity);
        return;
      }

      // 3. Silent IP-based detection on first visit (Zero user prompt)
      try {
        const ipLocation = await detectCityByIP();
        if (ipLocation?.cityName && availableCities.length > 0) {
          const matchedId = findBestMatchingCity(ipLocation.cityName, availableCities);
          if (matchedId) {
            setCurrentCityId(matchedId);
            localStorage.setItem('bms_selected_city', matchedId);
            if (onCityChange) onCityChange(matchedId);
          }
        }
      } catch {
        // Silently keep default
      }
    }

    initLocation();
  }, []);

  const handleSelectCity = (cityId: string) => {
    setCurrentCityId(cityId);
    localStorage.setItem('bms_selected_city', cityId);
    if (onCityChange) onCityChange(cityId);
  };

  const currentCityObject = cities.find((c) => c.id === currentCityId);
  const displayCityName = currentCityObject ? currentCityObject.name : 'Select City';

  return (
    <>
      <nav className="border-b bg-white/95 dark:bg-[#0c0e14]/90 border-slate-200 dark:border-zinc-800/80 backdrop-blur-xl sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-3">
            
            {/* 1. Left: Brand Logo */}
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

            {/* 3. Right: City Selector Pill + Redis Badge + Theme Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* City Pill Button that opens CityModal */}
              <button
                type="button"
                onClick={() => setIsCityModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 hover:border-rose-500 dark:hover:border-rose-500 cursor-pointer shadow-sm transition-all active:scale-95"
                title="Change city or detect live location"
              >
                <MapPin className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                <span className="max-w-[110px] sm:max-w-[140px] truncate">{displayCityName}</span>
                <ChevronDown className="h-3 w-3 text-slate-400 dark:text-zinc-500 shrink-0" />
              </button>

              {/* Redis Status Pill */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Redis Lock Live</span>
              </div>

              {/* User Account / Sign In Pill */}
              {currentUser ? (
                <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-zinc-800">
                  <div className="h-8 w-8 rounded-full bg-rose-600/10 dark:bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center">
                    {currentUser.name[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="hidden md:block text-left">
                    <span className="block text-xs font-semibold text-slate-800 dark:text-zinc-200 leading-none truncate max-w-[100px]">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <span className="block text-[9px] font-mono text-slate-400 dark:text-zinc-500 uppercase leading-none mt-0.5">
                      {currentUser.role}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/30 transition-all cursor-pointer active:scale-95"
                >
                  <UserIcon className="h-3.5 w-3.5" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Dark / Light Mode Switcher */}
              <ThemeToggle />
            </div>

          </div>
        </div>
      </nav>

      {/* BookMyShow City Selection Modal with GPS */}
      <CityModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        cities={cities}
        currentCityId={currentCityId}
        onSelectCity={handleSelectCity}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => setCurrentUser(user)}
      />
    </>
  );
}
