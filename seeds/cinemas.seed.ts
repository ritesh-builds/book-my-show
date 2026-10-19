// seeds/cinemas.seed.ts — MongoDB seed data for cinemas

import type { Cinema } from '../src/modules/cinemas/cinemas.types.ts';

export const cinemasSeed: Omit<Cinema, 'createdAt'>[] = [
  { id: 'cn1',  name: 'PVR Juhu',               cityId: 'c1', address: 'Juhu, Mumbai',           screens: 8,  isActive: true },
  { id: 'cn2',  name: 'INOX Nariman Point',      cityId: 'c1', address: 'Nariman Point, Mumbai',  screens: 6,  isActive: true },
  { id: 'cn3',  name: 'PVR Select Citywalk',     cityId: 'c2', address: 'Saket, Delhi',           screens: 10, isActive: true },
  { id: 'cn4',  name: 'Cinepolis Ambience Mall', cityId: 'c2', address: 'Vasant Kunj, Delhi',     screens: 7,  isActive: true },
  { id: 'cn5',  name: 'PVR Orion Mall',          cityId: 'c3', address: 'Rajajinagar, Bangalore', screens: 9,  isActive: true },
  { id: 'cn6',  name: 'INOX Garuda Mall',        cityId: 'c3', address: 'Magrath Road, Bangalore',screens: 5,  isActive: true },
  { id: 'cn7',  name: 'PVR Seasons Mall',        cityId: 'c4', address: 'Magarpatta, Pune',       screens: 7,  isActive: true },
  { id: 'cn8',  name: 'Cinepolis Westend Mall',  cityId: 'c4', address: 'Aundh, Pune',            screens: 5,  isActive: true },
  { id: 'cn9',  name: 'Sathyam Cinemas',         cityId: 'c5', address: 'Royapettah, Chennai',    screens: 10, isActive: true },
  { id: 'cn10', name: 'PVR VR Mall',             cityId: 'c5', address: 'Anna Nagar, Chennai',    screens: 6,  isActive: true },
];
