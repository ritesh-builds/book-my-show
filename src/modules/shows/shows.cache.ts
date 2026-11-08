// modules/shows/shows.cache.ts — Redis Cache-Aside & Hot-Tier Engine for Shows (Top 25 Zipfian blockbusters)

import { redisClient } from '../../lib/redis.client.ts';
import type { Show } from './shows.types.ts';

const SHOWS_HOT_KEY = 'shows:hot';
const SHOW_BY_ID_KEY = (id: string) => `shows:${id}`;
const SHOWS_ALL_KEY = 'shows:all';
const TTL = 3600; // 1 hour

export const showsCache = {
  /**
   * Get Top 25 Hot / Trending blockbusters from Redis RAM cache.
   */
  async getHotShows(): Promise<Show[] | null> {
    try {
      const raw = await redisClient.get(SHOWS_HOT_KEY);
      return raw ? (JSON.parse(raw) as Show[]) : null;
    } catch {
      return null;
    }
  },

  /**
   * Cache Top 25 Hot blockbusters in Redis.
   */
  async setHotShows(shows: Show[]): Promise<void> {
    try {
      await redisClient.setex(SHOWS_HOT_KEY, TTL, JSON.stringify(shows));
    } catch {
      // Fail silently if Redis is offline
    }
  },

  /**
   * Get single show by ID from Redis.
   */
  async getById(id: string): Promise<Show | null> {
    try {
      const raw = await redisClient.get(SHOW_BY_ID_KEY(id));
      return raw ? (JSON.parse(raw) as Show) : null;
    } catch {
      return null;
    }
  },

  /**
   * Cache single show by ID in Redis.
   */
  async setById(show: Show): Promise<void> {
    try {
      await redisClient.setex(SHOW_BY_ID_KEY(show.id), TTL, JSON.stringify(show));
    } catch {
      // Fail silently
    }
  },

  /**
   * Invalidate hot shows cache.
   */
  async invalidateHot(): Promise<void> {
    try {
      await redisClient.del(SHOWS_HOT_KEY);
    } catch {
      // Fail silently
    }
  },
};

