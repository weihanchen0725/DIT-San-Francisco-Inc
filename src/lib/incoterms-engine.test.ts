import { describe, expect, it } from 'vitest';

import { recommendIncoterm } from './incoterms-engine';

describe('recommendIncoterm', () => {
  it('returns EXW for domestic scope', () => {
    const result = recommendIncoterm({
      role: 'seller',
      scope: 'domestic',
      goal: 'lowest-cost',
      transportMode: 'road',
      exportCustoms: true,
      intlFreight: true,
      doorToDoor: true,
      insurance: 'seller',
    });
    expect(result.code).toBe('EXW');
  });

  it('returns DDP for full door-to-door with seller insurance', () => {
    const result = recommendIncoterm({
      role: 'seller',
      scope: 'international',
      goal: 'minimize-risk',
      transportMode: 'sea',
      exportCustoms: true,
      intlFreight: true,
      doorToDoor: true,
      insurance: 'seller',
    });
    expect(result.code).toBe('DDP');
  });

  it('returns DDP when insurance is none and all other door-to-door conditions met', () => {
    const result = recommendIncoterm({
      role: 'buyer',
      scope: 'international',
      goal: 'lowest-cost',
      transportMode: 'sea',
      exportCustoms: true,
      intlFreight: true,
      doorToDoor: true,
      insurance: 'none',
    });
    expect(result.code).toBe('DDP');
  });

  it('returns CIP for air/multi transport with insurance', () => {
    const result = recommendIncoterm({
      role: 'seller',
      scope: 'international',
      goal: 'lowest-cost',
      transportMode: 'air',
      exportCustoms: false,
      intlFreight: false,
      doorToDoor: false,
      insurance: 'seller',
    });
    expect(result.code).toBe('CIP');
  });

  it('returns CPT for air/multi transport without insurance', () => {
    const result = recommendIncoterm({
      role: 'seller',
      scope: 'international',
      goal: 'lowest-cost',
      transportMode: 'multi',
      exportCustoms: false,
      intlFreight: false,
      doorToDoor: false,
      insurance: 'none',
    });
    expect(result.code).toBe('CPT');
  });

  it('returns CIF for sea transport with seller-provided insurance', () => {
    const result = recommendIncoterm({
      role: 'seller',
      scope: 'international',
      goal: 'lowest-cost',
      transportMode: 'sea',
      exportCustoms: false,
      intlFreight: true,
      doorToDoor: false,
      insurance: 'seller',
    });
    expect(result.code).toBe('CIF');
  });

  it('returns FCA for buyer role with minimize-risk goal', () => {
    const result = recommendIncoterm({
      role: 'buyer',
      scope: 'international',
      goal: 'minimize-risk',
      transportMode: 'sea',
      exportCustoms: false,
      intlFreight: false,
      doorToDoor: false,
      insurance: 'self',
    });
    expect(result.code).toBe('FCA');
  });

  it('returns FOB as default for plain sea shipment', () => {
    const result = recommendIncoterm({
      role: 'seller',
      scope: 'international',
      goal: 'lowest-cost',
      transportMode: 'sea',
      exportCustoms: false,
      intlFreight: false,
      doorToDoor: false,
      insurance: 'self',
    });
    expect(result.code).toBe('FOB');
  });

  it('returns only a code and does not invent confidence or responsibility percentages', () => {
    const result = recommendIncoterm({
      role: 'seller',
      scope: 'international',
      goal: 'lowest-cost',
      transportMode: 'sea',
      exportCustoms: false,
      intlFreight: false,
      doorToDoor: false,
      insurance: 'self',
    });
    expect(result).toEqual({ code: 'FOB' });
    expect(result).not.toHaveProperty('confidence');
    expect(result).not.toHaveProperty('sellerPct');
    expect(result).not.toHaveProperty('buyerPct');
  });
});
