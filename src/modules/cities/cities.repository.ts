// modules/cities/cities.repository.ts — In-memory & Seed-backed Cities Repository

import type { City } from './cities.types.ts';
import { citiesSeed } from '../../../seeds/cities.seed.ts';

const cities: City[] = citiesSeed.map(city => ({
  ...city,
  createdAt: new Date('2024-01-01'),
}));

export const citiesRepository = {
  findAll(): City[] {
    return cities.filter(c => c.isActive);
  },

  findById(id: string): City | undefined {
    return cities.find(c => c.id === id && c.isActive);
  },
};
