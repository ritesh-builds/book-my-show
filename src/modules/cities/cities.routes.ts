// modules/cities/cities.routes.ts — Fastify route handlers

import type { FastifyPluginAsync } from 'fastify';
import { citiesService } from './cities.service.ts';
import { CityParamsSchema } from './cities.schema.ts';
import type { ApiResponse } from '../../shared/types.ts';
import type { City } from './cities.types.ts';

const citiesRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /api/v1/cities
  fastify.get('/cities', async (_request, reply): Promise<ApiResponse<City[]>> => {
    const data = await citiesService.getAll();
    return reply.send({ success: true, data });
  });

  // GET /api/v1/cities/:id
  fastify.get<{ Params: { id: string } }>(
    '/cities/:id',
    async (request, reply): Promise<ApiResponse<City>> => {
      const result = CityParamsSchema.safeParse(request.params);
      if (!result.success) {
        return reply
          .status(400)
          .send({ success: false, error: result.error.errors[0]?.message ?? 'Invalid params' });
      }

      const data = await citiesService.getById(result.data.id);
      return reply.send({ success: true, data });
    },
  );
};

export default citiesRoutes;
