# Payload CMS implementation

Date: 20 October 2026. Scope: replace the code-only publishing system with Payload, reuse compatible SEO/worksheet features, and use native content editing. No remote setup, commit, push, or production deployment was performed.

## Architecture and editing

Payload 3.91.0 runs inside Next.js 16.4.2. OpenNext 1.20.12 packages the application for Cloudflare Workers. D1 stores content/users/revisions and R2 stores public media. All package versions satisfy installed peer ranges. The prior static-export architecture cannot provide authenticated editing, so it was replaced with a server application.

The CMS exposes Pages, Posts, Media, and Users. Native Payload Blocks provide text, image/PDF, call to action, FAQ, and printable worksheet sections. Payload supplies the admin interface, rich text, section ordering, autosave, versions, and preview controls. No custom visual editor or Elementor clone was created. The frontend block renderer is the normal connection between Payload's saved section fields and the existing site's React components.

The eight designed pages have preserved React fallbacks. Their existing public copy is also checked in as eight starter drafts in `cms/starter-pages.json`. The current routes select a published matching CMS page; unpublishing restores the original fallback. The user subsequently required the current design to be preserved when editing existing pages. **The simpler starter drafts must remain unpublished.** Native field integration with the existing designed components and desktop/mobile comparison remain pending under R26. New pages have no fallback. Navigation remains curated in code; new pages can be linked through content sections.

## Integration with the earlier work

Retained: resource URLs, published-only article listing/navigation/sitemap, metadata/canonicals, Article/Breadcrumb data, author/source/related-post fields, worksheet printing, and measurement planning without tracking.

Removed: TypeScript article registry/validator, static route generation, fixture-only preview pages, the old independent article renderer, and their obsolete tests. Native CMS drafts/versions/access rules replace that workflow. The standalone resource CSS was reduced to styles actually used by CMS sections and worksheets.

The existing contact handler is called through a Next route backed by Cloudflare context. Its message validation, same-origin protection, payload limits, rate limiting, and provider-result handling remain intact. Contact email and donation checkout stay deferred. CMS password-reset email also remains disabled, without logging reset tokens.

## Access and publication rules

- Anonymous writes are denied. Public reads require published status and do not opt into draft retrieval.
- Private preview verifies the Payload session before reading a draft with access checks enabled. It returns noindex and private/no-store headers.
- Editors cannot create accounts or elevate their own role. The first account is administrator; subsequent accounts default to editor.
- Publication requires content approval, a title, introduction, and sections. Posts require an actual byline. Future publication dates are rejected; no scheduling worker is implied.
- Slugs are immutable after creation to protect links. New URLs that conflict with application routes are rejected.
- Media uploads are authenticated; files are intentionally publicly readable. Only listed image/PDF formats and the configured 10 MB limit are accepted.
- Worksheets have no submission, storage, analytics, or CMS-write mechanism. The browser holds their values until navigation/reload and can print the complete multiline text.

## Validation

The validation record below is updated after final runtime checks. Tests run locally against temporary records; no real email or payment is sent. Screenshots are ignored artifacts in `test-results/`.

- Production Next/OpenNext build: passed, producing a Worker bundle and assets.
- TypeScript and ESLint: passed.
- Database: both checked-in migrations applied to a separate empty local D1 state. A second migration run completed without changes; SQLite inspection confirmed both migration records.
- CMS integration: passed on the Next development server, covering first-user initialization, anonymous write rejection, private drafts/previews, approval checks, publish/draft/unpublish behavior, sitemap/canonical changes, revisions, upload/readback, editor role restrictions, new pages, worksheet print values, and desktop/mobile accessibility.
- Cloudflare CMS integration: **passed (8.3 seconds)**, including use of the native Publish button and the Live Preview iframe, plus the API/access/revision/media/worksheet checks above. All temporary accounts and records were removed.
- Cloudflare public-site/contact suite: **17 passed (28.3 seconds)** after the social-image asset change. Combined with the CMS scenario, **18 automated tests passed**. The contact-provider unit checks use mocks; browser/API integration runs against the local built Worker.
- Final `npm run typecheck`, `npm run lint`, and `git diff --check`: passed.
- Social image: HTTP 200, image/png, correct PNG dimensions and metadata verified by the suite.
- Final local content: eight page drafts, zero posts, zero users; test accounts/uploads/content cleaned up. The first-admin screen is ready for the user.

The initial runtime checks found and fixed (1) a statically bundled Wrangler CLI import and (2) filesystem reads at module load in the existing social-image generator. The dynamic CLI import follows Payload's official Cloudflare template; the social image is now generated before each build into a static public asset, keeping filesystem access entirely out of the Worker. HTTP 200 alone did not establish success: browser rendering and metadata were checked as well.

## Dependency audit

At installation, npm reported 24 advisories: 2 low, 5 moderate, and 17 high, including transitive paths through Payload/OpenNext and tooling. These are npm's dependency-tree counts, not a count of independently exploitable application issues. `braces` stack exhaustion has no upstream fix in the installed published range; `glob` CLI command injection affects tooling; Drizzle's older esbuild tooling has a development-server advisory; DOMPurify/Monaco also appear in the report. The suggested npm fixes include incompatible major downgrades of Payload/editor packages and the Next ESLint config. Those were not applied. The production-dependency audit (`npm audit --omit=dev`) reports 21 advisories: 2 low, 5 moderate, and 14 high. This is **not a clean dependency audit**, and production rollout requires reviewing current upstream fixes and applicability. No claim of a completed security audit is made.

## Production requirements

Follow [SUPERADMIN-SETUP.md A11](../SUPERADMIN-SETUP.md#a11-launch-payload-cms-r24-r26). Real Cloudflare resources, a production secret, migrations, protected first-administrator setup, backups/recovery, and the new build command remain pending. Deployment is guarded against the all-zero D1 placeholder. Normal development explicitly uses local bindings. The temporary remote-migration opt-in is documented for the superadmin only.

Native feature references: [Blocks](https://payloadcms.com/docs/fields/blocks), [drafts](https://payloadcms.com/docs/versions/drafts), [server-side live preview](https://payloadcms.com/docs/live-preview/server), [Cloudflare template](https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1), and [OpenNext setup](https://opennext.js.org/cloudflare/get-started).
