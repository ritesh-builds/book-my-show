// bootstrap/metrics.ts — Prometheus metrics collection and /metrics endpoint

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import client from 'prom-client';

export function setupMetrics(app: FastifyInstance): void {
  // Collect default Node.js system and runtime metrics
  client.collectDefaultMetrics({
    prefix: 'bms_',
  });

  // HTTP Request Duration Histogram
  const httpRequestDurationSeconds = new client.Histogram({
    name: 'bms_http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
  });

  // HTTP Requests Total Counter
  const httpRequestsTotal = new client.Counter({
    name: 'bms_http_requests_total',
    help: 'Total number of HTTP requests processed',
    labelNames: ['method', 'route', 'status_code'],
  });

  // Active Requests Gauge
  const httpActiveRequests = new client.Gauge({
    name: 'bms_http_active_requests',
    help: 'Number of active HTTP requests currently being handled',
  });

  // Track start time & active requests on incoming request
  app.addHook('onRequest', async (req: FastifyRequest) => {
    httpActiveRequests.inc();
    (req as any).startTime = process.hrtime();
  });

  // Record duration & total counts on response
  app.addHook('onResponse', async (req: FastifyRequest, reply: FastifyReply) => {
    httpActiveRequests.dec();

    if ((req as any).startTime) {
      const diff = process.hrtime((req as any).startTime);
      const durationSeconds = diff[0] + diff[1] / 1e9;
      const route = req.routeOptions?.url || req.raw.url?.split('?')[0] || 'unknown';
      const statusCode = reply.statusCode.toString();
      const method = req.method;

      httpRequestDurationSeconds.observe(
        { method, route, status_code: statusCode },
        durationSeconds
      );
      httpRequestsTotal.inc({ method, route, status_code: statusCode });
    }
  });

  // Prometheus scrape endpoint
  app.get('/metrics', async (_req, reply) => {
    reply.header('Content-Type', client.register.contentType);
    return reply.send(await client.register.metrics());
  });
}
