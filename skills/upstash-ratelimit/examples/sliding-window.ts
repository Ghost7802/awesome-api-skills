import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const cache = new Map();

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '10 s'),
  ephemeralCache: cache,
  analytics: true,
  prefix: '@upstash/ratelimit',
});

export async function checkRateLimit(identifier: string) {
  const { success, limit, remaining, reset } = await ratelimit.limit(identifier);
  return { success, limit, remaining, reset };
}
