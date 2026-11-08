// modules/auth/auth.routes.ts — Fastify route handlers for user authentication

import type { FastifyPluginAsync } from 'fastify';
import { authService } from './auth.service.ts';
import { RegisterSchema, LoginSchema } from './auth.schema.ts';
import { authenticate } from './auth.middleware.ts';
import type { ApiResponse } from '../../shared/types.ts';
import type { AuthResponse, UserSanitized } from './auth.types.ts';

const authRoutes: FastifyPluginAsync = async (fastify) => {
  // POST /api/v1/auth/register
  fastify.post('/auth/register', async (request, reply): Promise<ApiResponse<AuthResponse>> => {
    const parseResult = RegisterSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: parseResult.error.errors[0]?.message ?? 'Invalid registration data',
      });
    }

    const data = await authService.register(parseResult.data);
    return reply.status(201).send({ success: true, data });
  });

  // POST /api/v1/auth/login
  fastify.post('/auth/login', async (request, reply): Promise<ApiResponse<AuthResponse>> => {
    const parseResult = LoginSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: parseResult.error.errors[0]?.message ?? 'Invalid login data',
      });
    }

    const data = await authService.login(parseResult.data);
    return reply.send({ success: true, data });
  });

  // GET /api/v1/auth/me — Protected current user profile
  fastify.get(
    '/auth/me',
    { preHandler: authenticate },
    async (request, reply): Promise<ApiResponse<UserSanitized>> => {
      const userId = request.user?.userId;
      if (!userId) {
        return reply.status(401).send({ success: false, error: 'Unauthorized' });
      }

      const data = await authService.getProfile(userId);
      return reply.send({ success: true, data });
    },
  );
};

export default authRoutes;

