// modules/bookings/bookings.lock.ts — Redis distributed locking engine for seat concurrency

import { redisClient } from '../../lib/redis.client.ts';

// Lock key format: seat_lock:<showId>:<seatNumber>
export const SEAT_LOCK_PREFIX = 'seat_lock';
export const LOCK_TTL_SECONDS = 480; // 8 minutes (standard production timer)

export function getSeatLockKey(showId: string, seatNumber: string): string {
  return `${SEAT_LOCK_PREFIX}:${showId}:${seatNumber}`;
}

export const seatLockManager = {
  /**
   * Acquire atomic distributed locks on multiple seats simultaneously.
   * If any seat fails to lock (already locked by another user),
   * all previously acquired locks in this attempt are rolled back (All-or-Nothing).
   */
  async acquireLocks(
    showId: string,
    seatNumbers: string[],
    userId: string,
    ttlSeconds = LOCK_TTL_SECONDS,
  ): Promise<{ acquired: boolean; failedSeat?: string }> {
    const lockedKeys: string[] = [];

    for (const seat of seatNumbers) {
      const lockKey = getSeatLockKey(showId, seat);

      try {
        // Atomic SET with NX (Only set if Not eXists) and EX (Expiry in seconds)
        const result = await redisClient.set(lockKey, userId, 'EX', ttlSeconds, 'NX');

        if (result === 'OK') {
          lockedKeys.push(lockKey);
        } else {
          // Concurrency Conflict: Another user has already locked this seat!
          // Rollback all acquired locks in this batch to prevent deadlocks
          await this.releaseMultiple(lockedKeys);
          return { acquired: false, failedSeat: seat };
        }
      } catch {
        // If Redis is unreachable, release what we have and fail safely
        await this.releaseMultiple(lockedKeys);
        return { acquired: false, failedSeat: seat };
      }
    }

    return { acquired: true };
  },

  /**
   * Check if a specific seat is locked and who holds the lock.
   */
  async getLockHolder(showId: string, seatNumber: string): Promise<string | null> {
    try {
      const lockKey = getSeatLockKey(showId, seatNumber);
      return await redisClient.get(lockKey);
    } catch {
      return null;
    }
  },

  /**
   * Get all currently active locks for a specific show.
   */
  async getActiveLocksForShow(showId: string): Promise<Map<string, { userId: string; ttl: number }>> {
    const activeLocks = new Map<string, { userId: string; ttl: number }>();

    try {
      const pattern = `${SEAT_LOCK_PREFIX}:${showId}:*`;
      const keys = await redisClient.keys(pattern);

      if (!keys || keys.length === 0) {
        return activeLocks;
      }

      // Pipeline get & ttl queries for maximum throughput
      const pipeline = redisClient.pipeline();
      for (const key of keys) {
        pipeline.get(key);
        pipeline.ttl(key);
      }
      const results = await pipeline.exec();

      if (results) {
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]!;
          const seatNumber = key.split(':')[2]!;
          const userRes = results[i * 2];
          const ttlRes = results[i * 2 + 1];

          const userId = (userRes && userRes[1] ? userRes[1] : null) as string | null;
          const ttl = (ttlRes && typeof ttlRes[1] === 'number' ? ttlRes[1] : 0) as number;

          if (userId && ttl > 0) {
            activeLocks.set(seatNumber, { userId, ttl });
          }
        }
      }
    } catch {
      // Return empty map on Redis outage (Graceful Degradation)
    }

    return activeLocks;
  },

  /**
   * Release locks for confirmed or cancelled seats.
   */
  async releaseMultiple(keys: string[]): Promise<void> {
    if (keys.length === 0) return;
    try {
      await redisClient.del(...keys);
    } catch {
      // Fail silently
    }
  },

  /**
   * Release specific seats for a show.
   */
  async releaseSeats(showId: string, seatNumbers: string[]): Promise<void> {
    const keys = seatNumbers.map(seat => getSeatLockKey(showId, seat));
    await this.releaseMultiple(keys);
  },
};

