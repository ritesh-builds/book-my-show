// modules/shows/shows.service.ts — Business logic for shows

import { showsRepository } from './shows.repository.ts';
import { showsSearch } from './shows.search.ts';
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

  async getById(id: string): Promise<Show> {
    const show = showsRepository.findById(id);
    if (!show) throw new NotFoundError(`Show '${id}'`);
    return show;
  },
};
