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

test('homepage actions distinguish shipment tracking from office details', async ({ page }) => {
  await page.setViewportSize({ width: 1501, height: 900 });
  await page.goto('/en');

  await expect(page.getByRole('link', { name: 'Track a Shipment' })).toHaveAttribute(
    'href',
    'https://ditus.gofreight.co/tracking/login'
  );
  await expect(page.getByRole('link', { name: 'View Office Details' }).first()).toHaveAttribute(
    'href',
    '#contact'
  );
});

test('header keeps shipment tracking and omits the redundant contact CTA', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/en');

  const header = page.getByRole('banner');
  const tracking = header.getByRole('link', { name: 'Track a Shipment', exact: true });

  await expect(tracking).toHaveCSS('background-color', 'rgb(0, 10, 60)');
  await expect(tracking).toHaveCSS('color', 'rgb(255, 204, 0)');
  await expect(header.getByRole('link', { name: 'View Office Details' })).toHaveCount(0);
});

test('header remains within the viewport while resizing in both directions', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/en');

  for (const width of [
    1501, 1500, 1400, 1300, 1200, 1100, 1000, 900, 800, 700, 600, 500, 390, 500, 900, 1300, 1501,
  ]) {
    await page.setViewportSize({ width, height: 900 });

    const headerBox = await page.getByRole('banner').boundingBox();
    expect(headerBox).not.toBeNull();
    expect(headerBox!.x).toBeGreaterThanOrEqual(0);
    expect(headerBox!.x + headerBox!.width).toBeLessThanOrEqual(width);
    await expect(page.locator('html')).toHaveJSProperty('scrollWidth', width);
  }
});

test('header load motion reveals navigation in reading order', async ({ page }) => {
  await page.setViewportSize({ width: 1501, height: 900 });
  await page.goto('/en');

  const header = page.getByRole('banner');
  const navItems = header.locator('nav li');
  await expect(navItems).toHaveCount(5);

  const motion = await header.evaluate((element) => {
    const headerStyle = getComputedStyle(element);
    const items = [...element.querySelectorAll('nav li')].map((item) => {
      const style = getComputedStyle(item);
      return { animationName: style.animationName, animationDelay: style.animationDelay };
    });

    return { headerAnimationName: headerStyle.animationName, items };
  });

  expect(motion.headerAnimationName).not.toBe('none');
  expect(motion.items.every(({ animationName }) => animationName !== 'none')).toBe(true);
  expect(new Set(motion.items.map(({ animationDelay }) => animationDelay)).size).toBeGreaterThan(1);
});

test('header load motion is disabled when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1501, height: 900 });
  await page.goto('/en');

  const header = page.getByRole('banner');
  const motion = await header.evaluate((element) => {
    const headerStyle = getComputedStyle(element);
    const itemAnimationNames = [...element.querySelectorAll('nav li')].map(
      (item) => getComputedStyle(item).animationName
    );

    return {
      animationName: headerStyle.animationName,
      opacity: headerStyle.opacity,
      transform: headerStyle.transform,
      itemAnimationNames,
    };
  });

  expect(motion).toEqual({
    animationName: 'none',
    opacity: '1',
    transform: 'none',
    itemAnimationNames: ['none', 'none', 'none', 'none', 'none'],
  });
});

for (const width of [390, 1280]) {
  test(`office-details anchor jump keeps the Contact heading below the sticky header at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/en');

    const officeDetails = page
      .locator('#home')
      .getByRole('link', { name: 'View Office Details', exact: true });
    await officeDetails.click();

    await expect(page).toHaveURL(/#contact$/);
    await page.waitForTimeout(1_200);

    const alignment = await page.evaluate(() => {
      const header = document.querySelector('header')?.getBoundingClientRect();
      const heading = document.querySelector('#contact h2')?.getBoundingClientRect();

      return {
        headerBottom: header?.bottom ?? 0,
        headingTop: heading?.top ?? -1,
      };
    });

    expect(alignment.headingTop).toBeGreaterThanOrEqual(alignment.headerBottom);
  });
}

test('subpage header section links return to localized homepage sections', async ({ page }) => {
  await page.setViewportSize({ width: 1501, height: 900 });
  await page.goto('/zh-TW/services');

  await expect(page.locator('header nav').getByRole('link', { name: '關於我們' })).toHaveAttribute(
    'href',
    '/zh-TW#about'
  );
  // The single Contact nav item returns to the localized homepage anchor.
  const contactLinks = page.getByRole('banner').getByRole('link', { name: '聯絡我們' });
  await expect(contactLinks).toHaveCount(1);
  for (const link of await contactLinks.all()) {
    await expect(link).toHaveAttribute('href', '/zh-TW#contact');
  }
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

  // The map intentionally loads only when its address card approaches the viewport.
  await page.getByRole('heading', { name: 'Address' }).scrollIntoViewIfNeeded();
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

for (const width of [320, 375, 768, 900, 1024, 1239, 1240, 1280, 1300]) {
  test(`header stays within the viewport at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/en');

    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
        )
      )
      .toBe(true);

    const headerBox = await page.locator('header').boundingBox();
    expect(headerBox?.x ?? 0).toBeGreaterThanOrEqual(0);
    expect((headerBox?.x ?? 0) + (headerBox?.width ?? 0)).toBeLessThanOrEqual(width + 1);
  });
}

