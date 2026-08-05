import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const locales = ['en', 'zh-TW'] as const;
const themes = ['light', 'dark'] as const;

const routes = [
  '',
  '/about',
  '/contact',
  '/services',
  '/tools',
  '/tools/calculator',
  '/tools/dictionary',
  '/tools/incoterms',
  '/tools/incoterms/advisor',
  '/tools/incoterms/reference-guide',
] as const;

for (const theme of themes) {
  for (const locale of locales) {
    for (const route of routes) {
      const path = `/${locale}${route}`;

      test(`${path} has no ${theme} theme accessibility violations`, async ({ page }) => {
        await page.addInitScript((value) => localStorage.setItem('dit-theme', value), theme);
        await page.goto(path);
        await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
        const results = await new AxeBuilder({ page }).analyze();

        expect(results.violations).toEqual([]);
      });
    }
  }
}
