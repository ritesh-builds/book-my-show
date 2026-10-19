// test/cities.test.ts — Cities API tests

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/app.ts';

describe('Cities API', () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  before(async () => {
    app = await buildApp();
    await app.ready();
  });

  after(async () => {
    await app.close();
  });

  describe('GET /api/v1/cities', () => {
    it('should return 200 with a list of cities', async () => {
      const res = await app.inject({ method: 'GET', url: '/api/v1/cities' });
      assert.equal(res.statusCode, 200);

      const body = JSON.parse(res.body) as { success: boolean; data: unknown[] };
      assert.equal(body.success, true);
      assert.ok(Array.isArray(body.data));
      assert.ok(body.data.length > 0);
    });
  });

  describe('GET /api/v1/cities/:id', () => {
    it('should return 200 for a valid city ID', async () => {
      const res = await app.inject({ method: 'GET', url: '/api/v1/cities/c1' });
      assert.equal(res.statusCode, 200);

      const body = JSON.parse(res.body) as { success: boolean; data: { name: string } };
      assert.equal(body.success, true);
      assert.equal(body.data.name, 'Mumbai');
    });

    it('should return 404 for an unknown city ID', async () => {
      const res = await app.inject({ method: 'GET', url: '/api/v1/cities/unknown' });
      assert.equal(res.statusCode, 404);

      const body = JSON.parse(res.body) as { success: boolean };
      assert.equal(body.success, false);
    });
  });
});
