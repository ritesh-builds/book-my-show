// scripts/health-check.ts — Quick server health check

const BASE_URL = process.env['SERVER_URL'] ?? 'http://localhost:3000';

async function checkHealth(): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/health`);
    const body = await res.json() as { status: string; uptime: number };

    if (res.ok && body.status === 'ok') {
      console.log(`Server is healthy. Uptime: ${body.uptime.toFixed(2)}s`);
      process.exit(0);
    } else {
      console.error('Health check failed:', body);
      process.exit(1);
    }
  } catch (err) {
    console.error('Could not reach server:', err);
    process.exit(1);
  }
}

await checkHealth();
