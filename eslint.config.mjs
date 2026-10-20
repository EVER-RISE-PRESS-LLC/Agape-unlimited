import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    ".open-next/**",
    "payload-types.ts",
    "app/(payload)/admin/importMap.js",
    ".wrangler/**",
    "out/**",
    "worker-configuration.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
]);
