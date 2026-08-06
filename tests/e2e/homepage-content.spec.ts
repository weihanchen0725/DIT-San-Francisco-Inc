import { expect, test } from '@playwright/test';

const localizedContent = {
  en: {
    aboutTitle: 'About Us',
    credibilityTitle: 'Company information',
    facts: [
      'Founded',
      '2021',
      'Company relationship',
      'FMC OTI License',
      'No. 29166',
      'Public trade activity',
    ],
    removedCaptions: [
      'Public details buyers can use when evaluating DIT San Francisco Inc.',
      'ImportKey is an independent third-party data source. Its records are not a customer endorsement.',
    ],
  },
  'zh-TW': {
    aboutTitle: '關於我們',
    credibilityTitle: '公司資訊',
    facts: ['成立年份', '2021', '公司關係', 'FMC OTI 執照', '編號 29166', '公開貿易活動'],
    removedCaptions: [
      '買方評估 DIT San Francisco Inc. 時可查核的公開資訊。',
      'ImportKey 為獨立第三方資料來源；其紀錄不代表客戶背書。',
    ],
  },
} as const;

const aboutRoutes = [
  { path: '', label: 'homepage' },
  { path: '/about', label: 'About page' },
] as const;

for (const [locale, content] of Object.entries(localizedContent)) {
  for (const route of aboutRoutes) {
    test(`${locale} ${route.label} presents verified company details within About Us`, async ({
      page,
    }) => {
      await page.goto(`/${locale}${route.path}`);

      const about = page.locator('#about');
      await expect(about.getByRole('heading', { name: content.aboutTitle })).toBeVisible();

      for (const fact of content.facts) {
        await expect(about.getByText(fact, { exact: true })).toBeVisible();
      }

      for (const caption of content.removedCaptions) {
        await expect(about.getByText(caption, { exact: true })).toHaveCount(0);
      }

      await expect(
        page.getByRole('heading', { name: content.credibilityTitle, exact: true })
      ).toHaveCount(0);
    });
  }
}

test('Industries uses the full homepage width', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/en');

  const industries = page.locator('section[aria-labelledby="industries-title"]');

  await expect(industries).toBeVisible();

  const industryCards = industries.locator('article');
  const firstCard = await industryCards.first().boundingBox();
  const lastCard = await industryCards.last().boundingBox();

  expect(firstCard?.x).toBeLessThanOrEqual(40);
  expect(
    lastCard ? 1440 - (lastCard.x + lastCard.width) : Number.POSITIVE_INFINITY
  ).toBeLessThanOrEqual(40);
});

test('hero omits the duplicate verified proof strip', async ({ page }) => {
  await page.goto('/en');

  await expect(page.getByTestId('hero-proof-strip')).toHaveCount(0);
});

test('production homepage excludes the fictional partner preview', async ({ page }) => {
  await page.goto('/en');

  await expect(page.locator('#partners')).toHaveCount(0);
  await expect(page.getByText('Fictional development preview')).toHaveCount(0);
});

test('header and hero use the San Francisco brand location with a yellow hero accent', async ({
  page,
}) => {
  await page.goto('/en');

  const header = page.getByRole('banner');
  await expect(header.getByText('(San Francisco)', { exact: true })).toBeVisible();

  const heading = page.getByRole('heading', {
    name: 'International freight forwarding from San Francisco',
    exact: true,
  });
  const location = heading.getByText('San Francisco', { exact: true });

  await expect(heading).toBeVisible();
  await expect(location).toHaveCSS('color', 'rgb(255, 204, 0)');

  await page.goto('/zh-TW');

  const zhHeader = page.getByRole('banner');
  await expect(zhHeader.getByText('(舊金山)', { exact: true })).toBeVisible();
  await expect(
    page.getByRole('heading', {
      name: '從舊金山出發的 國際貨運代理服務',
      exact: true,
    })
  ).toBeVisible();
});

test('services cards explain who each service is for and what to share for a quote', async ({
  page,
}) => {
  await page.goto('/en/services');

  await expect(page.getByText('Ideal for').first()).toBeVisible();
  await expect(page.getByText('For a quote, share').first()).toBeVisible();
  await expect(
    page.getByText('Importers and exporters moving commercial cargo internationally.')
  ).toBeVisible();
});

