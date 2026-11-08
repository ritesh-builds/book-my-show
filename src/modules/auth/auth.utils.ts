// modules/auth/auth.utils.ts — Scrypt password hashing & JWT token operations

import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.ts';
import type { JwtPayload, User, UserSanitized } from './auth.types.ts';

const TOKEN_EXPIRY = '7d';

/**
 * Hash a plain password using scrypt with a unique random salt.
 * Returns salt and derived key joined with a colon.
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}

/**
 * Verify a plain password against a stored hash using timing-safe comparison.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;

    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = scryptSync(password, salt, 64);

    return timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

/**
 * Generate a signed JWT token with a 7-day expiration.
 */
export function signJwt(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });
}

/**
 * Verify and decode an incoming JWT string.
 */
export function verifyJwt(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return decoded as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * Sanitize user object by stripping sensitive fields like passwordHash.
 */
export function sanitizeUser(user: User): UserSanitized {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
  };
}

