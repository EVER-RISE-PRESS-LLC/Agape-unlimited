<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Deferred contact and donation configuration

These instructions apply to every AI assistant working in this repository.

The user has explicitly chosen to configure contact-form email delivery and the
donation checkout later. Record their status in `NEEDS-YOUR-REVIEW.md` and include
them in the start-of-conversation checklist reminder described below. Until the
user supplies approved configuration, continue the requested work and keep the
connections unconfigured.

- Contact delivery requires a foundation-approved receiving email address,
  a verified sending email address, and a private Resend API key. The optional
  public contact email is configured separately.
- Online donations require the foundation's approved HTTPS donation checkout URL.
- Never invent addresses, payment links, credentials, successful deliveries,
  completed donations, or tax-deductibility claims.
- Keep credentials out of source control and chat. Use local ignored secret files
  or Cloudflare secrets for the contact delivery credentials.
- Until configured, show clear setup-pending messaging on the contact and donation
  pages. Before a launch or deployment, call out any connections still pending.

## Unresolved facts and start of conversation reminders

The user wants unanswered questions written down for later review instead of
being asked individually during work.

- Read `NEEDS-YOUR-REVIEW.md` at the start of every new conversation or work
  session, including when this chat resumes on a new day.
- Before beginning the requested work, briefly prompt the user to review the
  outstanding checklist and link to the document. Mention the most relevant
  pending items, including contact delivery and donation checkout when relevant.
- Keep this reminder concise and continue useful authorized work with explicit
  assumptions. Do not wait for checklist answers unless the next action truly
  requires them. Avoid repeating the reminder within the same active session.
- Whenever a material fact, preference, access requirement, or approval is
  unknown, add it to the checklist with its purpose, affected work, and current
  assumption. Do not repeatedly ask the same question in chat or input tools.
- Preserve stable item IDs. Record the user's answer and date when resolved;
  never mark an item complete based on an inference or silence.
- The checklist records questions and configuration status, never passwords,
  API keys, private application data, or other secret values. Refer to the
  appropriate private configuration mechanism instead.
- Explicit user instructions and answers in the current conversation take
  precedence over an older checklist entry. Reconcile the document accordingly.

## Client facts received on 21 October 2026

- The service area is **Georgia, United States** (R01). Use this in copy and SEO
  planning without inventing cities, counties, an office address, or nationwide
  coverage.
- The client describes the work as community-driven. “Assist with everything”
  is broad mission direction, not evidence of ten active programs, unlimited
  aid, eligibility, or an application process. Those details remain under R02
  and R10.
- **Agape Unlimited Foundation, Inc.** is the supplied working legal name; the
  “for now” wording leaves exact registered identity open under R04. Retain the
  established public brand until clarified.
- The message references “501c3”; whether recognition is approved or pending
  remains open under R09. Do not turn this ambiguous reference into a public
  tax-exempt or tax-deductibility claim.
- See `docs/client-information-2026-10-21.md` for the source wording and scope.

## Superadmin owns external setup

On 16 October 2026, the user explicitly reserved Search Console and other
external administrative setup for themselves as superadmin.

- Do not open account setup or sign-in flows, create or claim properties,
  install verification tags/files, submit sitemaps, change DNS or domains,
  configure analytics or integrations, or grant account access on the user's
  behalf as part of a general SEO task.
- Document the required manual steps, prerequisites, current status, and
  verification evidence in `SUPERADMIN-SETUP.md`. Keep unanswered foundation
  facts in `NEEDS-YOUR-REVIEW.md` and reference their stable IDs.
- Public read-only website checks and authorized repository work may continue.
  A request to complete an SEO day does not by itself authorize external
  account setup. Follow a later explicit instruction for a specific setup
  action if the user changes this arrangement.
- Report baseline work and the admin handoff separately from actual account
  verification, tracking installation, and service configuration. Keep pending
  integrations and unknown search metrics explicit.

## Repository-managed content and design preservation

On 22 October 2026, the user explicitly chose: **“Drop the CMS and keep the
website managed through the repository.”** This supersedes the earlier Payload
and editable-section requirements.

- Edit content directly in `app/`, shared components, and `lib/`. Follow
  `docs/repository-editing-guide.md`. Do not reinstall Payload, another CMS, or
  a custom editor without a new explicit request.
- Preserve the existing desktop and mobile design: layout, typography, colors,
  spacing, imagery, responsive behavior, and interactions. Compare affected
  pages at both widths when changing templates or hosting architecture.
- The site uses Next.js static export (`out/`) and a small Cloudflare contact
  Worker. OpenNext, CMS routes, database migrations, and CMS storage are retired.
- Keep the SEO plans and approved client facts. Resource articles remain future
  work; do not expose empty indexes, draft content, or invented author details.
- The user explicitly authorized pushing to main and deploying the site with
  Wrangler on 22 October. That authorization does not include unrelated Search
  Console, analytics, DNS, contact delivery, or donation configuration.
- Use the Agape Cloudflare account `4bb86ba631de88ebffab0709d3e09c19` and Worker
  `agape-unlimited`. Check for an inherited conflicting account environment
  variable before remote commands. Record release evidence in the repository.

## Free hosting requirement

On 22 October 2026 the user required fully free hosting and rejected R2 activation.

- Do not enable R2, billing, paid plans, subscriptions, or billable overages.
- The current site requires only static assets and the existing contact Worker.
  Do not provision a CMS database, upload bucket, KV namespace, or admin account.
- Cloudflare free quotas still apply. Document limits honestly; if future work
  exceeds them, propose a free alternative before requesting a paid service.
- Keep all private contact credentials in ignored files or Cloudflare secrets.
  There are no CMS credentials to maintain or hand off.
