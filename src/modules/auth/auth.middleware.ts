// modules/auth/auth.middleware.ts — Fastify preHandler hook for JWT verification

import type { FastifyRequest, FastifyReply } from 'fastify';
import { verifyJwt } from './auth.utils.ts';
import { UnauthorizedError } from '../../shared/errors.ts';
import type { JwtPayload } from './auth.types.ts';

declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayload;
  }
}

/**
 * Fastify preHandler hook:
 * Extracts Bearer token, verifies JWT, and attaches payload to request.user.
 */
export async function authenticate(request: FastifyRequest, _reply: FastifyReply): Promise<void> {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Missing or invalid Authorization header');
  }

  const token = authHeader.slice(7).trim();
  const payload = verifyJwt(token);

  if (!payload) {
    throw new UnauthorizedError('Invalid or expired authentication token');
  }

  request.user = payload;
}

