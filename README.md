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
npm start
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

## Publishing

The project is ready for a Next.js hosting environment after approved contact and donation details are added. Use the platform's Next.js preset, `npm run build`, and the public environment variables above. This task does not publish the site or provision a donation processor.
