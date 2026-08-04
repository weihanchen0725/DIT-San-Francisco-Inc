import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
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
              `font-src 'self' data:${isDevelopment ? ' https://www.slant.co' : ''}`,
              "style-src 'self' 'unsafe-inline'",
              `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}`,
              "connect-src 'self' https://api.resend.com https://*.basemaps.cartocdn.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
  allowedDevOrigins: ['http://10.10.0.156:3000'],
};

export default createNextIntlPlugin('./src/i18n/request.ts')(nextConfig);
