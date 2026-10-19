// modules/cinemas/cinemas.service.ts — Business logic for cinemas

import { cinemasRepository } from './cinemas.repository.ts';
import { cinemasCache } from './cinemas.cache.ts';
import { NotFoundError } from '../../shared/errors.ts';
import type { Cinema } from './cinemas.types.ts';

export const cinemasService = {
  async getByCityId(cityId: string): Promise<Cinema[]> {
    const cached = await cinemasCache.getByCityId(cityId);
    if (cached) return cached;

    const cinemas = cinemasRepository.findByCityId(cityId);
    await cinemasCache.setByCityId(cityId, cinemas);
    return cinemas;
  },

  async getById(id: string): Promise<Cinema> {
    const cached = await cinemasCache.getById(id);
    if (cached) return cached;

    const cinema = cinemasRepository.findById(id);
    if (!cinema) throw new NotFoundError(`Cinema '${id}'`);

    await cinemasCache.setById(cinema);
    return cinema;
  },
};
