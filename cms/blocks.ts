import type { Block, Field } from 'payload';

export function safeLink(value: unknown) {
  if (typeof value !== 'string') return 'Enter a website address or a path beginning with /.';
  if (/^\/(?!\/)[^\\\s]*$/.test(value)) return true;
  try { const url = new URL(value); if (url.protocol === 'https:' && !url.username && !url.password) return true; } catch {}
  return 'Use an HTTPS address or a local path beginning with /.';
}
export const blocks: Block[] = [
  { slug: 'text', labels: { singular: 'Text', plural: 'Text sections' }, fields: [
    { name: 'content', type: 'richText', required: true },
  ] },
  { slug: 'image', labels: { singular: 'Image', plural: 'Images' }, fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text' },
  ] },
  { slug: 'callToAction', labels: { singular: 'Call to action', plural: 'Calls to action' }, fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    { name: 'label', type: 'text', required: true, label: 'Button text' },
    { name: 'url', type: 'text', required: true, validate: safeLink },
  ] },
  { slug: 'faq', labels: { singular: 'Questions and answers', plural: 'Questions and answers' }, fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'questions', type: 'array', minRows: 1, required: true, fields: [
      { name: 'question', type: 'text', required: true },
      { name: 'answer', type: 'textarea', required: true },
    ] },
  ] },
  { slug: 'worksheet', labels: { singular: 'Printable worksheet', plural: 'Worksheets' }, fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'instructions', type: 'textarea', required: true },
    { name: 'fields', type: 'array', required: true, minRows: 1, maxRows: 20, fields: [
      { name: 'label', type: 'text', required: true },
      { name: 'multiline', type: 'checkbox', label: 'Space for a longer answer' },
    ] },
  ] },
];
export const layoutField: Field = {
  name: 'layout', label: 'Page sections', type: 'blocks', blocks, required: true, minRows: 1,
  admin: { description: 'Add sections, drag to reorder, and use Preview to see your page.', initCollapsed: true },
};
export const seoField: Field = {
  name: 'seo', label: 'Search appearance', type: 'group', fields: [
    { name: 'title', type: 'text', maxLength: 80, admin: { description: 'Optional. The page title is used when empty.' } },
    { name: 'description', type: 'textarea', maxLength: 180, admin: { description: 'Optional. The introduction is used when empty.' } },
  ],
};
