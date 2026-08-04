import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const isDevelopment = process.env.NODE_ENV === 'development';

// LAN hosts used with `next dev -H 0.0.0.0` (HMR / internal endpoints).
// Host only — Next matches the request Host header, not full origins.
const devLanHosts = ['10.20.18.7', '10.10.0.156'];

const productionSecurityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "object-src 'none'",
      "img-src 'self' data: blob: https://*.basemaps.cartocdn.com",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline'",
      "connect-src 'self' https://api.resend.com https://*.basemaps.cartocdn.com",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    // Dev: skip COOP/HSTS/CSP so LAN IP + HMR + Turbopack internals are not blocked.
    // Production keeps the full security header set.
    if (isDevelopment) {
      return [];
    }

    return [
      {
        source: '/:path*',
        headers: productionSecurityHeaders,
      },
    ];
  },
  // Prevents 403 on /_next/* and __nextjs_* when opening dev via LAN IP.
  allowedDevOrigins: devLanHosts,
};

export default createNextIntlPlugin('./src/i18n/request.ts')(nextConfig);
