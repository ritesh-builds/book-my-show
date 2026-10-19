// modules/shows/shows.search.ts — Elasticsearch full-text search for shows

import { esClient } from '../../lib/elastic.client.ts';
import type { Show } from './shows.types.ts';

const SHOWS_INDEX = 'shows';

export const showsSearch = {
  async search(query: string, cinemaId?: string): Promise<Show[]> {
    try {
      const must: object[] = [
        { match: { movie: { query, fuzziness: 'AUTO' } } },
      ];

      if (cinemaId) {
        must.push({ term: { cinemaId } });
      }

      const response = await esClient.search<Show>({
        index: SHOWS_INDEX,
        body: {
          query: { bool: { must } },
          size: 50,
        },
      });

      return response.hits.hits
        .map(hit => hit._source)
        .filter((s): s is Show => s !== undefined);
    } catch {
      return []; // ES unavailable — return empty, caller falls back to repository
    }
  },

  async indexShow(show: Show): Promise<void> {
    try {
      await esClient.index({
        index: SHOWS_INDEX,
        id: show.id,
        document: show,
      });
    } catch {
      // Fire-and-forget — indexing failure doesn't affect write success
    }
  },

  async deleteShow(id: string): Promise<void> {
    try {
      await esClient.delete({ index: SHOWS_INDEX, id });
    } catch {
      // Silently fail
    }
  },
};
