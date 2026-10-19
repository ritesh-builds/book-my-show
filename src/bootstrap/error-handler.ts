// bootstrap/error-handler.ts — Global Fastify error handler

import type { FastifyInstance, FastifyError } from 'fastify';
import { AppError } from '../shared/errors.ts';
import { env } from '../config/env.ts';

export function setupErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler((error: FastifyError, _request, reply) => {
    app.log.error({ err: error }, 'Unhandled error');

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        success: false,
        error: error.message,
        code: error.code,
      });
    }

    if (error.validation) {
      return reply.status(400).send({
        success: false,
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: error.validation,
      });
    }

    const statusCode = error.statusCode ?? 500;
    return reply.status(statusCode).send({
      success: false,
      error:
        env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message,
      code: 'INTERNAL_ERROR',
    });
  });
}
