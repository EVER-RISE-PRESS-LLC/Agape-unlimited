import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results/e2e',
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:8789', browserName: 'chromium' },
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    command: 'npm run build && npm run preview -- --port 8789', url: 'http://127.0.0.1:8789', timeout: 300000, reuseExistingServer: true,
  },
  reporter: 'list',
});
