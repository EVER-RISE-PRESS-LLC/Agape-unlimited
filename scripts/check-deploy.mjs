import { readFileSync } from 'node:fs';
const config = readFileSync('wrangler.jsonc', 'utf8');
if (config.includes('00000000-0000-0000-0000-000000000000')) {
  throw new Error('Production CMS setup is pending. Follow SUPERADMIN-SETUP.md A11 before deploying.');
}
