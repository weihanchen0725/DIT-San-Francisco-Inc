import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ClientProviders from '@/components/Providers/ClientProviders';
import ServerProviders from '@/components/Providers/ServerProviders';
import './globals.scss';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap', // Optimize font loading for better CLS
});

// Site configuration - update these values for production
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ditsanfrancisco.com';
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
        url: '/DITLogo.svg',
        alt: `${COMPANY_NAME} - Logistics Solutions`,
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: COMPANY_NAME,
    description: COMPANY_DESCRIPTION,
    images: ['/DITLogo.svg'],
    // creator: "@ditsanfrancisco", // Add your Twitter handle
  },
  icons: {
    icon: [{ url: '/DITLogo.svg', type: 'image/svg+xml' }],
    shortcut: '/DITLogo.svg',
    apple: [{ url: '/DITLogo.svg', type: 'image/svg+xml' }],
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
  logo: `${SITE_URL}/DITLogo.svg`,
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
  image: `${SITE_URL}/DITLogo.svg`,
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

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
      <body className={`${roboto.variable} font-sans antialiased app_body`}>
        <ServerProviders>
          <ClientProviders>
            <Header />
            <main id="main-content" className="app_main page_container">
              {children}
            </main>
            <Footer />
          </ClientProviders>
        </ServerProviders>
      </body>
    </html>
  );
}