test('homepage service cards explain fit and link to the full services page', async ({
  page,
}) => {
  await page.goto('/en');

  const services = page.locator('#services');
  await expect(services.getByRole('heading', { name: 'Freight Shipping' })).toBeVisible();
  await expect(
    services.getByText(
      'Coordination of ocean and air freight shipments between the Bay Area and international ports through the Dolphin Logistics network.'
    )
  ).toBeVisible();
  await expect(services.getByText('Ideal for').first()).toBeVisible();
  await expect(services.getByText('For a quote, share').first()).toBeVisible();
  await expect(services.getByRole('link', { name: 'Explore all services' })).toHaveAttribute(
    'href',
    '/en/services'
  );
});

test('normal homepage sections use intrinsic height and the contact form comes first', async ({
  page,
}) => {
  await page.goto('/en');

  await expect(page.locator('#services')).toHaveCSS('min-height', 'auto');
  const contactChildren = page.locator('#contact > div').last().locator(':scope > div');
  await expect(contactChildren.first().locator('form')).toHaveCount(1);
});

test('contact details sit left of the form on desktop and the form stays first on mobile', async ({
  page,
}) => {
  const getColumnPositions = async () => {
    const columns = page.locator('#contact > div').last().locator(':scope > div');
    const form = await columns.nth(0).boundingBox();
    const details = await columns.nth(1).boundingBox();
    return { form, details };
  };

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/en/contact');
  const desktop = await getColumnPositions();
  expect(desktop.details?.x ?? Infinity).toBeLessThan(desktop.form?.x ?? 0);
  expect(desktop.form?.width ?? 0).toBeGreaterThan(desktop.details?.width ?? Infinity);

  await page.setViewportSize({ width: 390, height: 844 });
  const mobile = await getColumnPositions();
  expect(mobile.form?.y ?? Infinity).toBeLessThan(mobile.details?.y ?? 0);
});

test('contact form placeholders are visually lighter than entered text in each theme', async ({
  page,
}) => {
  const readInputColors = () =>
    page.locator('input[name="firstName"]').evaluate((input) => ({
      text: getComputedStyle(input).color,
      placeholder: getComputedStyle(input, '::placeholder').color,
    }));

  await page.goto('/en/contact');
  await page.evaluate(() => localStorage.setItem('dit-theme', 'light'));
  await page.reload();
  const light = await readInputColors();

  await page.evaluate(() => localStorage.setItem('dit-theme', 'dark'));
  await page.reload();
  const dark = await readInputColors();

  expect(light.placeholder).not.toBe(light.text);
  expect(dark.placeholder).not.toBe(dark.text);
  expect(light.placeholder).not.toBe(dark.placeholder);
});

test('dictionary category chips retain their taxonomy colors', async ({ page }) => {
  await page.goto('/en/tools/dictionary');

  const category = page.getByText('Customs & Compliance', { exact: true }).first();
  await expect(category).toBeVisible();
  await expect(category).toHaveCSS('background-color', 'rgb(237, 233, 254)');
  await expect(category).toHaveCSS('border-color', 'rgb(196, 181, 253)');
});

test('marketing sections use stable layout heights and stagger their entrance', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 700 });
  await page.goto('/en');

  const services = page.locator('#services');
  await expect(services).toHaveAttribute('data-scroll-reveal', '');
  await expect(services).not.toHaveAttribute('data-scroll-visible', 'true');

  await page.evaluate(() =>
    window.scrollTo(
      0,
      document.querySelector('#services')!.getBoundingClientRect().top + window.scrollY + 100
    )
  );
  await expect(page.locator('#about')).toHaveAttribute('data-scroll-visible', 'true');
  await page.evaluate(() => window.scrollTo(0, 0));

  const contentVisibility = await services.evaluate(
    (section) => getComputedStyle(section).contentVisibility
  );
  expect(contentVisibility).toBe('visible');

  await services.scrollIntoViewIfNeeded();
  await expect(services).toHaveAttribute('data-scroll-visible', 'true');

  const cards = services.locator('[data-scroll-reveal-item]');
  await expect(cards).toHaveCount(4);
  const cardDelays = await cards.evaluateAll((items) =>
    items.map((item) => getComputedStyle(item).animationDelay)
  );
  expect(new Set(cardDelays).size).toBeGreaterThan(1);
});

test('scroll entrances respect reduced-motion preferences', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1280, height: 700 });
  await page.goto('/en');

  const services = page.locator('#services');
  await expect(services).toHaveAttribute('data-scroll-reveal', '');
  const motion = await services.evaluate((section) => {
    const style = getComputedStyle(section);
    return { opacity: style.opacity, transform: style.transform };
  });

  expect(motion).toEqual({ opacity: '1', transform: 'none' });
});

