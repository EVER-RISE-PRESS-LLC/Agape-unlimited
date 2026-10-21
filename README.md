# Agape Unlimited Foundation

Next.js 16, React 19, TypeScript, and Cloudflare Workers. Pages are generated as static HTML and assets; a small Worker handles the contact endpoint. Content is managed in this repository.

On **22 October 2026**, the user explicitly chose to remove the CMS and keep hosting fully free. Payload, OpenNext, database storage, upload storage, administrator accounts, and CMS publishing routes are no longer part of the application. Preserve the existing desktop and mobile design when editing content.

## Local development

Use Node **24.18.0** (`.node-version`) and npm:

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:3000`. Next's development server shows the site; its contact status intentionally reports unavailable. Test the real Worker with the production preview below. No CMS setup or login is needed.

## Where to edit content

| Content | Source |
| --- | --- |
| Homepage | `app/page.tsx` |
| About, Programs, Values, Get Involved, Contact, Donate, Privacy | `app/<page>/page.tsx` |
| Ten program areas shared by the homepage and Programs | `components/programs.tsx` |
| Six core values | `lib/values.ts` |
| Header and footer | `components/header.tsx`, `components/footer.tsx` |
| Layout and visual styling | `app/layout.tsx`, `app/globals.css` |
| Brand description and public configuration | `lib/site.ts` |
| Page metadata and published sitemap entries | `lib/metadata.ts`, `lib/seo.ts`, `app/sitemap.ts` |
| Images | `public/images/`, `components/foundation-photo.tsx` |
| Contact form and delivery handler | `components/contact-form.tsx`, `worker/index.ts` |

Follow [the repository editing guide](docs/repository-editing-guide.md). Future articles remain planned under `SEO/`; no resource hub or article is currently published. Add actual reviewed content through repository changes when requested, rather than recreating an empty CMS or publishing placeholders.

The client confirmed **Georgia, United States** and a **community-driven** approach on 21 October. The working legal name and 501(c)(3) reference still need clarification. See [the client information record](docs/client-information-2026-10-21.md) and [the review checklist](NEEDS-YOUR-REVIEW.md).

## Build and verify

```sh
npm run build
npm run typecheck
npm run lint
npx wrangler deploy --dry-run
npm run test:e2e
```

`build` generates Worker binding types, the branded social image, and the static site in `out/`. The social image uses local fonts and brand tokens and is served at `/opengraph-image`. Do not edit generated files in `out/` or `.next/`.

`test:e2e` builds and starts a local Cloudflare preview on port 8789 unless `PLAYWRIGHT_BASE_URL` is supplied. It checks desktop/mobile accessibility, navigation, images, metadata, sitemap, form behavior, and contact endpoint protections. Email-provider responses are mocked; tests send no real messages or payments.

For a persistent local preview:

```sh
npm run build
npm run preview -- --port 8794
```

## Cloudflare deployment

- Repository: `EVER-RISE-PRESS-LLC/Agape-unlimited`; production branch: `main`.
- Worker: `agape-unlimited`; account: `4bb86ba631de88ebffab0709d3e09c19`.
- Production: <https://agape-unlimited.everrisepressdev.workers.dev>.
- Workers Builds build command: `npm run build`.
- Workers Builds deploy command: `npx wrangler deploy`.
- Static asset directory: `out/`; Worker entrypoint: `worker/index.ts`.
- Version preview URLs are disabled to retire the experimental CMS preview.

For an explicitly authorized manual release, use the correct account even if the shell has a different inherited account ID:

```sh
CLOUDFLARE_ACCOUNT_ID=4bb86ba631de88ebffab0709d3e09c19 npm run deploy
```

`deploy` builds before running the project-local Wrangler. The static application requires no D1, KV, R2, or CMS secrets. Do not enable billing or paid services. Cloudflare's free plan still has service limits; static asset requests are free, while contact Worker requests use the Workers Free allowance. See [Cloudflare static asset pricing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) and [Workers limits](https://developers.cloudflare.com/workers/platform/limits/).

## Deferred contact and donations

Contact delivery and donation checkout remain intentionally unconfigured. The public pages explain that setup is pending.

- Private Worker secrets for later contact delivery: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- Optional public build settings: `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_DONATION_URL`, `NEXT_PUBLIC_SITE_URL`.
- Public settings require a rebuild. The canonical URL remains the existing Workers origin until an approved domain is supplied.
- Copy `.dev.vars.example` only for local Worker tests; keep actual secrets in ignored files or Cloudflare secrets. Never commit them.

The Worker retains validation, same-origin checks, body limits, honeypot checks, rate limiting, and clear delivery feedback. Payment details will be handled by the approved external provider after its URL is configured.

Search Console, analytics, domain changes, and the remaining manual setup stay with the superadmin under [SUPERADMIN-SETUP.md](SUPERADMIN-SETUP.md). The [measurement specification](SEO/measurement/event-specification.md) remains a plan; tracking is not installed.
