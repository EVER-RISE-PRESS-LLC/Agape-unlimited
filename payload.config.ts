import path from 'node:path';
import { existsSync, realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildConfig } from 'payload';
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { r2Storage } from '@payloadcms/storage-r2';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { Users, Media, Pages, Posts } from './cms/collections';
import { site } from './lib/site';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const isCLI = process.argv.some((arg) => existsSync(arg) && realpathSync(arg).endsWith(path.join('payload', 'bin.js')));
// CLI commands use local bindings unless the superadmin explicitly enables remote
// migration. Ordinary dev/build/test commands must never touch a production DB.
const cloudflare = isCLI
  ? await import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(({ getPlatformProxy }: typeof import('wrangler')) => getPlatformProxy<CloudflareEnv>({ remoteBindings: process.env.PAYLOAD_MIGRATE_REMOTE === '1', ...(process.env.PAYLOAD_LOCAL_STATE ? { persist: { path: process.env.PAYLOAD_LOCAL_STATE } } : {}) }))
  : await getCloudflareContext({ async: true });

export default buildConfig({
  admin: {
    user: 'users', importMap: { baseDir: dirname },
    meta: { titleSuffix: '— Agape website', robots: 'noindex, nofollow', metadataBase: new URL(site.url) },
  },
  collections: [Users, Media, Pages, Posts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: sqliteD1Adapter({ binding: cloudflare.env.D1, migrationDir: path.resolve(dirname, 'cms/migrations') }),
  plugins: [r2Storage({ bucket: cloudflare.env.R2, collections: { media: true } })],
  email: () => ({
    name: 'setup-pending', defaultFromAddress: '', defaultFromName: 'Agape website',
    sendEmail: async () => { throw new Error('CMS email delivery is not configured. Contact the site administrator.'); },
  }),
  // JSON logging avoids the Node-only pretty-printer in the Workers runtime.
  logger: { options: { level: isCLI ? 'info' : 'warn' } },
  graphQL: { disable: true },
  upload: { limits: { fileSize: 10 * 1024 * 1024 } },
});
