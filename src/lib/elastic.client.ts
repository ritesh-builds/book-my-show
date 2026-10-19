// lib/elastic.client.ts — Elasticsearch singleton

import { Client } from '@elastic/elasticsearch';
import { env } from '../config/env.ts';

export const esClient = new Client({
  node: env.ES_URL,
  requestTimeout: 5000,
});
