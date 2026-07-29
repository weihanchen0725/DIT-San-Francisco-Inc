import { expect, test } from '@playwright/test';

const locales = ['en', 'zh-TW'];

const routes = [
  '',
  '/about',
  '/contact',
  '/news',
  '/services',
  '/tools',
  '/tools/calculator',
  '/tools/dictionary',
  '/tools/incoterms',
  '/tools/incoterms/advisor',
  '/tools/incoterms/reference-guide',
];

for (const locale of locales) {
  for (const route of routes) {
    const path = `/${locale}${route}`;

    test(`${path} loads without console errors, page errors, or failed responses`, async ({
      page,
    }) => {
      const problems: string[] = [];

      page.on('console', (message) => {
        if (message.type() === 'error') {
          problems.push(`console error: ${message.text()}`);
        }
      });
      page.on('pageerror', (error) => {
        problems.push(`pageerror: ${error.message}`);
      });
      page.on('response', (response) => {
        if (response.status() >= 400) {
          problems.push(`HTTP ${response.status()}: ${response.url()}`);
        }
      });
      page.on('requestfailed', (request) => {
        const errorText = request.failure()?.errorText ?? 'unknown error';
        if (errorText.includes('ERR_ABORTED')) {
          return;
        }
        problems.push(`request failed (${errorText}): ${request.url()}`);
      });

      const response = await page.goto(path);

      expect(response?.status(), `expected HTTP 200 for ${path}`).toBe(200);

      // Best-effort settle so late console/page errors and slow responses are captured.
      await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});

      expect(problems, `problems detected on ${path}:\n${problems.join('\n')}`).toEqual([]);
    });
  }
}
