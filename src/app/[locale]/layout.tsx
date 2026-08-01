import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import { locales } from '@/i18n/config';
import { SITE_URL } from '@/lib/seo';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ClientProviders from '@/components/Providers/ClientProviders';
import ServerProviders from '@/components/Providers/ServerProviders';
import './globals.scss';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500', '700'], // 300 unused; 800/900 synthesize from 700
  display: 'swap', // Optimize font loading for better CLS
});

// Site configuration - update these values for production
const COMPANY_NAME = 'DIT San Francisco Inc.';
const COMPANY_DESCRIPTION =
  'DIT San Francisco Inc. is a leading logistics management company providing efficient shipping, tracking, warehousing, and supply chain solutions in the San Francisco Bay Area.';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffcc00' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a1a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: COMPANY_NAME,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: COMPANY_DESCRIPTION,
  keywords: [
    'logistics',
    'shipping',
    'supply chain',
    'freight',
    'transportation',
    'delivery',
    'warehousing',
    'fulfillment',
    'San Francisco',
    'Bay Area',
    'e-commerce logistics',
    'B2B shipping',
    'B2C fulfillment',
    'DIT San Francisco',
  ],
  authors: [{ name: COMPANY_NAME, url: SITE_URL }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['zh_TW'],
    url: SITE_URL,
    siteName: COMPANY_NAME,
    title: COMPANY_NAME,
    description: COMPANY_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${COMPANY_NAME} - Logistics Solutions`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: COMPANY_NAME,
    description: COMPANY_DESCRIPTION,
    images: ['/og-image.png'],
    // creator: "@ditsanfrancisco", // Add your Twitter handle
  },
  icons: {
    icon: [{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'DIT SF',
    statusBarStyle: 'black-translucent',
  },
  category: 'business',
  classification: 'Logistics and Transportation',
  referrer: 'origin-when-cross-origin',
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  other: {
    'msapplication-TileColor': '#ffcc00',
    'mobile-web-app-capable': 'yes',
  },
};

// JSON-LD structured data for better SEO
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY_NAME,
  description: COMPANY_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  foundingDate: '2014',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '46750 Fremont Blvd #200',
    addressLocality: 'Fremont',
    addressRegion: 'CA',
    postalCode: '94538',
    addressCountry: 'US',
  },
  sameAs: ['https://www.linkedin.com/company/dit-sfo/'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['English', 'Chinese'],
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': SITE_URL,
  name: COMPANY_NAME,
  description: COMPANY_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/icon-512.png`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '46750 Fremont Blvd #200',
    addressLocality: 'Fremont',
    addressRegion: 'CA',
    postalCode: '94538',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.47937797375581,
    longitude: -121.9444590947314,
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 37.47937797375581,
      longitude: -121.9444590947314,
    },
    geoRadius: '100 miles',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* DNS prefetch for analytics (uncomment when adding analytics) */}
        {/* <link rel="dns-prefetch" href="https://www.googletagmanager.com" /> */}

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body
        className={`${roboto.variable} font-sans antialiased app_body`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-yellow focus:text-brand-navy focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ServerProviders>
          <ClientProviders>
            <Header />
            <main id="main-content" className="app_main page_container">
              {children}
            </main>
            <Footer />
          </ClientProviders>
        </ServerProviders>
        <Analytics />
      </body>
    </html>
  );
}
