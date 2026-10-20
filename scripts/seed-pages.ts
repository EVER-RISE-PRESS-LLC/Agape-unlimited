import { getPayload } from 'payload';
import config from '../payload.config';
import starters from '../cms/starter-pages.json';
import type { Page } from '../payload-types';

const payload = await getPayload({ config });
for (const starter of starters) {
  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: starter.slug } }, limit: 1, draft: true });
  if (existing.docs.length) continue;
  await payload.create({ collection: 'pages', draft: true, data: starter as Omit<Page, 'id' | 'createdAt' | 'updatedAt'> });
  console.log(`Prepared draft: ${starter.slug}`);
}
console.log('Existing pages were not overwritten. Review starter drafts before publishing.');
process.exit(0);
