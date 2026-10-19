// bootstrap/elasticsearch.ts — Elasticsearch lifecycle management

import type { FastifyInstance } from 'fastify';
import { esClient } from '../lib/elastic.client.ts';

export async function connectElasticsearch(app: FastifyInstance): Promise<void> {
  try {
    await esClient.ping();
    app.log.info('Elasticsearch connected');

    app.addHook('onClose', async () => {
      await esClient.close();
      app.log.info('Elasticsearch disconnected');
    });
  } catch (err) {
    app.log.warn({ err }, 'Elasticsearch unavailable — search disabled');
  }
}
