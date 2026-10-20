# Agape Unlimited Foundation

Next.js 16, React 19, Payload CMS 3, TypeScript, and Cloudflare Workers via OpenNext. Payload provides the native `/admin` editor, authentication, rich text, reusable content sections, media library, drafts, autosave, revisions, and private previews.

## Local setup

Use Node **24.18.0** (`.node-version`) and npm.

```sh
npm ci
npm run cms:setup
npm run dev
```

Open http://localhost:3000/admin and create your own first administrator account. `cms:setup` generates an ignored local secret when absent, generates Payload types/imports, and seeds eight existing-page **drafts**, without overwriting existing records. It uses local D1/R2 emulators and does not require a Cloudflare login. The first user is automatically an administrator. Do not commit `.env.local`, `.dev.vars`, or `.wrangler/`.

The existing designed pages must retain their appearance when made editable in Payload. Starter drafts are interim content sources, not approved visual replacements; do not publish their simpler layout over a current page. The field-to-design integration remains pending under R26. Read [the editor guide](docs/cms-editor-guide.md) and the latest instructions in `AGENTS.md`.

The client confirmed **Georgia, United States** and a **community-driven** approach on 21 October 2026. The supplied working legal name and 501(c)(3) reference still need clarification. See [the client information record](docs/client-information-2026-10-21.md) and [the shared review checklist](NEEDS-YOUR-REVIEW.md).

## Content

- `cms/collections.ts` and `cms/blocks.ts`: Pages, Posts, Media, Users, and native Payload field definitions.
- `payload.config.ts`: database, R2, rich text, and admin configuration.
- `app/(payload)`: Payload's admin and REST routes, isolated from site styles.
- `app/(website)`: public pages, article listing, and authenticated preview routes.
- `components/foundation-pages`: original designed page fallbacks.
- `components/cms`: frontend rendering for the native CMS sections and the printable worksheet.
- `cms/starter-pages.json`: existing public copy used only for initial draft seeding.
- `lib/cms.ts`: request-scoped CMS reads; public reads enforce published-only access.
- `cms/migrations`: checked-in database migrations for production schema changes.

There is no parallel code-based article registry, generated route script, or custom editor. A published CMS post immediately appears at `/resources/<slug>` and in the published-only sitemap. New CMS pages use `/<slug>`. Metadata, canonical URLs, Article/Breadcrumb markup, and optional sources/related posts derive from the same CMS document. Admin, API, and private preview routes carry noindex directives. No analytics or Search Console setup was performed.

## Development and checks

```sh
npm run cms:types
npm run cms:importmap
npm run lint
npm run typecheck
npm run build:cloudflare
npm run preview -- --port 8794
PLAYWRIGHT_BASE_URL=http://127.0.0.1:8794 npm run test:e2e
```

`build:cloudflare` performs the production Next build and packages `.open-next/worker.js` plus assets. `build` alone checks Next; it does not create the final deployable Worker. The former static `out/` export is obsolete and is not deployed.

`test:e2e` checks the public website and contact service. `test:cms` checks the actual CMS API/editor with temporary test records. It **requires an empty local Users collection**, refuses non-loopback origins, and cleans up only its own accounts/content. Never run it against an installation with a real owner. To run it before creating your local account:

```sh
PLAYWRIGHT_BASE_URL=http://127.0.0.1:8794 npm run test:cms
```

Database migrations can be tested without touching your working local database:

```sh
PAYLOAD_LOCAL_STATE=.wrangler/cms-migration-test NODE_ENV=production npm run cms:migrate:local
```

Normal development uses Payload's schema push. Production uses the versioned migrations. After a schema change, generate and review a migration with `npm run cms:migration:create -- descriptive-name`. Remote migration is disabled by default; superadmin setup documents the explicit opt-in.

## Deferred contact, donations, and accounts

Contact email and donation checkout remain unconfigured. Approved private contact runtime settings are `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`. Optional public build settings are `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_DONATION_URL`, and `NEXT_PUBLIC_SITE_URL`. Public values need a rebuild; CMS content changes do not.

`app/api/contact/route.ts` now delegates to the existing contact handler in `worker/index.ts`, preserving validation, same-origin checks, body limits, honeypot, rate limiting, and truthful delivery feedback. Contact messages are not stored in the CMS. The donor enters payment details on the configured provider's website, once approved. No message or payment was sent during testing.

CMS account email is separate and intentionally unavailable until configured. Its disabled adapter raises an error without logging email contents or reset tokens. Do not assume password-reset email works.

## Production handoff

**Do not deploy until A11 in [SUPERADMIN-SETUP.md](SUPERADMIN-SETUP.md) is complete.** The CMS requires a real D1 database, R2 bucket, runtime/build secret, migrated schema, and an administrator created before public exposure. `wrangler.jsonc` contains a clearly invalid production D1 placeholder and `npm run deploy` refuses it. External provisioning remains the superadmin's task; nothing was provisioned or deployed here.

Workers Builds settings must become `npm run build:cloudflare` for build and `npm run deploy` for deploy. Do not use the previous static deployment command. Use the existing correct Git-connected Cloudflare account; the locally authenticated account was previously found to be different. Never run a direct production deploy without checking the target.

The site defaults to the existing Workers canonical URL until an approved domain is supplied. The existing social image is generated by `scripts/generate-social-image.tsx` before each build from the brand tokens, local fonts, and supplied seal. It is served as a static asset at `/opengraph-image` and does not read local files in the Worker. Images and typography preserve the original site's design. Editable CMS replacements use the simpler section layout shown in their previews.

Unanswered facts remain in [NEEDS-YOUR-REVIEW.md](NEEDS-YOUR-REVIEW.md). The measurement specification is retained in [SEO/measurement/event-specification.md](SEO/measurement/event-specification.md); no tracking adapter is installed.

## Dependencies

Payload packages are pinned together at 3.91.0. Next was updated from 16.3.8 to 16.4.2 to meet OpenNext 1.20.12's supported peer range. No forced peer-dependency installation was used.

The npm audit reports transitive advisories in the current upstream dependency tree (including build tooling and Payload dependencies); see [CMS implementation notes](docs/cms-implementation.md). Do not apply npm's suggested incompatible major downgrades automatically. Reassess these advisories before public rollout.
