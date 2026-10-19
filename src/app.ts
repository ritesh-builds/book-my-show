// app.ts — Fastify app factory

import Fastify from 'fastify';
import { getLoggerOptions } from './bootstrap/logger.ts';
import { bootstrap } from './bootstrap/index.ts';

export async function buildApp() {
  const app = Fastify({
    logger: getLoggerOptions(),
  });

  await bootstrap(app);

  return app;
}
