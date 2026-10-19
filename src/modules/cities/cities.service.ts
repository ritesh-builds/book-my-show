// modules/cities/cities.service.ts — Business logic for cities

import { citiesRepository } from './cities.repository.ts';
import { citiesCache } from './cities.cache.ts';
import { NotFoundError } from '../../shared/errors.ts';
import type { City } from './cities.types.ts';

export const citiesService = {
  async getAll(): Promise<City[]> {
    const cached = await citiesCache.getAll();
    if (cached) return cached;

    const cities = citiesRepository.findAll();
    await citiesCache.setAll(cities);
    return cities;
  },

  async getById(id: string): Promise<City> {
    const cached = await citiesCache.getById(id);
    if (cached) return cached;

    const city = citiesRepository.findById(id);
    if (!city) throw new NotFoundError(`City '${id}'`);

    await citiesCache.setById(city);
    return city;
  },
};
