// modules/auth/auth.schema.ts — Zod validation schemas for auth endpoints

import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60),
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be a valid 10-digit number').optional(),
  role: z.enum(['CUSTOMER', 'ADMIN', 'CINEMA_OWNER']).default('CUSTOMER'),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof LoginSchema>;

