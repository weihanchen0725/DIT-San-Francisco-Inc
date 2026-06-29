import type { MetadataRoute } from 'next';

import { locales } from '@/i18n/config';
import { getAbsoluteLocalizedUrl, localizedRoutes } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedRoutes.flatMap(({ path }) =>
    locales.map((locale) => ({
      url: getAbsoluteLocalizedUrl(locale, path),
      lastModified: new Date(),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((altLocale) => [altLocale, getAbsoluteLocalizedUrl(altLocale, path)])),
          'x-default': getAbsoluteLocalizedUrl('en', path),
        },
      },
    }))
  );
}

export const dynamic = 'force-static';