test('marketing content remains visible when JavaScript is unavailable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto('/en');

  const services = page.locator('#services');
  await expect(services.getByRole('heading', { name: 'Freight Shipping' })).toBeVisible();
  await expect(services).toHaveCSS('opacity', '1');

  await context.close();
});

test('contact form collects optional freight-quote shipment context', async ({ page }) => {
  await page.goto('/en/contact');

  await expect(page.getByText('Shipment details for a freight quote')).toBeVisible();
  await page.getByText('Shipment details for a freight quote').click();
  await expect(page.locator('select[name="transportMode"]')).toBeVisible();
  await expect(page.locator('input[name="origin"]')).toBeVisible();
  await expect(page.locator('input[name="destination"]')).toBeVisible();
  await expect(page.locator('input[name="cargoReadyDate"]')).toBeVisible();
  await expect(page.locator('input[name="commodity"]')).toBeVisible();
});

test('footer presents company identity, license, contact, and service links', async ({ page }) => {
  await page.goto('/en');

  const footer = page.locator('footer');
  await expect(footer).toContainText('Bay Area OTI office of Dolphin Logistics in Fremont, CA');
  await expect(footer).toContainText('FMC OTI License No. 29166');
  await expect(footer).toContainText('46750 Fremont Blvd #200');
  await expect(footer.getByRole('link', { name: 'Freight Shipping' })).toHaveAttribute(
    'href',
    '/en/services'
  );
  await expect(footer.getByRole('link', { name: 'CBM / CFT Calculator' })).toHaveAttribute(
    'href',
    '/en/tools/calculator'
  );
  await expect(footer.getByRole('link', { name: 'Request a Freight Quote' })).toHaveAttribute(
    'href',
    '/en#contact'
  );
});

test('footer follows the selected light and dark theme', async ({ page }) => {
  const readFooterTheme = () =>
    page.locator('footer').evaluate((footer) => {
      const heading = footer.querySelector('[class*="heading"]');
      const line = footer.querySelector('[class*="line"]');
      const probe = document.createElement('span');
      probe.style.backgroundColor = 'var(--color-bg-secondary)';
      probe.style.color = 'var(--color-text-primary)';
      probe.style.borderColor = 'var(--color-text-secondary)';
      footer.append(probe);
      const probeStyle = getComputedStyle(probe);

      const theme = {
        background: getComputedStyle(footer).backgroundColor,
        expectedBackground: probeStyle.backgroundColor,
        heading: heading ? getComputedStyle(heading).color : '',
        expectedHeading: probeStyle.color,
        line: line ? getComputedStyle(line).color : '',
        expectedLine: probeStyle.borderColor,
      };

      probe.remove();
      return theme;
    });

  await page.goto('/en');
  await page.evaluate(() => localStorage.setItem('dit-theme', 'light'));
  await page.reload();
  const light = await readFooterTheme();

  await page.evaluate(() => localStorage.setItem('dit-theme', 'dark'));
  await page.reload();
  const dark = await readFooterTheme();

  expect(light.background).toBe(light.expectedBackground);
  expect(light.heading).toBe(light.expectedHeading);
  expect(light.line).toBe(light.expectedLine);
  expect(dark.background).toBe(dark.expectedBackground);
  expect(dark.heading).toBe(dark.expectedHeading);
  expect(dark.line).toBe(dark.expectedLine);
  expect(light.background).not.toBe(dark.background);
});

for (const path of ['/en', '/en/about']) {
  test(`${path} About uses the full desktop content width`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(path);

    const about = page.locator('#about');
    const intro = about.locator(':scope > div').first();
    const verification = about.locator(':scope > div').last();
    const headingBounds = await intro.getByRole('heading').boundingBox();
    const descriptionBounds = await intro.locator('p').boundingBox();
    const factsBounds = await verification.locator('dl').boundingBox();

    for (const region of [intro, verification]) {
      const bounds = await region.boundingBox();
      expect(bounds?.x).toBeLessThanOrEqual(40);
      expect(
        bounds ? 1440 - (bounds.x + bounds.width) : Number.POSITIVE_INFINITY
      ).toBeLessThanOrEqual(40);
    }

    expect(descriptionBounds?.y).toBeGreaterThan(
      (headingBounds?.y ?? 0) + (headingBounds?.height ?? 0)
    );
    expect(factsBounds?.y).toBeGreaterThan(
      (descriptionBounds?.y ?? 0) + (descriptionBounds?.height ?? 0)
    );
  });
}
