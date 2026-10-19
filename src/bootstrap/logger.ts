// bootstrap/logger.ts — Pino logger configuration

import type { FastifyServerOptions } from 'fastify';
import { env } from '../config/env.ts';

type LoggerOptions = FastifyServerOptions['logger'];

export function getLoggerOptions(): LoggerOptions {
  return {
    level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    ...(env.NODE_ENV !== 'production' && {
      transport: {
        target: 'pino/file',
        options: { destination: 1 }, // stdout
      },
    }),
  };
}
