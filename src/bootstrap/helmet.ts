// bootstrap/helmet.ts — Security headers via @fastify/helmet

import type { FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';

export async function setupHelmet(app: FastifyInstance): Promise<void> {
  await app.register(helmet, {
    contentSecurityPolicy: false, // API server — no CSP needed
  });
}
