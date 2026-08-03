import { describe, expect, it } from 'vitest';

import { COVERAGE_CODES, GLOBAL_SERVICE_LOCATIONS } from './GlobalService.data';

describe('Global Service locations', () => {
  it('contains 86 unique normalized geographic entries', () => {
    expect(GLOBAL_SERVICE_LOCATIONS).toHaveLength(86);
    expect(new Set(GLOBAL_SERVICE_LOCATIONS.map((location) => location.id))).toHaveLength(86);
  });

  it('contains exactly two country-level office records', () => {
    const countryLevelLocations = GLOBAL_SERVICE_LOCATIONS.filter(
      (location) => location.countryLevel
    );

    expect(countryLevelLocations.map((location) => location.id)).toEqual(['mexico', 'ecuador']);
    expect(countryLevelLocations.every((location) => location.coverage.includes('O'))).toBe(true);
  });

  it('uses only supported coverage codes and valid map coordinates', () => {
    for (const location of GLOBAL_SERVICE_LOCATIONS) {
      expect(location.coverage.length).toBeGreaterThan(0);
      expect(location.coverage.every((code) => COVERAGE_CODES.includes(code))).toBe(true);
      expect(location.latitude).toBeGreaterThanOrEqual(-90);
      expect(location.latitude).toBeLessThanOrEqual(90);
      expect(location.longitude).toBeGreaterThanOrEqual(-180);
      expect(location.longitude).toBeLessThanOrEqual(180);
    }
  });
});
