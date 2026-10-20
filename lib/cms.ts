import { cache } from 'react';
import { getPayload } from 'payload';
import config from '@payload-config';
import type { Page, Post } from '@/payload-types';
import { pageMetadata } from './metadata';

export const cms = cache(() => getPayload({ config }));
export const getPage = cache(async (slug: string) => {
  const payload = await cms();
  const { docs } = await payload.find({ collection: 'pages', where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] }, limit: 1, depth: 2, draft: false, overrideAccess: false });
  return docs[0] ?? null;
});
export const getPosts = cache(async () => {
  const payload = await cms();
  const { docs } = await payload.find({ collection: 'posts', where: { _status: { equals: 'published' } }, sort: '-publishedAt', pagination: false, depth: 1, draft: false, overrideAccess: false });
  return docs;
});
export const getPost = cache(async (slug: string) => {
  const payload = await cms();
  const { docs } = await payload.find({ collection: 'posts', where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] }, limit: 1, depth: 2, draft: false, overrideAccess: false });
  return docs[0] ?? null;
});
export function contentPath(record: Page | Post, post = false) {
  return post ? `/resources/${record.slug}` : record.slug === 'home' ? '/' : `/${record.slug}`;
}
export function contentMetadata(record: Page | Post, post = false) {
  const result = pageMetadata(record.seo?.title || record.title, record.seo?.description || record.intro, contentPath(record, post));
  if (post) result.openGraph = { ...result.openGraph, type: 'article', publishedTime: record.publishedAt || undefined, modifiedTime: record.updatedAt };
  return result;
}
