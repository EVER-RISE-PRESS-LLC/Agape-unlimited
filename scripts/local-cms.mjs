import { existsSync, readFileSync, appendFileSync, mkdirSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
const file = '.env.local';
const existing = existsSync(file) ? readFileSync(file, 'utf8') : '';
if (!/^PAYLOAD_SECRET=.+/m.test(existing)) {
  appendFileSync(file, `\nPAYLOAD_SECRET=${randomBytes(32).toString('hex')}\n`, { mode: 0o600 });
  console.log('Created an ignored local CMS secret.');
}

const localSecret = readFileSync(file, 'utf8').match(/^PAYLOAD_SECRET=(.+)$/m)?.[1];
const workerFile = '.dev.vars';
const workerVars = existsSync(workerFile) ? readFileSync(workerFile, 'utf8') : '';
if (!/^PAYLOAD_SECRET=.+/m.test(workerVars)) {
  appendFileSync(workerFile, `\nPAYLOAD_SECRET=${localSecret}\n`, { mode: 0o600 });
}

// Wrangler's asset binding must exist even before the first production build.
mkdirSync('.open-next/assets', { recursive: true });
