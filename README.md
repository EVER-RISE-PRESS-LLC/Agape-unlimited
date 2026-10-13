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
- `app/about`, `app/programs`, `app/values`, `app/get-involved`, `app/contact`, `app/donate`, and `app/privacy`: dedicated pages.
- `components/header.tsx` and `components/footer.tsx`: shared page navigation, active links, and mobile menu.
- `components/contact-form.tsx`: accessible contact form, topic preselection, validation, and delivery feedback.
- `worker/index.ts`: contact endpoint with Resend delivery, validation, body limits, spam honeypot, and rate limiting.
- `app/globals.css`: brand tokens, responsive layout, accessibility, motion.
- `lib/site.ts`: centralized public contact and donation configuration.
- `public/images/`: copies of supplied assets, used through Next.js Image.

Copy `.env.example` to `.env.local` and supply approved values when available:

```env
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_DONATION_URL=
NEXT_PUBLIC_SITE_URL=
```

Contact and donation configuration are intentionally deferred at the user's request. `AGENTS.md` instructs future AI assistants to prompt once per work session about configuring them. Leave the values empty until approved.

The Contact page includes name, email, optional organization, topic, message, and privacy acknowledgement. Links from volunteering, partnerships, programs, and donation pages preselect the relevant topic. The form checks `/api/contact` before allowing submission. Without email delivery credentials, it shows a setup-pending message. When a public email is supplied, it can prepare a message in the visitor's email app instead, clearly explaining that the visitor must send it there.

The Donate page links to the approved HTTPS checkout URL when configured. Amount selection and payments happen on the donation provider's website. Without a checkout URL, the page explains that online giving is being set up and links to donation inquiries. No card details are collected on this website. Rebuild after changing public environment variables.

## Contact email delivery (configure later)

The Cloudflare Worker uses Resend to deliver messages to a single foundation-approved inbox. Set these **private runtime secrets** when you are ready:

- `RESEND_API_KEY`: a Resend API key authorized to send emails.
- `CONTACT_TO_EMAIL`: the foundation's receiving email address.
- `CONTACT_FROM_EMAIL`: a sending email address on a domain verified in Resend.

Keep these values out of chat, source files, and public `NEXT_PUBLIC_*` variables. Use Cloudflare's secret settings or Wrangler's interactive secret commands when authorized. Changing deployed secrets can deploy a new Worker version.

For local integration testing, copy `.dev.vars.example` to the gitignored `.dev.vars` file, supply values privately, and run:

```sh
npm run build
npm run preview
```

The production preview serves both static pages and the contact Worker. `npm run dev` previews the Next.js UI with message delivery reported as unavailable; it does not run the email Worker. Contact success is shown only after the email provider accepts the submission. Validation and spam checks run before sending, and provider errors leave the visitor's message intact. The Worker does not store message content in a database or log it intentionally.

The rate limiter allows five requests per minute per connecting IP, per Cloudflare location. Its namespace is `2026101401`; keep it distinct from unrelated rate limiters in the same account. The generated binding types are refreshed automatically before builds and typechecks.

Use the [Cloudflare secrets documentation](https://developers.cloudflare.com/workers/configuration/secrets/) and [Resend sending API documentation](https://resend.com/docs/api-reference/emails/send-email) for setup.

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

`npm run test:e2e` builds and starts a Cloudflare production preview on port 8789 by default, so tests exercise the deployed static routing and contact Worker rather than the Next.js development server. Set `PLAYWRIGHT_BASE_URL` to test an existing preview.

Browser tests cover all dedicated pages at desktop and mobile widths, navigation, page-specific metadata, the ten program entries, filtering and expansion, images, browser errors, mobile menus, focus restoration, reduced motion, overflow, and automated WCAG A/AA checks via axe. Contact tests cover validation, preselected topics, unavailable delivery, connection retries, provider failures, success feedback, request origin, privacy acknowledgement, spam checks, rate limiting, and body limits. Email delivery tests use mocked provider responses; they do not send real messages. Screenshots are written to `test-results/`. Automated accessibility checks do not replace assistive-technology and real-device review.

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

Keep the Cloudflare application name and the `name` in `wrangler.jsonc` aligned. The pages remain a static Next.js export. The contact form adds a small Cloudflare Worker for `/api/contact`, using an asset binding for all other routes. `assets.run_worker_first` routes `/api/*` to that Worker; no Next.js server or database is required. Contact delivery requires the three private runtime secrets listed above.

See the [Cloudflare Static Assets guide](https://developers.cloudflare.com/workers/static-assets/get-started/) and [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) for deployment and repository integration details.
