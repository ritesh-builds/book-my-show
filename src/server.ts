// server.ts — Entry point

import { buildApp } from './app.ts';
import { env } from './config/env.ts';

async function main(): Promise<void> {
  const app = await buildApp();

  // Graceful shutdown handling (SIGINT on Ctrl+C, SIGTERM on container stop)
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  for (const signal of signals) {
    process.on(signal, async () => {
      app.log.info(`Received ${signal}. Shutting down gracefully...`);
      await app.close();
      process.exit(0);
    });
  }

  const address = await app.listen({ port: env.PORT, host: env.HOST });

  app.log.info(`BookMyShow API server running at ${address}`);
  app.log.info(`Swagger Documentation available at ${address}/docs`);
}

main().catch((err: unknown) => {
  console.error('Fatal error during startup:', err);
  process.exit(1);
});
