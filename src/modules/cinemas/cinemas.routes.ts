// modules/cinemas/cinemas.routes.ts — Fastify route handlers

import type { FastifyPluginAsync } from 'fastify';
import { cinemasService } from './cinemas.service.ts';
import { CinemaParamsSchema, CinemasByCityParamsSchema } from './cinemas.schema.ts';
import type { ApiResponse } from '../../shared/types.ts';
import type { Cinema } from './cinemas.types.ts';

const cinemasRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /api/v1/cities/:cityId/cinemas
  fastify.get<{ Params: { cityId: string } }>(
    '/cities/:cityId/cinemas',
    async (request, reply): Promise<ApiResponse<Cinema[]>> => {
      const result = CinemasByCityParamsSchema.safeParse(request.params);
      if (!result.success) {
        return reply
          .status(400)
          .send({ success: false, error: result.error.errors[0]?.message ?? 'Invalid params' });
      }

      const data = await cinemasService.getByCityId(result.data.cityId);
      return reply.send({ success: true, data });
    },
  );

  // GET /api/v1/cinemas/:id
  fastify.get<{ Params: { id: string } }>(
    '/cinemas/:id',
    async (request, reply): Promise<ApiResponse<Cinema>> => {
      const result = CinemaParamsSchema.safeParse(request.params);
      if (!result.success) {
        return reply
          .status(400)
          .send({ success: false, error: result.error.errors[0]?.message ?? 'Invalid params' });
      }

      const data = await cinemasService.getById(result.data.id);
      return reply.send({ success: true, data });
    },
  );
};

export default cinemasRoutes;
