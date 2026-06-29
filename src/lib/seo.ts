import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import type { AppLocale } from '../i18n/config';
import { defaultLocale, locales } from '../i18n/config';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ditsanfrancisco.com').replace(
  /\/$/,
  ''
);

export type MetadataPageKey =
  | 'home'
  | 'about'
  | 'services'
  | 'tools'
  | 'news'
  | 'contact'
  | 'dictionary'
  | 'calculator'
  | 'incoterms'
  | 'incotermsAdvisor'
  | 'incotermsReferenceGuide';

type LocalizedRoute = {
  path: string;
  pageKey: MetadataPageKey;
};

export const localizedRoutes: LocalizedRoute[] = [
  { path: '', pageKey: 'home' },
  { path: '/about', pageKey: 'about' },
  { path: '/services', pageKey: 'services' },
  { path: '/tools', pageKey: 'tools' },
  { path: '/news', pageKey: 'news' },
  { path: '/contact', pageKey: 'contact' },
  { path: '/tools/dictionary', pageKey: 'dictionary' },
  { path: '/tools/calculator', pageKey: 'calculator' },
  { path: '/tools/incoterms', pageKey: 'incoterms' },
  { path: '/tools/incoterms/advisor', pageKey: 'incotermsAdvisor' },
  { path: '/tools/incoterms/reference-guide', pageKey: 'incotermsReferenceGuide' },
];

export const getLocalizedPath = (locale: AppLocale | string, path = '') =>
  `/${locale}${path === '/' ? '' : path}`;

export const getAbsoluteLocalizedUrl = (locale: AppLocale | string, path = '') =>
  `${SITE_URL}${getLocalizedPath(locale, path)}`;

const getAlternates = (path: string) => ({
  canonical: getAbsoluteLocalizedUrl(defaultLocale, path),
  languages: {
    ...Object.fromEntries(locales.map((locale) => [locale, getAbsoluteLocalizedUrl(locale, path)])),
    'x-default': getAbsoluteLocalizedUrl(defaultLocale, path),
  },
});

export const getLocalizedMetadata = async ({
  locale,
  path,
  pageKey,
}: {
  locale: AppLocale;
  path: string;
  pageKey: MetadataPageKey;
}): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const title = t(`${pageKey}.title`);
  const description = t(`${pageKey}.description`);

  return {
    title,
    description,
    alternates: {
      ...getAlternates(path),
      canonical: getAbsoluteLocalizedUrl(locale, path),
    },
    openGraph: {
      type: 'website',
      locale: locale === 'zh-TW' ? 'zh_TW' : 'en_US',
      alternateLocale: locale === 'zh-TW' ? ['en_US'] : ['zh_TW'],
      url: getAbsoluteLocalizedUrl(locale, path),
      siteName: 'DIT San Francisco Inc.',
      title,
      description,
      images: [{ url: '/DITLogo.svg', alt: 'DIT San Francisco Inc. logo' }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: ['/DITLogo.svg'],
    },
  };
};
