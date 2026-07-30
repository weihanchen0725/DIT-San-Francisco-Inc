import { describe, expect, it } from 'vitest';

import { cmToInch, inchToCm, kgToLb, lbToKg, calculateVolume } from './calculator';

describe('unit conversions', () => {
  it('converts cm to inches to four decimals', () => {
    expect(cmToInch('100')).toBe('39.3701');
    expect(cmToInch('1')).toBe('0.3937');
  });

  it('converts inches to cm to four decimals', () => {
    expect(inchToCm('39.3701')).toBe('100.0000');
  });

  it('converts kg to lb and back to five decimals', () => {
    expect(kgToLb('1')).toBe('2.20462');
    expect(lbToKg('2.20462')).toBe('1.00000');
  });

  it('returns empty string for non-numeric input', () => {
    expect(cmToInch('')).toBe('');
    expect(inchToCm('abc')).toBe('');
    expect(kgToLb('')).toBe('');
    expect(lbToKg('abc')).toBe('');
  });
});

describe('calculateVolume', () => {
  it('computes CBM and CFT for pieces of given dimensions', () => {
    // 2 pieces of 100x100x100 cm: CBM = 2, CFT = 70.6294 (approx)
    const { cbm, cft } = calculateVolume({ pieces: '2', lengthCm: '100', widthCm: '100', heightCm: '100' });
    expect(cbm).toBeCloseTo(2, 5);
    expect(cft).toBeCloseTo(70.6294, 3);
  });

  it('treats invalid values as zero', () => {
    const { cbm, cft } = calculateVolume({ pieces: '', lengthCm: 'x', widthCm: '100', heightCm: '100' });
    expect(cbm).toBe(0);
    expect(cft).toBe(0);
  });
});
