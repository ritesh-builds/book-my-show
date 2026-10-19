// modules/cities/cities.cache.ts — Redis cache for cities list

import { redisClient } from '../../lib/redis.client.ts';
import type { City } from './cities.types.ts';

const CITIES_ALL_KEY = 'cities:all';
const CITY_BY_ID_KEY = (id: string) => `cities:${id}`;
const TTL = 3600; // 1 hour

export const citiesCache = {
  async getAll(): Promise<City[] | null> {
    try {
      const raw = await redisClient.get(CITIES_ALL_KEY);
      return raw ? (JSON.parse(raw) as City[]) : null;
    } catch {
      return null;
    }
  },

  async setAll(cities: City[]): Promise<void> {
    try {
      await redisClient.setex(CITIES_ALL_KEY, TTL, JSON.stringify(cities));
    } catch {
      // Cache is optional — fail silently
    }
  },

  async getById(id: string): Promise<City | null> {
    try {
      const raw = await redisClient.get(CITY_BY_ID_KEY(id));
      return raw ? (JSON.parse(raw) as City) : null;
    } catch {
      return null;
    }
  },

  async setById(city: City): Promise<void> {
    try {
      await redisClient.setex(CITY_BY_ID_KEY(city.id), TTL, JSON.stringify(city));
    } catch {
      // Silently fail
    }
  },

  async invalidateAll(): Promise<void> {
    try {
      await redisClient.del(CITIES_ALL_KEY);
    } catch {
      // Silently fail
    }
  },
};
