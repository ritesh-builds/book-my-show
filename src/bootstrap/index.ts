// bootstrap/index.ts — Master bootstrap orchestrator (order matters!)

import type { FastifyInstance } from 'fastify';
import { setupHelmet } from './helmet.ts';
import { setupCors } from './cors.ts';
import { connectMongoDB } from './mongodb.ts';
import { connectRedis } from './redis.ts';
import { connectElasticsearch } from './elasticsearch.ts';
import { registerRoutes } from './routes.ts';
import { setupErrorHandler } from './error-handler.ts';
import { setupTelemetry } from './telemetry.ts';

export async function bootstrap(app: FastifyInstance): Promise<void> {
  // 1. Telemetry first (before any requests)
  setupTelemetry();

  // 2. Security plugins
  await setupHelmet(app);
  await setupCors(app);

  // 3. Infrastructure connections (non-blocking — app runs degraded if any fail)
  await connectMongoDB(app);
  await connectRedis(app);
  await connectElasticsearch(app);

  // 4. Routes
  await registerRoutes(app);

  // 5. Error handler last (must be after routes)
  setupErrorHandler(app);
}
