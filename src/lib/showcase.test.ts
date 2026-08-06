import { describe, expect, it } from 'vitest';

import { getFictionalShowcaseItems } from './showcase';

describe('fictional showcase data', () => {
  it('is excluded from production', () => {
    expect(getFictionalShowcaseItems('partners', 'production')).toEqual([]);
  });

  it('is available in development and clearly labeled as fictional', () => {
    const partners = getFictionalShowcaseItems('partners', 'development');

    expect(partners.length).toBeGreaterThanOrEqual(5);
    expect(partners.every((item) => item.isFictional)).toBe(true);
  });
});
