import type { MetadataRoute } from 'next';
import { canonicalUrl, publishedPages } from '@/lib/seo';
import { cms, contentPath, getPosts } from '@/lib/cms';
export const dynamic = 'force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await cms();
  const [{ docs: pages }, posts] = await Promise.all([
    payload.find({ collection: 'pages', where: { _status: { equals: 'published' } }, pagination: false, depth: 0, overrideAccess: false }), getPosts(),
  ]);
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const page of publishedPages) entries.set(page.path, { url: canonicalUrl(page.path) });
  for (const page of pages) entries.set(contentPath(page), { url: canonicalUrl(contentPath(page)), lastModified: page.updatedAt });
  if (posts.length) entries.set('/resources', { url: canonicalUrl('/resources') });
  for (const post of posts) entries.set(contentPath(post, true), { url: canonicalUrl(contentPath(post, true)), lastModified: post.updatedAt });
  return [...entries.values()];
}
