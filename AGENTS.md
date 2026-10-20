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

## Payload CMS and native editing

On 20 October 2026, the user chose Payload CMS, explicitly excluded Sanity, and
requested native editable sections without building a custom Elementor clone.

- Pages and posts belong in Payload, not a parallel TypeScript content registry.
- Use Payload's built-in Blocks, rich text, drafts, versions, and preview controls.
  Do not build a bespoke drag-and-drop editor or visual editing canvas.
- On 20 October 2026, the user explicitly required existing pages to remain
  visually unchanged when made editable in Payload. This supersedes the earlier
  plan to publish simpler CMS section layouts as replacements.
- Next work session (planned for 21 October 2026): connect Payload fields to the
  existing designed page components. Preserve their layout, typography, colors,
  spacing, images, responsive behavior, and interactions while making their
  content editable. Use native Payload editing controls, without building a
  custom visual editor. Compare desktop and mobile output with the existing
  designs before considering this migration complete.
- The simpler seeded page drafts are interim content sources, not approved
  visual replacements. Do not publish them over the existing pages. The user
  deferred this implementation until the next work session; recording this
  instruction does not mean the design-preserving integration is complete.
- Keep public CMS reads access-controlled and published-only. Private previews
  require an authenticated user and must remain noindex and uncacheable.
- The project now uses OpenNext on Cloudflare with D1 and R2. Static export
  scripts and the former `out/` directory are obsolete.
- Production provisioning and first administrator bootstrap are pending in
  SUPERADMIN-SETUP.md A11. Do not deploy placeholders or auto-provision services.
- Never run the disposable CMS integration test against an installation that
  has a real user. It is guarded for a fresh loopback installation.
