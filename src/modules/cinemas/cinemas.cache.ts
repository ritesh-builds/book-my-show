// modules/cinemas/cinemas.cache.ts — Redis cache for cinemas

import { redisClient } from '../../lib/redis.client.ts';
import type { Cinema } from './cinemas.types.ts';

const CINEMAS_BY_CITY_KEY = (cityId: string) => `cinemas:city:${cityId}`;
const CINEMA_BY_ID_KEY = (id: string) => `cinemas:${id}`;
const TTL = 3600;

export const cinemasCache = {
  async getByCityId(cityId: string): Promise<Cinema[] | null> {
    try {
      const raw = await redisClient.get(CINEMAS_BY_CITY_KEY(cityId));
      return raw ? (JSON.parse(raw) as Cinema[]) : null;
    } catch {
      return null;
    }
  },

  async setByCityId(cityId: string, cinemas: Cinema[]): Promise<void> {
    try {
      await redisClient.setex(CINEMAS_BY_CITY_KEY(cityId), TTL, JSON.stringify(cinemas));
    } catch {
      // Silently fail
    }
  },

  async getById(id: string): Promise<Cinema | null> {
    try {
      const raw = await redisClient.get(CINEMA_BY_ID_KEY(id));
      return raw ? (JSON.parse(raw) as Cinema) : null;
    } catch {
      return null;
    }
  },

  async setById(cinema: Cinema): Promise<void> {
    try {
      await redisClient.setex(CINEMA_BY_ID_KEY(cinema.id), TTL, JSON.stringify(cinema));
    } catch {
      // Silently fail
    }
  },
};
