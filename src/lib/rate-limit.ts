export type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

// Sliding-window: Map<key, timestamps[]>
// Evicts oldest entries when size > MAX_KEYS so memory stays bounded.
const MAX_KEYS = 2_000;
const store = new Map<string, number[]>();

export const _resetRateLimiter = () => store.clear();
export const _debugSize = () => store.size;

const now = () => Date.now();

const sweep = (key: string, windowMs: number) => {
  const cutoff = now() - windowMs;
  const timestamps = store.get(key);
  if (!timestamps) return [];
  const active = timestamps.filter((t) => t > cutoff);
  if (active.length === 0) {
    store.delete(key);
    return [];
  }
  store.set(key, active);
  return active;
};

export const checkRateLimit = (
  key: string,
  { limit, windowMs }: RateLimitOptions,
): RateLimitResult => {
  // Evict stale entries first
  const active = sweep(key, windowMs);

  if (active.length >= limit) {
    const oldest = active[0]!;
    const retryAfterSeconds = Math.ceil((oldest + windowMs - now()) / 1_000);
    return { allowed: false, retryAfterSeconds };
  }

  // Bounded memory: if we're over the cap, drop the oldest key
  if (store.size >= MAX_KEYS) {
    const oldestKey = store.keys().next().value;
    if (oldestKey !== undefined) store.delete(oldestKey);
  }

  const entry = store.get(key) ?? [];
  entry.push(now());
  store.set(key, entry);

  return { allowed: true };
};
