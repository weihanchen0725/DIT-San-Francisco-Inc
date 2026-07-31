import { expect, test, type Page } from '@playwright/test';

const openResponsiveMenu = async (page: Page) => {
  const menuButton = page.getByRole('button', { name: 'Open menu' });
  if (await menuButton.count()) await menuButton.click();
};

test('theme switcher toggles dark mode and persists across reload', async ({ page }) => {
  await page.goto('/en');

  const html = page.locator('html');
  await openResponsiveMenu(page);

  // Fresh context: defaultTheme is 'light', so the page starts without the dark class.
  await expect(html).not.toHaveClass(/dark/);

  await page.locator('button[role="switch"]').first().click();
  await expect(html).toHaveClass(/dark/);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('dit-theme'))).toBe('dark');

  await page.reload();
  await expect(html).toHaveClass(/dark/);

  // Toggle back to confirm the class is removed again.
  await openResponsiveMenu(page);
  await page.locator('button[role="switch"]').first().click();
  await expect(html).not.toHaveClass(/dark/);
});

test('language switcher navigates to the zh-TW locale', async ({ page }) => {
  await page.goto('/en/tools/calculator');
  await openResponsiveMenu(page);

  await page.locator('#language-select').selectOption('zh-TW');

  await expect(page).toHaveURL(/\/zh-TW\/tools\/calculator$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
});

test('calculator converts units and computes CBM/CFT', async ({ page }) => {
  await page.goto('/en/tools/calculator');

  await page.locator('input[aria-label="piece"]').fill('2');
  await page.locator('input[aria-label="Length-cm"]').fill('100');
  await page.locator('input[aria-label="Width-cm"]').fill('100');
  await page.locator('input[aria-label="Height-cm"]').fill('100');

  // cm -> inch conversion happens as you type.
  await expect(page.locator('input[aria-label="Length-inch"]')).toHaveValue('39.3701');

  await page.locator('button[name="calculate"]').click();

  // 2 pieces of 100x100x100 cm: CBM = 2.00000, CFT = 70.62940.
  await expect(page.locator('body')).toContainText('2.00000');
  await expect(page.locator('body')).toContainText('70.62940');

  // inch -> cm conversion works in the other direction too.
  await page.locator('input[aria-label="Width-inch"]').fill('10');
  await expect(page.locator('input[aria-label="Width-cm"]')).toHaveValue('25.4000');
});

test('contact page renders the Leaflet map with tiles and a marker', async ({ page }) => {
  // Tiles come from an external CDN (CARTO/OpenStreetMap), so allow extra time.
  test.slow();

  await page.goto('/en/contact');

  // The map is a client-only dynamic import, so it can take a moment to appear.
  await expect(page.locator('.leaflet-container')).toBeVisible({ timeout: 15_000 });

  await expect
    .poll(() => page.locator('.leaflet-tile-loaded').count(), { timeout: 30_000 })
    .toBeGreaterThan(0);
  await expect
    .poll(() => page.locator('.leaflet-marker-icon').count(), { timeout: 15_000 })
    .toBeGreaterThan(0);
});

test('zh-TW homepage renders Traditional Chinese content', async ({ page }) => {
  await page.goto('/zh-TW');

  await expect(page.locator('body')).toContainText(/[一-鿿]/);
});
