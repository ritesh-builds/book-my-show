// modules/shows/shows.repository.ts — In-memory & Seed-backed Shows Repository

import type { Show } from './shows.types.ts';
import { showsSeed } from '../../../seeds/shows.seed.ts';

const shows: Show[] = showsSeed.map(s => ({
  ...s,
  createdAt: new Date('2024-12-20'),
}));

export interface ShowFilters {
  date?: string | undefined;
  language?: string | undefined;
  format?: string | undefined;
}

export const showsRepository = {
  findAll(): Show[] {
    return shows.filter(s => s.isActive);
  },

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
