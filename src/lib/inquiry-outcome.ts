export type InquiryOutcome =
  | 'accepted_for_delivery'
  | 'invalid_request'
  | 'rate_limited'
  | 'payload_too_large'
  | 'delivery_failed'
  | 'service_unavailable'
  | 'network_error';

const API_OUTCOMES = new Set<InquiryOutcome>([
  'accepted_for_delivery',
  'invalid_request',
  'rate_limited',
  'payload_too_large',
  'delivery_failed',
  'service_unavailable',
]);

export const getInquiryOutcome = (
  responseOk: boolean,
  responseBody: unknown
): InquiryOutcome => {
  if (!responseBody || typeof responseBody !== 'object') return 'network_error';

  const body = responseBody as { outcome?: unknown; error?: unknown };
  const candidate = responseOk ? body.outcome : body.error;

  if (candidate === 'invalid_inquiry') return 'invalid_request';
  if (typeof candidate === 'string' && API_OUTCOMES.has(candidate as InquiryOutcome)) {
    return candidate as InquiryOutcome;
  }

  return 'network_error';
};
