// modules/shows/shows.repository.ts — In-memory shows data

import type { Show } from './shows.types.ts';

const shows: Show[] = [
  // PVR Juhu (cn1) — Mumbai
  { id: 's1',  movie: 'Kalki 2898 AD', cinemaId: 'cn1', screenNo: 1, startTime: '10:00', endTime: '13:15', date: '2024-12-20', language: 'Telugu', format: '3D IMAX', price: 450, availableSeats: 180, totalSeats: 200, isActive: true, createdAt: new Date() },
  { id: 's2',  movie: 'Kalki 2898 AD', cinemaId: 'cn1', screenNo: 2, startTime: '14:30', endTime: '17:45', date: '2024-12-20', language: 'Hindi',  format: '4DX',     price: 500, availableSeats: 120, totalSeats: 150, isActive: true, createdAt: new Date() },
  { id: 's3',  movie: 'Pushpa 2',      cinemaId: 'cn1', screenNo: 3, startTime: '18:30', endTime: '21:30', date: '2024-12-20', language: 'Telugu', format: '2D',       price: 300, availableSeats: 90,  totalSeats: 200, isActive: true, createdAt: new Date() },

  // INOX Nariman Point (cn2) — Mumbai
  { id: 's4',  movie: 'Animal',        cinemaId: 'cn2', screenNo: 1, startTime: '11:00', endTime: '14:30', date: '2024-12-20', language: 'Hindi',   format: '2D',       price: 350, availableSeats: 200, totalSeats: 250, isActive: true, createdAt: new Date() },
  { id: 's5',  movie: 'Dunki',         cinemaId: 'cn2', screenNo: 2, startTime: '16:00', endTime: '19:00', date: '2024-12-20', language: 'Hindi',   format: '3D',       price: 400, availableSeats: 60,  totalSeats: 180, isActive: true, createdAt: new Date() },

  // PVR Select Citywalk (cn3) — Delhi
  { id: 's6',  movie: 'Kalki 2898 AD', cinemaId: 'cn3', screenNo: 1, startTime: '09:30', endTime: '12:45', date: '2024-12-20', language: 'Hindi',  format: 'IMAX',     price: 500, availableSeats: 300, totalSeats: 350, isActive: true, createdAt: new Date() },
  { id: 's7',  movie: 'Salaar',        cinemaId: 'cn3', screenNo: 4, startTime: '20:00', endTime: '23:00', date: '2024-12-20', language: 'Telugu', format: '2D',       price: 280, availableSeats: 100, totalSeats: 200, isActive: true, createdAt: new Date() },

  // PVR Orion (cn5) — Bangalore
  { id: 's8',  movie: 'Pushpa 2',      cinemaId: 'cn5', screenNo: 2, startTime: '13:00', endTime: '16:00', date: '2024-12-20', language: 'Telugu', format: '3D',       price: 380, availableSeats: 150, totalSeats: 200, isActive: true, createdAt: new Date() },
  { id: 's9',  movie: 'Kalki 2898 AD', cinemaId: 'cn5', screenNo: 5, startTime: '19:30', endTime: '22:45', date: '2024-12-20', language: 'Kannada',format: '2D',       price: 260, availableSeats: 80,  totalSeats: 180, isActive: true, createdAt: new Date() },

  // Sathyam Cinemas (cn9) — Chennai
  { id: 's10', movie: 'Vettaiyan',     cinemaId: 'cn9', screenNo: 1, startTime: '10:30', endTime: '13:30', date: '2024-12-20', language: 'Tamil',  format: '2D',       price: 220, availableSeats: 250, totalSeats: 300, isActive: true, createdAt: new Date() },
  { id: 's11', movie: 'Kalki 2898 AD', cinemaId: 'cn9', screenNo: 3, startTime: '15:00', endTime: '18:15', date: '2024-12-20', language: 'Tamil',  format: '3D IMAX',  price: 480, availableSeats: 40,  totalSeats: 180, isActive: true, createdAt: new Date() },
];

export interface ShowFilters {
  date?: string;
  language?: string;
  format?: string;
}

export const showsRepository = {
  findById(id: string): Show | undefined {
    return shows.find(s => s.id === id && s.isActive);
  },

  findByCinemaId(cinemaId: string, filters?: ShowFilters): Show[] {
    return shows.filter(s => {
      if (!s.isActive || s.cinemaId !== cinemaId) return false;
      if (filters?.date && s.date !== filters.date) return false;
      if (filters?.language && s.language !== filters.language) return false;
      if (filters?.format && s.format !== filters.format) return false;
      return true;
    });
  },
};
