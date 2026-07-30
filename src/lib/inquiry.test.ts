import { describe, expect, it } from 'vitest';

import { parseInquiry } from './inquiry';

describe('parseInquiry', () => {
  const validInquiry = {
    firstName: 'Didi',
    lastName: 'Chen',
    email: 'didi@example.com',
    phone: '',
    company: 'DIT',
    country: 'United States',
    state: 'California',
    city: 'Fremont',
    subject: 'Freight inquiry',
    message: 'I need help with a shipment.',
    consent: true,
    website: '',
    locale: 'en',
  };

  it('normalizes a valid inquiry', () => {
    expect(parseInquiry(validInquiry)).toEqual({
      ok: true,
      inquiry: validInquiry,
    });
  });

  it('rejects missing consent', () => {
    expect(parseInquiry({ ...validInquiry, consent: false })).toEqual({
      ok: false,
      fields: ['consent'],
    });
  });

  it('rejects invalid required fields and ignores honeypot submissions', () => {
    expect(
      parseInquiry({ ...validInquiry, email: 'invalid', message: '', website: 'spam' })
    ).toEqual({
      ok: false,
      fields: ['email', 'message', 'website'],
    });
  });
});
