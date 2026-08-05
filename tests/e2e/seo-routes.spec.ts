import { expect, test } from '@playwright/test';

import { locales } from '../../src/i18n/config';
import { getAbsoluteLocalizedUrl, localizedRoutes } from '../../src/lib/seo';

test('localized SEO route inventory includes all public tool pages', () => {
  const paths = localizedRoutes.map((route) => route.path);

  expect(paths).toContain('/tools/dictionary');
  expect(paths).toContain('/tools/calculator');
  expect(paths).toContain('/tools/incoterms');
  expect(paths).toContain('/tools/incoterms/advisor');
  expect(paths).toContain('/tools/incoterms/reference-guide');
  expect(paths).not.toContain('/news');
});

test('localized SEO URLs preserve locale prefixes', () => {
  for (const locale of locales) {
    expect(getAbsoluteLocalizedUrl(locale, '/tools/calculator')).toContain(
      `/${locale}/tools/calculator`
    );
  }
});

for (const locale of locales) {
  test(`/${locale}/news is not a public route`, async ({ page }) => {
    const response = await page.goto(`/${locale}/news`);

    expect(response?.status()).toBe(404);
  });
}
