// test/health.test.ts — Smoke test for /health endpoint

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/app.ts';

describe('GET /health', () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  before(async () => {
    app = await buildApp();
    await app.ready();
  });

  after(async () => {
    await app.close();
  });

  it('should return 200 with status ok', async () => {
    const res = await app.inject({ method: 'GET', url: '/health' });
    assert.equal(res.statusCode, 200);

    const body = JSON.parse(res.body) as { status: string };
    assert.equal(body.status, 'ok');
  });
});
