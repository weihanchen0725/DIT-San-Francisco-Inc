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
  // News is always public now that the feature flag is gone.
  expect(paths).toContain('/news');
});

test('localized SEO URLs preserve locale prefixes', () => {
  for (const locale of locales) {
    expect(getAbsoluteLocalizedUrl(locale, '/tools/calculator')).toContain(
      `/${locale}/tools/calculator`
    );
  }
});

for (const locale of locales) {
  // Renders posts or the empty state (API failure returns []), never a 404.
  test(`/${locale}/news is a public route`, async ({ page }) => {
    const response = await page.goto(`/${locale}/news`);

    expect(response?.status()).toBe(200);
  });
}

test('contact email delivery route is unavailable while the feature is hidden', async ({
  request,
}) => {
  const response = await request.post('/api/contact', { data: {} });

  expect(response.status()).toBe(404);
});
