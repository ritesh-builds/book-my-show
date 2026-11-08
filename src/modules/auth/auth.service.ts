// modules/auth/auth.service.ts — Authentication business logic

import { authRepository } from './auth.repository.ts';
import { hashPassword, verifyPassword, signJwt, sanitizeUser } from './auth.utils.ts';
import { ConflictError, UnauthorizedError, NotFoundError } from '../../shared/errors.ts';
import type { RegisterInput, LoginInput } from './auth.schema.ts';
import type { AuthResponse, User, UserSanitized } from './auth.types.ts';

export const authService = {
  /**
   * Register a new user, hash password, and issue JWT.
   */
  async register(input: RegisterInput): Promise<AuthResponse> {
    const existing = authRepository.findByEmail(input.email);
    if (existing) {
      throw new ConflictError(`User with email '${input.email}' already exists`);
    }

    const newUser: User = {
      id: `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: input.name,
      email: input.email,
      passwordHash: hashPassword(input.password),
      phone: input.phone,
      role: input.role ?? 'CUSTOMER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    authRepository.create(newUser);

    const token = signJwt({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    });

    return {
      user: sanitizeUser(newUser),
      accessToken: token,
      expiresIn: '7d',
    };
  },

  /**
   * Authenticate user credentials and return JWT token.
   */
  async login(input: LoginInput): Promise<AuthResponse> {
    const user = authRepository.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isValid = verifyPassword(input.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = signJwt({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return {
      user: sanitizeUser(user),
      accessToken: token,
      expiresIn: '7d',
    };
  },

  /**
   * Fetch sanitized user profile by ID.
   */
  async getProfile(userId: string): Promise<UserSanitized> {
    const user = authRepository.findById(userId);
    if (!user) {
      throw new NotFoundError(`User '${userId}'`);
    }
    return sanitizeUser(user);
  },
};

