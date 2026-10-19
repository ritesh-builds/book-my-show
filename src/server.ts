// server.ts — Entry point

import { buildApp } from './app.ts';
import { env } from './config/env.ts';

async function main(): Promise<void> {
  const app = await buildApp();

  await app.listen({ port: env.PORT, host: env.HOST });
}

main().catch((err: unknown) => {
  console.error('Fatal error during startup:', err);
  process.exit(1);
});
