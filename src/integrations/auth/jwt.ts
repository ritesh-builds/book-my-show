// integrations/auth/jwt.ts — JWT sign, verify, refresh helpers

import jwt from 'jsonwebtoken';
import { env } from '../../config/env.ts';
import { UnauthorizedError } from '../../shared/errors.ts';

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export const jwtService = {
  sign(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
  },

  verify(token: string): JwtPayload {
    try {
      return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    } catch {
      throw new UnauthorizedError('Invalid or expired token');
    }
  },

  decode(token: string): JwtPayload | null {
    return jwt.decode(token) as JwtPayload | null;
  },

  refresh(token: string): string {
    const payload = this.verify(token);
    const { iat: _iat, exp: _exp, ...rest } = payload;
    return this.sign(rest);
  },
};
