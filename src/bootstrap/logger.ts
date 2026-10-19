// bootstrap/logger.ts — Pino logger configuration

import type { FastifyServerOptions } from 'fastify';
import { env } from '../config/env.ts';

type LoggerOptions = FastifyServerOptions['logger'];

export function getLoggerOptions(): LoggerOptions {
  if (env.NODE_ENV === 'production') {
    return { level: 'info' };
  }

  return {
    level: 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  };
}
