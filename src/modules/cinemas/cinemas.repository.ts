// modules/cinemas/cinemas.repository.ts — In-memory & Seed-backed Cinema Repository

import type { Cinema } from './cinemas.types.ts';
import { cinemasSeed } from '../../../seeds/cinemas.seed.ts';

const cinemas: Cinema[] = cinemasSeed.map(c => ({
  ...c,
  createdAt: new Date('2024-01-01'),
}));

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
