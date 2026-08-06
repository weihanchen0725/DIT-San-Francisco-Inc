import { describe, expect, it } from 'vitest';

import { getInquiryOutcome } from './inquiry-outcome';

describe('getInquiryOutcome', () => {
  it('keeps accepted-for-delivery distinct from confirmed receipt', () => {
    expect(getInquiryOutcome(true, { outcome: 'accepted_for_delivery' })).toBe(
      'accepted_for_delivery'
    );
  });

  it.each([
    'rate_limited',
    'payload_too_large',
    'delivery_failed',
    'service_unavailable',
  ] as const)('preserves the %s API outcome', (outcome) => {
    expect(getInquiryOutcome(false, { error: outcome })).toBe(outcome);
  });

  it('normalizes server validation failures for the client', () => {
    expect(getInquiryOutcome(false, { error: 'invalid_inquiry' })).toBe('invalid_request');
  });

  it('uses a network error for malformed responses', () => {
    expect(getInquiryOutcome(false, null)).toBe('network_error');
  });
});
