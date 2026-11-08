// modules/shows/shows.service.ts — Business logic for shows with Redis Hot-Tier Caching

import { showsRepository } from './shows.repository.ts';
import { showsSearch } from './shows.search.ts';
import { showsCache } from './shows.cache.ts';
import { NotFoundError } from '../../shared/errors.ts';
import type { Show } from './shows.types.ts';
import type { ShowQueryInput } from './shows.schema.ts';

export const showsService = {
  async getByCinemaId(cinemaId: string, query?: ShowQueryInput): Promise<Show[]> {
    // If search query provided, use Elasticsearch
    if (query && 'q' in query && typeof query.q === 'string') {
      const results = await showsSearch.search(query.q, cinemaId);
      if (results.length > 0) return results;
    }

    // Fall back to repository (in-memory / MongoDB)
    return showsRepository.findByCinemaId(cinemaId, {
      date: query?.date,
      language: query?.language,
      format: query?.format,
    });
  },

  /**
   * Fetch Top 25 Hot-Tier blockbusters cached in Redis RAM.
   * On cache miss, populates from repository and stores in Redis with 1h TTL.
   */
  async getHotTrendingShows(): Promise<Show[]> {
    const cached = await showsCache.getHotShows();
    if (cached && cached.length > 0) {
      return cached;
    }

    const allShows = showsRepository.findAll();
    const hotShows = allShows.filter(s => s.isHot);
    await showsCache.setHotShows(hotShows);
    return hotShows;
  },

  async getAll(trending?: boolean): Promise<Show[]> {
    if (trending) {
      return this.getHotTrendingShows();
    }
    return showsRepository.findAll();
  },

  async getById(id: string): Promise<Show> {
    const cached = await showsCache.getById(id);
    if (cached) return cached;

    const show = showsRepository.findById(id);
    if (!show) throw new NotFoundError(`Show '${id}'`);

    await showsCache.setById(show);
    return show;
  },
};
