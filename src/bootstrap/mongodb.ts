// bootstrap/mongodb.ts — MongoDB lifecycle management

import type { FastifyInstance } from 'fastify';
import { mongoClient } from '../lib/mongodb.client.ts';
import { env } from '../config/env.ts';

export async function connectMongoDB(app: FastifyInstance): Promise<void> {
  try {
    await mongoClient.connect(env.MONGODB_URI);
    app.log.info('MongoDB connected');

    app.addHook('onClose', async () => {
      await mongoClient.disconnect();
      app.log.info('MongoDB disconnected');
    });
  } catch (err) {
    app.log.warn({ err }, 'MongoDB unavailable — running in in-memory mode');
  }
}
