import { test, expect, request as requestFactory } from '@playwright/test';
import { randomBytes } from 'node:crypto';
import AxeBuilder from '@axe-core/playwright';

// This test intentionally targets only loopback and uses temporary CMS records.
// It refuses to run against a database that already has an owner.
test('native CMS: accounts, draft isolation, blocks, upload, publish, revision, unpublish, and permissions', async ({ page, request, baseURL }) => {
  expect(['localhost', '127.0.0.1']).toContain(new URL(baseURL!).hostname);
  const init = await request.get('/api/users/init');
  expect(await init.json(), 'Use a fresh local database; never replace a real owner.').toMatchObject({ initialized: false });
  const password = randomBytes(24).toString('hex');
  const first = await request.post('/api/users/first-register', { data: { email: 'cms-test@example.invalid', password, name: 'Temporary CMS test' } });
  expect(first.status()).toBe(200);
  const admin = await first.json();
  const user = admin.user ?? admin.doc;
  expect(user.role).toBe('admin');
  const login = await request.post('/api/users/login', { data: { email: 'cms-test@example.invalid', password } });
  expect(login.ok()).toBeTruthy();
  const anon = await requestFactory.newContext({ baseURL });
  const suffix = Date.now().toString();
  const slug = `cms-check-${suffix}`;
  const records: { collection: string; id: number }[] = [];
  try {
    expect((await anon.post('/api/posts', { data: { title: 'Unauthorized' } })).status()).toBe(403);
    const create = await request.post('/api/posts?draft=true', { data: {
      title: 'A test article for the CMS', slug, intro: 'A temporary article used to verify the editor and publication workflow.',
      authorName: 'Test editor', authorType: 'Person', approved: false,
      layout: [{ blockType: 'text', content: { root: { type: 'root', version: 1, children: [{ type: 'paragraph', version: 1, children: [{ type: 'text', version: 1, text: 'A useful paragraph for visitors.', format: 0, detail: 0, mode: 'normal', style: '' }], direction: null, format: '', indent: 0 }], direction: null, format: '', indent: 0 } } },
        { blockType: 'worksheet', heading: 'Plan your next step', instructions: 'Use this space to collect your thoughts.', fields: [{ label: 'My next step', multiline: true }] },
        { blockType: 'callToAction', heading: 'Learn about Agape', text: 'Find out more about the foundation.', label: 'About the foundation', url: '/about' },
        { blockType: 'faq', heading: 'Questions', questions: [{ question: 'Is this a real article?', answer: 'No. It is a temporary test record.' }] }],
    } });
    expect(create.status(), await create.text()).toBe(201);
    const post = (await create.json()).doc; records.push({ collection: 'posts', id: post.id });
    expect((await anon.get(`/resources/${slug}`)).status()).toBe(404);
    const anonDrafts = await anon.get(`/api/posts?draft=true&where[slug][equals]=${slug}`);
    expect((await anonDrafts.json()).docs).toHaveLength(0);
    expect(await (await anon.get('/sitemap.xml')).text()).not.toContain(slug);
    expect((await anon.get(`/preview/posts/${post.id}`, { maxRedirects: 0 })).status()).toBe(307);
    const cookies = (await request.storageState()).cookies;
    await page.context().addCookies(cookies);
    await page.goto(`/admin/collections/posts/${post.id}`);
    await expect(page.getByRole('button', { name: 'Publish changes', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Page sections/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Layout', exact: true })).toBeEnabled();
    await page.screenshot({ path: 'test-results/cms-editor.png', fullPage: true });
    await page.goto(`/preview/posts/${post.id}`);
    await expect(page.getByText('Private preview', { exact: false })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    const unapproved = await request.patch(`/api/posts/${post.id}`, { data: { _status: 'published' } });
    expect(unapproved.status()).toBe(400);
    await page.goto(`/admin/collections/posts/${post.id}`);
    await page.getByRole('checkbox', { name: 'Content approved for publication', exact: true }).check();
    await page.getByRole('button', { name: 'Publish changes', exact: true }).click();
    await expect.poll(async () => (await anon.get(`/resources/${slug}`)).status()).toBe(200);
    await page.getByRole('button', { name: 'Live Preview', exact: true }).click();
    await expect(page.frameLocator('iframe').getByRole('heading', { level: 1 })).toHaveText('A test article for the CMS');
    await page.screenshot({ path: 'test-results/cms-live-preview.png', fullPage: true });
    const publicPost = await anon.get(`/resources/${slug}`);
    expect(publicPost.status()).toBe(200);
    expect(await publicPost.text()).toContain('A useful paragraph for visitors.');
    expect(await (await anon.get('/sitemap.xml')).text()).toContain(`/resources/${slug}`);
    await page.goto(`/resources/${slug}`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`/resources/${slug}$`));
    await page.getByLabel('My next step').fill('First line\nSecond line\nThird line');
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.worksheet-print-value')).toBeVisible();
    await expect(page.locator('.worksheet-print-value')).toContainText('Third line');
    await page.emulateMedia({ media: 'screen' });
    for (const width of [1366, 390]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `test-results/cms-article-${width}.png`, fullPage: true });
    }
    const newer = await request.patch(`/api/posts/${post.id}?draft=true`, { data: { title: 'Private revised title', _status: 'draft' } });
    expect(newer.ok(), await newer.text()).toBeTruthy();
    expect(await (await anon.get(`/resources/${slug}`)).text()).not.toContain('Private revised title');
    const raw = await anon.get(`/api/posts/${post.id}?draft=true`);
    if (raw.ok()) expect(JSON.stringify(await raw.json())).not.toContain('Private revised title');
    const versions = await request.get(`/api/posts/versions?where[parent][equals]=${post.id}`);
    expect((await versions.json()).docs.length).toBeGreaterThan(1);
    const slugChange = await request.patch(`/api/posts/${post.id}`, { data: { slug: 'changed-link' } });
    expect(slugChange.status()).toBe(400);
    const media = await request.post('/api/media', { multipart: { _payload: JSON.stringify({ alt: 'Temporary test pixel' }), file: { name: 'cms-test.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jS3cAAAAASUVORK5CYII=', 'base64') } } });
    expect(media.status(), await media.text()).toBe(201);
    const image = (await media.json()).doc; records.push({ collection: 'media', id: image.id });
    expect((await anon.get(image.url)).status()).toBe(200);
    const editorPassword = randomBytes(24).toString('hex');
    const editorCreate = await request.post('/api/users', { data: { email: 'cms-editor@example.invalid', password: editorPassword, name: 'Temporary editor', role: 'editor' } });
    expect(editorCreate.status(), await editorCreate.text()).toBe(201);
    const editor = (await editorCreate.json()).doc; records.push({ collection: 'users', id: editor.id });
    const editorClient = await requestFactory.newContext({ baseURL });
    await editorClient.post('/api/users/login', { data: { email: 'cms-editor@example.invalid', password: editorPassword } });
    await editorClient.patch(`/api/users/${editor.id}`, { data: { role: 'admin' } });
    const stillEditor = await request.get(`/api/users/${editor.id}`);
    expect((await stillEditor.json()).role).toBe('editor');
    expect((await editorClient.post('/api/users', { data: { name: 'No', email: 'no@example.invalid', password: editorPassword, role: 'admin' } })).status()).toBe(403);
    await editorClient.dispose();
    const newPage = await request.post('/api/pages', { data: { title: 'Temporary landing page', slug: `landing-${suffix}`, intro: 'This page tests the native section editor.', approved: true, _status: 'published', layout: [{ blockType: 'callToAction', heading: 'Get involved', text: 'Join the conversation.', label: 'Contact', url: '/contact' }] } });
    expect(newPage.status(), await newPage.text()).toBe(201);
    const landing = (await newPage.json()).doc; records.push({ collection: 'pages', id: landing.id });
    expect((await anon.get(`/landing-${suffix}`)).status()).toBe(200);
    expect(await (await anon.get('/sitemap.xml')).text()).toContain(`/landing-${suffix}`);
    const unpublish = await request.patch(`/api/posts/${post.id}`, { data: { _status: 'draft' } });
    expect(unpublish.ok()).toBeTruthy();
    expect((await anon.get(`/resources/${slug}`)).status()).toBe(404);
    expect(await (await anon.get('/sitemap.xml')).text()).not.toContain(slug);
  } finally {
    for (const item of records.reverse()) await request.delete(`/api/${item.collection}/${item.id}`);
    await request.delete(`/api/users/${user.id}`);
    await anon.dispose();
  }
});