test('production homepage includes global service coverage while omitting fictional partner and news surfaces', async ({
  page,
}) => {
  await page.goto('/en');

  const globalServiceMap = page.getByTestId('global-service-map');

  await expect(page.getByRole('heading', { name: 'Industries We Support' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Global Service', exact: true })).toHaveCount(1);
  await expect(globalServiceMap).toBeVisible();
  await expect(globalServiceMap.locator('[data-hub-pin]')).toHaveCount(129);
  await expect(globalServiceMap.locator('button')).toHaveCount(0);
  await expect(globalServiceMap.getByTestId('coverage-legend-item')).toHaveCount(4);

  const homepageSectionOrder = await page
    .locator('main > section')
    .evaluateAll((sections) =>
      sections.map(
        (section) => section.id || section.getAttribute('aria-labelledby') || 'unnamed-section'
      )
    );

  expect(homepageSectionOrder.indexOf('global-service-title')).toBe(
    homepageSectionOrder.indexOf('services') + 1
  );
  expect(homepageSectionOrder.indexOf('industries-title')).toBe(
    homepageSectionOrder.indexOf('global-service-title') + 1
  );
  await expect(page.getByText('Fictional development preview')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Latest News' })).toHaveCount(0);
});

test('responsive menu closes with Escape and restores focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/en');

  const menuButton = page.getByRole('button', { name: 'Open menu' });
  await menuButton.click();
  await expect(page.getByRole('button', { name: 'Close menu' })).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  await expect(page.locator('header ul[data-style-mode="column"]')).toHaveCount(0);
});

test('desktop header shows the full inline navigation above 1500px', async ({ page }) => {
  await page.setViewportSize({ width: 1501, height: 900 });
  await page.goto('/en');

  await expect(page.locator('header nav').getByRole('link', { name: 'Services' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveCount(0);
});

for (const width of [1501, 1600]) {
  test(`inline navigation links do not overlap at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/en');

    // The header renders collapsed server-side and expands on hydration.
    await expect(page.locator('header nav a')).toHaveCount(5);

    const boxes = await page.locator('header nav a').evaluateAll((links) =>
      links.map((link) => {
        const rect = link.getBoundingClientRect();
        return { text: link.textContent ?? '', left: rect.left, right: rect.right };
      })
    );

    expect(boxes.length).toBeGreaterThanOrEqual(5);
    for (let i = 0; i < boxes.length - 1; i += 1) {
      expect(
        boxes[i].right,
        `"${boxes[i].text}" overlaps "${boxes[i + 1].text}" at ${width}px`
      ).toBeLessThanOrEqual(boxes[i + 1].left + 1);
    }
  });
}

test('header moves CTA controls into the menu before equal navigation labels can clip', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1260, height: 900 });
  await page.goto('/en');

  await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
});

// One unified sequence: every header item collapses right-to-left, 100px apart from 1500px.
const unifiedCollapseCases = [
  { width: 1600, remaining: 8 },
  { width: 1501, remaining: 8 },
  { width: 1500, remaining: 7 },
  { width: 1400, remaining: 6 },
  { width: 1300, remaining: 5 },
  { width: 1200, remaining: 4 },
  { width: 1100, remaining: 3 },
  { width: 1000, remaining: 2 },
  { width: 900, remaining: 0 },
  { width: 800, remaining: 0 },
  { width: 700, remaining: 0 },
  { width: 600, remaining: 0 },
  { width: 500, remaining: 0 },
] as const;

const ALL_HEADER_ITEMS = [
  'Home',
  'About',
  'Services',
  'Tools',
  'Contact',
  'Track a Shipment',
  'theme',
  'language',
] as const;

for (const { width, remaining } of unifiedCollapseCases) {
  test(`header keeps the leftmost ${remaining} items inline at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/en');

    // Poll: the header renders collapsed server-side and expands on hydration.
    await expect
      .poll(() =>
        page.evaluate(() => {
          const header = document.querySelector('header');
          const contact = header?.querySelector('[class*="headerContact"]');
          const labels: string[] = [];

          header?.querySelectorAll('ul[data-style-mode="row"] > li > a').forEach((link) => {
            labels.push(link.textContent?.trim() ?? '');
          });
          contact?.querySelectorAll('ul > li > a').forEach((link) => {
            labels.push(link.textContent?.trim() ?? '');
          });
          if (contact?.querySelector('[class*="themeSwitcher"]')) labels.push('theme');
          if (contact?.querySelector('#language-select')) labels.push('language');

          return labels;
        })
      )
      .toEqual([...ALL_HEADER_ITEMS.slice(0, remaining)]);
  });
}

const progressiveNavigationCases = [
  {
    width: 1100,
    inline: ['Home', 'About', 'Services'],
    overflow: ['Tools', 'Contact'],
  },
  {
    width: 1000,
    inline: ['Home', 'About'],
    overflow: ['Services', 'Tools', 'Contact'],
  },
  {
    width: 900,
    inline: [],
    overflow: ['Home', 'About', 'Services', 'Tools', 'Contact'],
  },
  {
    width: 800,
    inline: [],
    overflow: ['Home', 'About', 'Services', 'Tools', 'Contact'],
  },
  {
    width: 700,
    inline: [],
    overflow: ['Home', 'About', 'Services', 'Tools', 'Contact'],
  },
  {
    width: 600,
    inline: [],
    overflow: ['Home', 'About', 'Services', 'Tools', 'Contact'],
  },
  {
    width: 500,
    inline: [],
    overflow: ['Home', 'About', 'Services', 'Tools', 'Contact'],
  },
  {
    width: 390,
    inline: [],
    overflow: ['Home', 'About', 'Services', 'Tools', 'Contact'],
  },
] as const;

for (const { width, inline, overflow } of progressiveNavigationCases) {
  test(`navigation moves links into the menu one at a time at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/en');

    await expect(page.locator('header ul[data-style-mode="row"] > li > a')).toHaveText(inline);

    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.locator('header ul[data-style-mode="column"] > li > a')).toHaveText(overflow);
  });
}

for (const width of [1100, 1000]) {
  test(`inline navigation fills its row with equal-width items at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/en');

    const geometry = await page.locator('header ul[data-style-mode="row"]').evaluate((list) => {
      const listBounds = list.getBoundingClientRect();
      const navBounds = list.closest('nav')?.getBoundingClientRect();
      const items = [...list.children].map((item) => {
        const bounds = item.getBoundingClientRect();
        const link = item.querySelector('a');
        return {
          width: bounds.width,
          linkFits: Boolean(link && link.scrollWidth <= link.clientWidth + 1),
        };
      });

      return {
        listWidth: listBounds.width,
        navWidth: navBounds?.width ?? 0,
        itemWidths: items.map((item) => item.width),
        labelsFit: items.every((item) => item.linkFits),
      };
    });

    expect(Math.abs(geometry.listWidth - geometry.navWidth)).toBeLessThanOrEqual(1);
    expect(
      Math.abs(
        geometry.itemWidths.reduce((total, itemWidth) => total + itemWidth, 0) - geometry.listWidth
      )
    ).toBeLessThanOrEqual(1);
    expect(Math.max(...geometry.itemWidths) - Math.min(...geometry.itemWidths)).toBeLessThanOrEqual(
      1
    );
    expect(geometry.labelsFit).toBe(true);
  });
}

test('Traditional Chinese navigation uses the same progressive split', async ({ page }) => {
  await page.setViewportSize({ width: 960, height: 900 });
  await page.goto('/zh-TW');

  await expect(page.locator('header ul[data-style-mode="row"] > li > a')).toHaveText([
    '首頁',
    '關於我們',
  ]);

  await page.getByRole('button', { name: '開啟選單' }).click();
  await expect(page.locator('header ul[data-style-mode="column"] > li > a')).toHaveText([
    '服務',
    '工具',
    '聯絡我們',
  ]);
});
