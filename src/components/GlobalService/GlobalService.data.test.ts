import { describe, expect, it } from 'vitest';

import { COVERAGE_CODES, GLOBAL_SERVICE_LOCATIONS } from './GlobalService.data';

describe('Global Service locations', () => {
  it('contains 129 unique normalized geographic entries', () => {
    expect(GLOBAL_SERVICE_LOCATIONS).toHaveLength(129);
    expect(new Set(GLOBAL_SERVICE_LOCATIONS.map((location) => location.id))).toHaveLength(129);
  });

  it('contains exactly four region-level records', () => {
    const regionLevelLocations = GLOBAL_SERVICE_LOCATIONS.filter(
      (location) => location.regionLevel
    );

    expect(regionLevelLocations.map((location) => location.id)).toEqual([
      'kedah',
      'selangor',
      'binh-duong',
      'mazowiecki',
    ]);
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
