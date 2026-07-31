import { defineConfig, devices } from '@playwright/test';

// One-off config to run the e2e suite against a fresh production server on
// :3001 (the repo config starts its own server on :3000, which is occupied).
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
  ],
  use: {
    baseURL: 'http://localhost:3001',
  },
});
