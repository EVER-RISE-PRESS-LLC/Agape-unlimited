# Agape Unlimited Foundation

A responsive Next.js 16 website for Agape Unlimited Foundation, built with the App Router, TypeScript, React 19, and custom CSS.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npm run build
npm run preview
```

## Content and configuration

The client's supplied mission, vision, purpose, ten program areas, six values, and promise appear on the homepage. The current brief takes precedence over the older mission in the supplied brand document. Program descriptions elaborate on possible initiatives without claiming they are currently available.

- `app/page.tsx`: homepage copy and sections.
- `components/programs.tsx`: filterable, expandable program index.
- `components/header.tsx`: responsive navigation, Escape/outside dismissal, focus return.
- `app/globals.css`: brand tokens, responsive layout, accessibility, motion.
- `lib/site.ts`: centralized public contact and donation configuration.
- `public/images/`: copies of supplied assets, used through Next.js Image.

Copy `.env.example` to `.env.local` and supply approved values when available:

```env
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_DONATION_URL=
NEXT_PUBLIC_SITE_URL=
```

The contact action becomes a mailto link when a valid email is provided. Giving becomes an external link when an HTTPS donation URL is provided. With no values, explicit coming-soon copy appears. No personal information is collected, no message delivery is simulated, and no payment processing is claimed. Rebuild after changing public environment variables.

The supplied logo remains intact against white. Two supplied founder photographs are used without identifying a name, location, or event. Confirm photograph publication permission before public launch. No stock images, fabricated impact counts, testimonials, partner logos, service eligibility, or tax claims are included. Google fonts are self-hosted by Next.js; the build needs network access to fetch them.

## Automatic social images

`app/opengraph-image.tsx` generates a 1200 × 630 PNG on every production build using Next.js `ImageResponse`. It reads the navy, ivory, gold, and muted colors from `app/globals.css`, embeds the supplied seal, and uses local Montserrat and Source Sans 3 fonts with their licenses in `assets/fonts/`.

Edit `lib/social.ts` to change the headline, supporting text, or image alt text. Rebuild to regenerate the image; no separate generation command or image service is required. The generator runs at build time, so the deployed website remains compatible with Cloudflare Workers Static Assets.

The image is available at `/opengraph-image`. Next.js inserts the Open Graph image tags, and the layout configures a large Twitter/X card using the same image. `public/_headers` ensures Cloudflare serves the exported image with the `image/png` content type.

`NEXT_PUBLIC_SITE_URL` overrides the canonical URL and absolute social image URLs. When unset, metadata uses the deployed `https://agape-unlimited.everrisepressdev.workers.dev` address.

## Validation

```sh
npm run lint
npm run typecheck
npx playwright install chromium
npm run test:e2e
npm audit --omit=dev
```

Browser tests cover the ten program entries, filtering and expansion, image loading, browser errors, mobile navigation, focus restoration, reduced motion, horizontal overflow, and automated WCAG A/AA checks via axe. Screenshots are written to `test-results/`. Automated accessibility checks do not replace assistive-technology and real-device review.

The full development audit currently reports a braces stack-exhaustion advisory through Next's ESLint plugin. The installed braces 3.0.3 is the latest published version at build time; the suggested forced downgrade of Next's ESLint config is not applied. Production dependencies have a clean audit.

## Design and motion

See `docs/design-direction.md` and `docs/animation-review.md` for the design reasoning and final motion review. The design uses Montserrat and Source Sans 3 with the supplied navy, gold, ivory, and soft-blue palette. Motion is limited to one introductory stagger, press feedback, and the anchored mobile menu. Reduced motion, reduced transparency, high contrast, keyboard focus, and print styles are included.

## Cloudflare hosting

This website uses Next.js static export (`output: "export"`) and Cloudflare Workers Static Assets. `npm run build` creates the deployable files in `out/`; `wrangler.jsonc` defines the Worker, asset directory, and custom 404 handling. Wrangler uses your authenticated account; Workers Builds uses the connected Cloudflare account. Images are served directly from the export without a Next.js image server.

```sh
npm run build
npm run deploy -- --dry-run
npm run deploy
```

To preview the production export locally:

```sh
npm run preview
```

Wrangler serves the preview at http://localhost:8787. Run the existing browser checks against that preview or a deployed URL:

```sh
PLAYWRIGHT_BASE_URL=http://localhost:8787 npm run test:e2e
```

Cloudflare Workers Builds connects to `EVER-RISE-PRESS-LLC/Agape-unlimited` and deploys production from `main`. Use these build settings:

- Root directory: repository root.
- Build command: `npm run build`.
- Deploy command: `npm run deploy`.
- Public environment variables: `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_DONATION_URL`, and `NEXT_PUBLIC_SITE_URL` as needed. These are build variables; changing them requires a new build.

Keep the Cloudflare application name and the `name` in `wrangler.jsonc` aligned. The current website needs no server, database, or runtime secrets. Adding server actions, API handlers, or other server-dependent features would require changing the hosting setup.

See the [Cloudflare Static Assets guide](https://developers.cloudflare.com/workers/static-assets/get-started/) and [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) for deployment and repository integration details.
