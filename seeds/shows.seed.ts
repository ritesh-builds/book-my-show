// seeds/shows.seed.ts — Shows scheduled across multiplexes in Indian cities

import type { Show } from '../src/modules/shows/shows.types.ts';

export const showsSeed: Omit<Show, 'createdAt'>[] = [
  // Mumbai — PVR Juhu (cn1) & INOX Nariman Point (cn2)
  { id: 's1',  movie: 'Kalki 2898 AD', cinemaId: 'cn1', screenNo: 1, startTime: '10:00', endTime: '13:15', date: '2024-12-20', language: 'Telugu', format: '3D IMAX', price: 450, availableSeats: 180, totalSeats: 200, isActive: true },
  { id: 's2',  movie: 'Kalki 2898 AD', cinemaId: 'cn1', screenNo: 2, startTime: '14:30', endTime: '17:45', date: '2024-12-20', language: 'Hindi',  format: '4DX',     price: 500, availableSeats: 120, totalSeats: 150, isActive: true },
  { id: 's3',  movie: 'Pushpa 2',      cinemaId: 'cn1', screenNo: 3, startTime: '18:30', endTime: '21:30', date: '2024-12-20', language: 'Telugu', format: '2D',       price: 300, availableSeats: 90,  totalSeats: 200, isActive: true },
  { id: 's4',  movie: 'Animal',        cinemaId: 'cn2', screenNo: 1, startTime: '11:00', endTime: '14:30', date: '2024-12-20', language: 'Hindi',  format: '2D',       price: 350, availableSeats: 200, totalSeats: 250, isActive: true },
  { id: 's5',  movie: 'Dunki',         cinemaId: 'cn2', screenNo: 2, startTime: '16:00', endTime: '19:00', date: '2024-12-20', language: 'Hindi',  format: '3D',       price: 400, availableSeats: 60,  totalSeats: 180, isActive: true },

  // Delhi NCR — PVR Select Citywalk (cn3)
  { id: 's6',  movie: 'Kalki 2898 AD', cinemaId: 'cn3', screenNo: 1, startTime: '09:30', endTime: '12:45', date: '2024-12-20', language: 'Hindi',  format: 'IMAX',     price: 500, availableSeats: 300, totalSeats: 350, isActive: true },
  { id: 's7',  movie: 'Salaar',        cinemaId: 'cn3', screenNo: 4, startTime: '20:00', endTime: '23:00', date: '2024-12-20', language: 'Telugu', format: '2D',       price: 280, availableSeats: 100, totalSeats: 200, isActive: true },

  // Bengaluru — PVR Orion (cn5)
  { id: 's8',  movie: 'Pushpa 2',      cinemaId: 'cn5', screenNo: 2, startTime: '13:00', endTime: '16:00', date: '2024-12-20', language: 'Telugu', format: '3D',       price: 380, availableSeats: 150, totalSeats: 200, isActive: true },
  { id: 's9',  movie: 'Kalki 2898 AD', cinemaId: 'cn5', screenNo: 5, startTime: '19:30', endTime: '22:45', date: '2024-12-20', language: 'Kannada',format: '2D',       price: 260, availableSeats: 80,  totalSeats: 180, isActive: true },

  // Chennai — Sathyam Cinemas (cn9)
  { id: 's10', movie: 'Vettaiyan',     cinemaId: 'cn9', screenNo: 1, startTime: '10:30', endTime: '13:30', date: '2024-12-20', language: 'Tamil',  format: '2D',       price: 220, availableSeats: 250, totalSeats: 300, isActive: true },
  { id: 's11', movie: 'Kalki 2898 AD', cinemaId: 'cn9', screenNo: 3, startTime: '15:00', endTime: '18:15', date: '2024-12-20', language: 'Tamil',  format: '3D IMAX',  price: 480, availableSeats: 40,  totalSeats: 180, isActive: true },

  // Gurugram — PVR Ambience Mall (cn_ggn_1)
  { id: 's12', movie: 'Kalki 2898 AD', cinemaId: 'cn_ggn_1', screenNo: 1, startTime: '10:15', endTime: '13:30', date: '2024-12-20', language: 'Hindi', format: 'IMAX', price: 550, availableSeats: 220, totalSeats: 250, isActive: true },
  { id: 's13', movie: 'Pushpa 2',      cinemaId: 'cn_ggn_1', screenNo: 2, startTime: '14:00', endTime: '17:00', date: '2024-12-20', language: 'Hindi', format: '4DX', price: 480, availableSeats: 140, totalSeats: 160, isActive: true },
  { id: 's14', movie: 'Animal',        cinemaId: 'cn_ggn_1', screenNo: 3, startTime: '19:00', endTime: '22:30', date: '2024-12-20', language: 'Hindi', format: '2D', price: 350, availableSeats: 190, totalSeats: 200, isActive: true },

  // Faridabad — INOX Crown Interiorz (cn_fbd_1)
  { id: 's15', movie: 'Pushpa 2',      cinemaId: 'cn_fbd_1', screenNo: 1, startTime: '11:30', endTime: '14:30', date: '2024-12-20', language: 'Hindi', format: '2D', price: 280, availableSeats: 160, totalSeats: 180, isActive: true },
  { id: 's16', movie: 'Kalki 2898 AD', cinemaId: 'cn_fbd_1', screenNo: 2, startTime: '16:15', endTime: '19:30', date: '2024-12-20', language: 'Hindi', format: '3D', price: 360, availableSeats: 110, totalSeats: 150, isActive: true },

  // Chandigarh — PVR Elante Mall (cn_chd_1)
  { id: 's17', movie: 'Kalki 2898 AD', cinemaId: 'cn_chd_1', screenNo: 1, startTime: '12:00', endTime: '15:15', date: '2024-12-20', language: 'Hindi', format: '3D IMAX', price: 460, availableSeats: 240, totalSeats: 280, isActive: true },
  { id: 's18', movie: 'Dunki',         cinemaId: 'cn_chd_1', screenNo: 3, startTime: '17:00', endTime: '20:00', date: '2024-12-20', language: 'Hindi', format: '2D', price: 300, availableSeats: 120, totalSeats: 150, isActive: true },

  // Hyderabad — Prasads IMAX (cn11)
  { id: 's19', movie: 'Pushpa 2',      cinemaId: 'cn11', screenNo: 1, startTime: '10:00', endTime: '13:00', date: '2024-12-20', language: 'Telugu', format: 'IMAX', price: 400, availableSeats: 300, totalSeats: 350, isActive: true },
  { id: 's20', movie: 'Salaar',        cinemaId: 'cn11', screenNo: 2, startTime: '14:30', endTime: '17:30', date: '2024-12-20', language: 'Telugu', format: '4DX', price: 420, availableSeats: 180, totalSeats: 200, isActive: true },
];
