import type { CollectionConfig, CollectionBeforeChangeHook, Field } from 'payload';
import { APIError } from 'payload';
import { adminOnly, adminField, signedIn, publishedOnly } from './access';
import { layoutField, seoField, safeLink } from './blocks';

const slugField: Field = {
  name: 'slug', type: 'text', required: true, unique: true, index: true,
  admin: { position: 'sidebar', description: 'The URL name, for example community-support. Keep it stable after publishing.' },
  validate: (value: unknown) => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? true : 'Use lowercase words separated by hyphens.',
  hooks: { beforeChange: [({ value, originalDoc, req }) => {
    if (originalDoc?.slug && originalDoc.slug !== value && !req.context.allowSlugChange) {
      throw new APIError('URL names are locked after creation to protect existing links. Create a new page or ask the site administrator to arrange a redirect.', 400);
    }
    return value;
  }] },
};
const publishReview: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  if (data._status === 'published') {
    const record = { ...originalDoc, ...data };
    if (!record.approved) throw new APIError('Confirm that this content is approved before publishing.', 400);
    if (!record.title?.trim() || !record.intro?.trim() || !record.layout?.length) throw new APIError('Add a title, introduction, and at least one section before publishing.', 400);
    if (!record.publishedAt) data.publishedAt = new Date().toISOString();
    else if (!Number.isFinite(Date.parse(record.publishedAt)) || Date.parse(record.publishedAt) > Date.now()) throw new APIError('Use the actual publication date. Scheduled publishing is not enabled.', 400);
  }
  return data;
};
const contentFields: Field[] = [
  { name: 'title', type: 'text', required: true }, slugField,
  { type: 'tabs', tabs: [
    { label: 'Content', fields: [
      { name: 'intro', type: 'textarea', required: true, label: 'Short introduction', maxLength: 500 }, layoutField,
    ] },
    { label: 'Search appearance', fields: [seoField] },
  ] },
  { name: 'approved', type: 'checkbox', label: 'Content approved for publication', defaultValue: false,
    admin: { position: 'sidebar', description: 'Confirm facts, permissions, and any specialist review. Saving a draft does not require approval.' } },
  { name: 'publishedAt', type: 'date', label: 'First published', admin: { position: 'sidebar', description: 'Filled automatically on first publication.' } },
];
function adminPreview(collection: 'pages' | 'posts'): CollectionConfig['admin'] {
  return {
    useAsTitle: 'title', group: 'Website', defaultColumns: ['title', '_status', 'updatedAt'],
    preview: (data) => data.id ? `/preview/${collection}/${data.id}` : null,
    livePreview: { url: ({ data }) => data.id ? `/preview/${collection}/${data.id}` : '',
      breakpoints: [{ label: 'Phone', name: 'phone', width: 390, height: 844 }, { label: 'Desktop', name: 'desktop', width: 1366, height: 900 }] },
  };
}
export const Users: CollectionConfig = {
  slug: 'users', auth: true, admin: { useAsTitle: 'name', group: 'Administration' },
  access: {
    create: adminOnly, delete: adminOnly,
    read: ({ req }) => req.user?.role === 'admin' ? true : req.user ? { id: { equals: req.user.id } } : false,
    update: ({ req }) => req.user?.role === 'admin' ? true : req.user ? { id: { equals: req.user.id } } : false,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'select', options: ['admin', 'editor'], defaultValue: 'editor', required: true,
      access: { create: adminField, update: adminField } },
  ],
  hooks: { beforeChange: [async ({ operation, req, data }) => {
    if (operation === 'create') {
      const { totalDocs } = await req.payload.count({ collection: 'users', req, overrideAccess: true });
      if (totalDocs === 0) data.role = 'admin';
    }
    return data;
  }] },
};
export const Media: CollectionConfig = {
  slug: 'media', admin: { useAsTitle: 'alt', group: 'Website' },
  access: { read: () => true, create: signedIn, update: signedIn, delete: adminOnly },
  upload: { mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'], disableLocalStorage: true },
  fields: [{ name: 'alt', type: 'text', required: true, label: 'Image description / file label', admin: { description: 'Describe the image for visitors who cannot see it. Upload only files approved for public use.' } }],
};
export const Pages: CollectionConfig = {
  slug: 'pages', admin: adminPreview('pages'),
  access: { read: publishedOnly, create: signedIn, update: signedIn, delete: adminOnly },
  versions: { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 30 },
  hooks: { beforeChange: [publishReview, ({ data }) => {
    if (['admin', 'api', 'resources', 'preview', 'sitemap', 'robots', 'opengraph-image', '_next'].includes(data.slug)) throw new APIError('This URL is reserved by the website.', 400);
    return data;
  }] },
  fields: contentFields,
};
export const Posts: CollectionConfig = {
  slug: 'posts', labels: { singular: 'Post', plural: 'Posts' }, admin: adminPreview('posts'),
  access: { read: publishedOnly, create: signedIn, update: signedIn, delete: adminOnly },
  versions: { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 30 },
  hooks: { beforeChange: [publishReview] },
  fields: [...contentFields,
    { name: 'authorName', type: 'text', required: true, admin: { description: 'The actual author or approved organization name. Do not invent a byline.' } },
    { name: 'authorType', type: 'select', options: ['Person', 'Organization'], defaultValue: 'Person', required: true, label: 'Byline type' },
    { name: 'sources', type: 'array', fields: [
      { name: 'title', type: 'text', required: true }, { name: 'url', type: 'text', required: true, validate: safeLink },
    ] },
    { name: 'relatedPosts', type: 'relationship', relationTo: 'posts', hasMany: true, maxRows: 3 },
  ],
};
