// app/book/[showId]/page.tsx — Dedicated Cinema Seat Booking Experience

'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, WifiOff } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Header from '../../../components/Header';
import TheaterScreen from '../../../components/TheaterScreen';
import SeatLegend from '../../../components/SeatLegend';
import SeatGrid from '../../../components/SeatGrid';
import CountdownBanner from '../../../components/CountdownBanner';
import ConcurrencySimulator from '../../../components/ConcurrencySimulator';
import CheckoutBar from '../../../components/CheckoutBar';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setSeatMap, selectShow, restoreActiveLock } from '../../../store/seatSlice';
import { fetchSeatMap, fetchShowDetails } from '../../../lib/api';

function BookingContent() {
  const routeParams = useParams();
  const showId = (routeParams?.showId as string) || 's1';

  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.seat.currentShow);
  const seats = useAppSelector((state) => state.seat.seats);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Restore cached active lock session on page mount or refresh
  useEffect(() => {
    try {
      const savedLock = localStorage.getItem('bms_active_lock');
      if (savedLock) {
        const parsed = JSON.parse(savedLock);
        if (parsed.showId === showId && Array.isArray(parsed.lockedSeats) && parsed.expiresAt) {
          const remainingSeconds = Math.floor((new Date(parsed.expiresAt).getTime() - Date.now()) / 1000);
          if (remainingSeconds > 0) {
            dispatch(
              restoreActiveLock({
                showId,
                lockedSeats: parsed.lockedSeats,
                expiresAt: parsed.expiresAt,
                remainingSeconds,
              }),
            );
          } else {
            localStorage.removeItem('bms_active_lock');
          }
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, [showId, dispatch]);

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

  // 1. Load Show Details on Mount
  useEffect(() => {
    async function loadShow() {
      try {
        const showData = await fetchShowDetails(showId);
        if (showData) {
          dispatch(
            selectShow({
              id: showData.id,
              movie: showData.movie,
              cinema: cinemaNames[showData.cinemaId] || 'PVR Cinemas',
              hall: `Screen ${showData.screenNo}`,
              time: showData.startTime,
              date: showData.date,
              format: showData.format,
              price: showData.price,
            }),
          );
        }
      } catch (err: any) {
        console.warn('Could not fetch specific show:', err.message);
      }
    }

    loadShow();
  }, [showId, dispatch]);

  // 2. Load Seat Map with 4-second Polling for Live Redis Locks
  useEffect(() => {
    let isMounted = true;

    async function loadSeats() {
      try {
        const data = await fetchSeatMap(showId);
        if (isMounted) {
          dispatch(setSeatMap(data.seats));
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Cannot reach Fastify backend. Make sure backend is running.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadSeats();
    const interval = setInterval(loadSeats, 4000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [showId, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090c] text-slate-900 dark:text-zinc-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white pb-32 transition-colors">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Breadcrumb / Back Link */}
      <div className="max-w-6xl mx-auto px-4 pt-3 w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Movies</span>
        </Link>
      </div>

      {/* 3. Movie Header with Metadata */}
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-4 sm:py-6 w-full flex-1">
        {/* 4. Live Countdown Banner */}
        <CountdownBanner />

        {/* 5. Curved Screen with Projector Glow */}
        <TheaterScreen />

        {/* 6. Connection Error Alert */}
        {error && (
          <div className="max-w-md mx-auto my-6 p-4 rounded-xl border border-rose-500/30 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 text-xs font-mono flex items-center gap-3">
            <WifiOff className="h-5 w-5 shrink-0 text-rose-500" />
            <div>
              <p className="font-semibold text-rose-900 dark:text-rose-200">Backend Unreachable</p>
              <p className="text-slate-600 dark:text-zinc-400 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* 7. Loading State */}
        {loading && seats.length === 0 ? (
          <div className="flex flex-col items-center justify-center my-16 space-y-3">
            <RefreshCw className="h-6 w-6 text-slate-400 dark:text-zinc-500 animate-spin" />
            <p className="text-xs font-mono text-slate-500 dark:text-zinc-500">
              Loading seat layout from Fastify & Redis...
            </p>
          </div>
        ) : (
          <>
            {/* 8. 100-Seat Matrix */}
            <SeatGrid />

            {/* 9. Seat Status Legend */}
            <SeatLegend />

            {/* 10. Concurrency Simulator */}
            <ConcurrencySimulator />
          </>
        )}
      </main>

      {/* 11. Pinned Bottom Checkout Dock */}
      <CheckoutBar />
    </div>
  );
}

export default function BookShowPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 dark:bg-[#08090c] flex items-center justify-center">
          <RefreshCw className="h-8 w-8 text-rose-600 animate-spin" />
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
