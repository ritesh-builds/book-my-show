// lib/redis.client.ts — ioredis singleton

import Redis from 'ioredis';
import { env } from '../config/env.ts';

export const redisClient = new Redis(env.REDIS_URL, {
  lazyConnect: true,
  enableOfflineQueue: false,
  maxRetriesPerRequest: 1,
});

redisClient.on('error', () => {
  // Errors handled in bootstrap/redis.ts
});
