/**
 * One-off script: generates public/og-image.png (1200x630) for Open Graph /
 * Twitter cards by screenshotting an inline HTML template with headless
 * Chromium (reuses the repo's @playwright/test dependency).
 *
 * Usage: node scripts/generate-og-image.mjs
 */
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { writeFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

const require = createRequire(new URL('../package.json', import.meta.url));
const { chromium } = require('@playwright/test');

const logoUrl = new URL('../public/DITLogo.svg', import.meta.url).href;
const outPath = fileURLToPath(new URL('../public/og-image.png', import.meta.url));

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    background: radial-gradient(1400px 900px at 22% 18%, #141432 0%, #0a0a1a 60%);
    font-family: Roboto, -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    position: relative;
  }
  .content {
    position: absolute;
    inset: 0 0 10px 0; /* keep lockup optically centered above the accent bar */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 90px;
  }
  .logo {
    width: 216px;
    height: 201px; /* intrinsic 43:40 aspect ratio */
    flex: none;
  }
  .text {
    margin-left: 64px;
    min-width: 0;
  }
  .name {
    color: #ffffff;
    font-size: 58px;
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 1.15;
    white-space: nowrap;
  }
  .rule {
    width: 88px;
    height: 5px;
    background: #ffcc00;
    border-radius: 3px;
    margin: 26px 0 24px;
  }
  .tagline {
    color: #ffcc00;
    font-size: 29px;
    font-weight: 500;
    letter-spacing: 0.4px;
    white-space: nowrap;
  }
  .accent-bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 10px;
    background: #ffcc00;
  }
</style>
</head>
<body>
  <div class="content">
    <img class="logo" src="${logoUrl}" alt="">
    <div class="text">
      <div class="name">DIT San Francisco Inc.</div>
      <div class="rule"></div>
      <div class="tagline">Bay Area Logistics &amp; Supply Chain Solutions</div>
    </div>
  </div>
  <div class="accent-bar"></div>
</body>
</html>`;

// page.setContent() has no file:// base URL, so Chromium refuses to load the
// local logo from it. Serve the HTML itself from a temp file:// page instead.
const tmpHtml = join(tmpdir(), `dit-og-image-${process.pid}.html`);
writeFileSync(tmpHtml, html);

try {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() =>
    Array.from(document.images).every((img) => img.complete && img.naturalWidth > 0)
  );
  await page.screenshot({ path: outPath });
  await browser.close();
  console.log(`Wrote ${outPath}`);
} finally {
  unlinkSync(tmpHtml);
}
