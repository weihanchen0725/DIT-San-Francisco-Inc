import { NextResponse } from 'next/server';

import ContactData from '@/components/Contact/ContactData.json';
import { parseInquiry, type Inquiry } from '@/lib/inquiry';
import { checkRateLimit } from '@/lib/rate-limit';

const RESEND_URL = 'https://api.resend.com/emails';
const MAX_BODY_BYTES = 8_192; // 8 KB

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return entities[character];
  });

const formatInquiry = (inquiry: Inquiry) => {
  const fields = [
    ['First name', inquiry.firstName],
    ['Last name', inquiry.lastName],
    ['Email', inquiry.email],
    ['Phone', inquiry.phone],
    ['Company', inquiry.company],
    ['Country', inquiry.country],
    ['State/Province', inquiry.state],
    ['City', inquiry.city],
    ['Transport mode', inquiry.transportMode],
    ['Origin', inquiry.origin],
    ['Destination', inquiry.destination],
    ['Cargo ready date', inquiry.cargoReadyDate],
    ['Commodity', inquiry.commodity],
    ['Locale', inquiry.locale],
  ].filter(([, value]) => value);

  const text = [
    ...fields.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    inquiry.message,
  ].join('\n');

  const html = [
    ...fields.map(
      ([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`
    ),
    `<p><strong>Message:</strong></p><p>${escapeHtml(inquiry.message).replace(/\n/g, '<br>')}</p>`,
  ].join('');

  return { text, html };
};

export async function POST(request: Request) {
  let payload: unknown;

  try {
    // Guard: cap body size before reading
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'payload_too_large' }, { status: 413 });
    }
    payload = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  // Rate-limit by IP (forwarded for or fallback)
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';
  const rateResult = checkRateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!rateResult.allowed) {
    return NextResponse.json(
      { error: 'rate_limited', retry_after_seconds: rateResult.retryAfterSeconds },
      {
        status: 429,
        headers: { 'Retry-After': String(rateResult.retryAfterSeconds) },
      }
    );
  }

  const result = parseInquiry(payload);

  if (!result.ok) {
    return NextResponse.json({ error: 'invalid_inquiry', fields: result.fields }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || ContactData.data.email;

  if (!apiKey || !from) {
    return NextResponse.json({ error: 'service_unavailable' }, { status: 503 });
  }

  const content = formatInquiry(result.inquiry);
  const subject =
    result.inquiry.subject ||
    `Website inquiry from ${result.inquiry.firstName} ${result.inquiry.lastName}`;

  try {
    const response = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: result.inquiry.email,
        subject,
        text: content.text,
        html: content.html,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'delivery_failed' }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: 'service_unavailable' }, { status: 503 });
  }

  return NextResponse.json({ outcome: 'accepted_for_delivery' }, { status: 202 });
}
