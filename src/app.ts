// app.ts — Fastify app factory

import Fastify from 'fastify';
import { getLoggerOptions } from './bootstrap/logger.ts';
import { bootstrap } from './bootstrap/index.ts';

export async function buildApp() {
  const logger = getLoggerOptions();
  const app = Fastify({
    logger,
  });

  await bootstrap(app as any);

  return app;
}
