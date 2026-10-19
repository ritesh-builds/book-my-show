// modules/shows/shows.routes.ts — Fastify route handlers

import type { FastifyPluginAsync } from 'fastify';
import { showsService } from './shows.service.ts';
import { ShowParamsSchema, ShowsByCinemaParamsSchema, ShowQuerySchema } from './shows.schema.ts';
import type { ApiResponse } from '../../shared/types.ts';
import type { Show } from './shows.types.ts';

const showsRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /api/v1/cinemas/:cinemaId/shows?date=&language=&format=
  fastify.get<{ Params: { cinemaId: string }; Querystring: Record<string, string> }>(
    '/cinemas/:cinemaId/shows',
    async (request, reply): Promise<ApiResponse<Show[]>> => {
      const paramsResult = ShowsByCinemaParamsSchema.safeParse(request.params);
      if (!paramsResult.success) {
        return reply
          .status(400)
          .send({ success: false, error: paramsResult.error.errors[0]?.message ?? 'Invalid params' });
      }

      const queryResult = ShowQuerySchema.safeParse(request.query);
      if (!queryResult.success) {
        return reply
          .status(400)
          .send({ success: false, error: queryResult.error.errors[0]?.message ?? 'Invalid query' });
      }

      const data = await showsService.getByCinemaId(paramsResult.data.cinemaId, queryResult.data);
      return reply.send({ success: true, data });
    },
  );

  // GET /api/v1/shows/:id
  fastify.get<{ Params: { id: string } }>(
    '/shows/:id',
    async (request, reply): Promise<ApiResponse<Show>> => {
      const result = ShowParamsSchema.safeParse(request.params);
      if (!result.success) {
        return reply
          .status(400)
          .send({ success: false, error: result.error.errors[0]?.message ?? 'Invalid params' });
      }

      const data = await showsService.getById(result.data.id);
      return reply.send({ success: true, data });
    },
  );
};

export default showsRoutes;
