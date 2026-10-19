// bootstrap/index.ts — Master bootstrap orchestrator (order matters!)

import type { FastifyInstance } from 'fastify';
import { setupHelmet } from './helmet.ts';
import { setupCors } from './cors.ts';
import { setupSwagger } from './swagger.ts';
import { connectMongoDB } from './mongodb.ts';
import { connectRedis } from './redis.ts';
import { connectElasticsearch } from './elasticsearch.ts';
import { registerRoutes } from './routes.ts';
import { setupErrorHandler } from './error-handler.ts';
import { setupTelemetry } from './telemetry.ts';
import { setupMetrics } from './metrics.ts';

export async function bootstrap(app: FastifyInstance): Promise<void> {
  // 1. Telemetry & Metrics first (before any requests)
  setupTelemetry();
  setupMetrics(app);

  // 2. Security plugins
  await setupHelmet(app);
  await setupCors(app);

  // 3. Documentation (must be registered before routes)
  await setupSwagger(app);

  // 4. Infrastructure connections (non-blocking — app runs degraded if any fail)
  await connectMongoDB(app);
  await connectRedis(app);
  await connectElasticsearch(app);

  // 4. Routes
  await registerRoutes(app);

  // 5. Error handler last (must be after routes)
  setupErrorHandler(app);
}
