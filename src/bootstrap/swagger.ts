// bootstrap/swagger.ts — OpenAPI specification and Swagger UI

import type { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export async function setupSwagger(app: FastifyInstance): Promise<void> {
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'BookMyShow API',
        description: 'High-throughput Movie Ticket Booking Platform API',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local development server',
        },
      ],
      tags: [
        { name: 'Cities', description: 'City management and discovery' },
        { name: 'Cinemas', description: 'Cinema listings and details' },
        { name: 'Shows', description: 'Movie showtimes and seat availability' },
        { name: 'Health', description: 'Service health status' },
      ],
    },
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
    staticCSP: true,
  });
}
