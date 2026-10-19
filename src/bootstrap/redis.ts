// bootstrap/redis.ts — Redis lifecycle management

import type { FastifyInstance } from 'fastify';
import { redisClient } from '../lib/redis.client.ts';

export async function connectRedis(app: FastifyInstance): Promise<void> {
  try {
    await redisClient.connect();
    app.log.info('Redis connected');

    app.addHook('onClose', async () => {
      redisClient.disconnect();
      app.log.info('Redis disconnected');
    });
  } catch (err) {
    app.log.warn({ err }, 'Redis unavailable — cache disabled');
  }
}
