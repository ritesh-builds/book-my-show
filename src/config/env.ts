// config/env.ts — Zod-validated environment variables

import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGODB_URI: z.string().default('mongodb://localhost:27017/book-my-show'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  ES_URL: z.string().default('http://localhost:9200'),
  JWT_SECRET: z.string().min(16).default('change-me-in-production-secret-key'),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;
