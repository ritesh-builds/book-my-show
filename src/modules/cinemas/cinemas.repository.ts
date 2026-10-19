// modules/cinemas/cinemas.repository.ts — In-memory cinema data

import type { Cinema } from './cinemas.types.ts';

const cinemas: Cinema[] = [
  { id: 'cn1', name: 'PVR Juhu',               cityId: 'c1', address: 'Juhu, Mumbai',             screens: 8,  isActive: true, createdAt: new Date('2024-01-01') },
  { id: 'cn2', name: 'INOX Nariman Point',      cityId: 'c1', address: 'Nariman Point, Mumbai',    screens: 6,  isActive: true, createdAt: new Date('2024-01-01') },
  { id: 'cn3', name: 'PVR Select Citywalk',     cityId: 'c2', address: 'Saket, Delhi',             screens: 10, isActive: true, createdAt: new Date('2024-01-01') },
  { id: 'cn4', name: 'Cinepolis Ambience Mall', cityId: 'c2', address: 'Vasant Kunj, Delhi',       screens: 7,  isActive: true, createdAt: new Date('2024-01-01') },
  { id: 'cn5', name: 'PVR Orion Mall',          cityId: 'c3', address: 'Rajajinagar, Bangalore',   screens: 9,  isActive: true, createdAt: new Date('2024-01-01') },
  { id: 'cn6', name: 'INOX Garuda Mall',        cityId: 'c3', address: 'Magrath Road, Bangalore',  screens: 5,  isActive: true, createdAt: new Date('2024-01-01') },
  { id: 'cn7', name: 'PVR Seasons Mall',        cityId: 'c4', address: 'Magarpatta, Pune',         screens: 7,  isActive: true, createdAt: new Date('2024-01-01') },
  { id: 'cn8', name: 'Cinepolis Westend Mall',  cityId: 'c4', address: 'Aundh, Pune',              screens: 5,  isActive: true, createdAt: new Date('2024-01-01') },
  { id: 'cn9', name: 'Sathyam Cinemas',         cityId: 'c5', address: 'Royapettah, Chennai',      screens: 10, isActive: true, createdAt: new Date('2024-01-01') },
  { id: 'cn10', name: 'PVR VR Mall',            cityId: 'c5', address: 'Anna Nagar, Chennai',      screens: 6,  isActive: true, createdAt: new Date('2024-01-01') },
];

export const cinemasRepository = {
  findAll(): Cinema[] {
    return cinemas.filter(c => c.isActive);
  },

  findById(id: string): Cinema | undefined {
    return cinemas.find(c => c.id === id && c.isActive);
  },

  findByCityId(cityId: string): Cinema[] {
    return cinemas.filter(c => c.cityId === cityId && c.isActive);
  },
};
