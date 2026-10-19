// bootstrap/cors.ts — CORS plugin setup

import type { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { env } from '../config/env.ts';

export async function setupCors(app: FastifyInstance): Promise<void> {
  await app.register(cors, {
    origin: env.CORS_ORIGINS.split(',').map(o => o.trim()),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });
}
