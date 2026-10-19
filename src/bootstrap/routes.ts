// bootstrap/routes.ts — Register all module routes + health check

import type { FastifyInstance } from 'fastify';
import citiesRoutes from '../modules/cities/cities.routes.ts';
import cinemasRoutes from '../modules/cinemas/cinemas.routes.ts';
import showsRoutes from '../modules/shows/shows.routes.ts';

export async function registerRoutes(app: FastifyInstance): Promise<void> {
  // Health check
  app.get('/health', async (_request, reply) => {
    return reply.send({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // API v1
  await app.register(citiesRoutes, { prefix: '/api/v1' });
  await app.register(cinemasRoutes, { prefix: '/api/v1' });
  await app.register(showsRoutes, { prefix: '/api/v1' });
}
