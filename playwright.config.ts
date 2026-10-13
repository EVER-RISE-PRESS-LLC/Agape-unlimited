import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:8789",
    browserName: "chromium",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    command: "npm run build && npm run preview -- --port 8789",
    url: "http://localhost:8789",
    timeout: 120000,
    reuseExistingServer: true,
  },
  reporter: "list",
});
