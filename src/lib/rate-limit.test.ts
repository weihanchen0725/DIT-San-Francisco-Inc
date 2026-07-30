import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { checkRateLimit, _debugSize, _resetRateLimiter } from './rate-limit';

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    _resetRateLimiter();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows requests under the limit', () => {
    expect(checkRateLimit('1.2.3.4', { limit: 3, windowMs: 60_000 }).allowed).toBe(true);
    expect(checkRateLimit('1.2.3.4', { limit: 3, windowMs: 60_000 }).allowed).toBe(true);
    expect(checkRateLimit('1.2.3.4', { limit: 3, windowMs: 60_000 }).allowed).toBe(true);
  });

  it('blocks the request that exceeds the limit', () => {
    for (let i = 0; i < 3; i += 1) {
      checkRateLimit('1.2.3.4', { limit: 3, windowMs: 60_000 });
    }
    const result = checkRateLimit('1.2.3.4', { limit: 3, windowMs: 60_000 });
    expect(result.allowed).toBe(false);
    expect('retryAfterSeconds' in result ? result.retryAfterSeconds : -1).toBeGreaterThan(0);
  });

  it('tracks keys independently', () => {
    for (let i = 0; i < 3; i += 1) {
      checkRateLimit('1.2.3.4', { limit: 3, windowMs: 60_000 });
    }
    expect(checkRateLimit('5.6.7.8', { limit: 3, windowMs: 60_000 }).allowed).toBe(true);
  });

  it('resets after the window expires', () => {
    for (let i = 0; i < 3; i += 1) {
      checkRateLimit('1.2.3.4', { limit: 3, windowMs: 60_000 });
    }
    expect(checkRateLimit('1.2.3.4', { limit: 3, windowMs: 60_000 }).allowed).toBe(false);

    vi.advanceTimersByTime(61_000);

    expect(checkRateLimit('1.2.3.4', { limit: 3, windowMs: 60_000 }).allowed).toBe(true);
  });

  it('evicts oldest entries beyond the max-keys cap so memory stays bounded', () => {
    for (let i = 0; i < 2100; i += 1) {
      checkRateLimit(`ip-${i}`, { limit: 3, windowMs: 60_000 });
    }
    expect(_debugSize()).toBeLessThanOrEqual(2000);
  });
});
