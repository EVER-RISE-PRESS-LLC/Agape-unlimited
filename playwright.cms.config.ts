import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', testMatch: 'cms.spec.ts', workers: 1, timeout: 120000,
  outputDir: 'test-results/cms',
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:8789', browserName: 'chromium' },
  reporter: 'list',
});
