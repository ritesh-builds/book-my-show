// components/CityModal.tsx — BookMyShow-Style City Selector with Live GPS & Search

'use client';

import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Crosshair,
  X,
  Check,
  RefreshCw,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { detectExactGPSLocation, findBestMatchingCity } from '../lib/location';

interface City {
  id: string;
  name: string;
  state: string;
}

interface CityModalProps {
  isOpen: boolean;
  onClose: () => void;
  cities: City[];
  currentCityId: string;
  onSelectCity: (cityId: string) => void;
}

const POPULAR_CITY_IDS = [
  'c_hr_karnal',    // Karnal (Home City)
  'c2',             // Delhi NCR
  'c_hr_gurugram',  // Gurugram
  'c_ut_ch',        // Chandigarh
  'c1',             // Mumbai
  'c3',             // Bengaluru
  'c_hr_faridabad', // Faridabad
  'c_hr_panipat',   // Panipat
  'c6',             // Hyderabad
  'c4',             // Pune
];

export default function CityModal({
  isOpen,
  onClose,
  cities,
  currentCityId,
  onSelectCity,
}: CityModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectStatus, setDetectStatus] = useState<string | null>(null);
  const [detectError, setDetectError] = useState<string | null>(null);

  if (!isOpen) return null;

  // 1. Live GPS Detection Handler
  const handleDetectGPS = async () => {
    setIsDetecting(true);
    setDetectStatus('Requesting browser GPS permission...');
    setDetectError(null);

    try {
      const loc = await detectExactGPSLocation();
      setDetectStatus(`Detected: ${loc.cityName} (${loc.stateName || 'India'})`);

      // Match against seeded list
      const matchedId = findBestMatchingCity(loc.cityName, cities);
      if (matchedId) {
        setTimeout(() => {
          onSelectCity(matchedId);
          setIsDetecting(false);
          setDetectStatus(null);
          onClose();
        }, 800);
      } else {
        setIsDetecting(false);
        setDetectStatus(`Detected ${loc.cityName}, but not in current multiplex network. Please pick a nearby city.`);
      }
    } catch (err: any) {
      setIsDetecting(false);
      setDetectStatus(null);
      setDetectError(err.message || 'Could not acquire GPS position.');
    }
  };

  // 2. Filter cities by search term
  const filteredCities = cities.filter((city) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      city.name.toLowerCase().includes(q) ||
      city.state.toLowerCase().includes(q)
    );
  });

  const popularCities = cities.filter((c) => POPULAR_CITY_IDS.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#0e1118] border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[88vh] transition-all transform animate-in zoom-in-95 duration-200">
        
        {/* Header with Search */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-zinc-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-rose-600" />
                Select Your City
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Choose your location to see movies and showtimes near you
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across 60+ Indian cities (e.g. Gurugram, Delhi, Chandigarh, Mumbai)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-rose-500 transition-colors"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* GPS Auto-Detect Button */}
          <button
            type="button"
            onClick={handleDetectGPS}
            disabled={isDetecting}
            className="w-full py-2.5 px-4 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
          >
            {isDetecting ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>{detectStatus || 'Acquiring GPS coordinates...'}</span>
              </>
            ) : (
              <>
                <Crosshair className="h-4 w-4" />
                <span>Detect My Live Location (GPS)</span>
              </>
            )}
          </button>

          {/* Status / Error Toast */}
          {detectStatus && !isDetecting && (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>{detectStatus}</span>
            </div>
          )}

          {detectError && (
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{detectError}</span>
            </div>
          )}
        </div>

        {/* Scrollable Cities Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Popular Cities Chips */}
          {!searchQuery && (
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block">
                Popular Metros & Hubs
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {popularCities.map((city) => {
                  const isSelected = city.id === currentCityId;
                  return (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => {
                        onSelectCity(city.id);
                        onClose();
                      }}
                      className={`p-2.5 rounded-xl text-xs font-medium text-center border transition-all duration-150 active:scale-95 hover:scale-105 cursor-pointer ${
                        isSelected
                          ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/30'
                          : 'bg-slate-50 dark:bg-zinc-900/60 border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 hover:border-rose-400 dark:hover:border-zinc-700'
                      }`}
                    >
                      <span className="block font-bold">{city.name}</span>
                      <span className="text-[10px] opacity-75 font-mono">{city.state}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Filtered Cities Grid */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-mono font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block">
              {searchQuery ? `Search Results (${filteredCities.length})` : `All Cities (${filteredCities.length})`}
            </span>

            {filteredCities.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500 dark:text-zinc-400 font-mono">
                No cities found matching &ldquo;{searchQuery}&rdquo;. Try another spelling.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filteredCities.map((city) => {
                  const isSelected = city.id === currentCityId;
                  return (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => {
                        onSelectCity(city.id);
                        onClose();
                      }}
                      className={`p-2.5 rounded-xl text-left border flex items-center justify-between text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-rose-600 text-white border-rose-600 font-bold shadow-md shadow-rose-600/30'
                          : 'bg-slate-50 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800/80 text-slate-800 dark:text-zinc-300 hover:border-slate-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <span className="block font-semibold">{city.name}</span>
                        <span className="text-[10px] opacity-70 font-mono">{city.state}</span>
                      </div>
                      {isSelected && <Check className="h-4 w-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

