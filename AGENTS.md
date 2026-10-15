<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

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
