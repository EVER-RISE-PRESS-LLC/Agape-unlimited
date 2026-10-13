<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Deferred contact and donation configuration

These instructions apply to every AI assistant working in this repository.

The user has explicitly chosen to configure contact-form email delivery and the
donation checkout later. At the start of each new AI work session, remind the
user that these connections are pending and prompt them to decide whether to
configure them now. If they defer or do not answer, continue the requested work
and keep the connections unconfigured. Ask once per session, not repeatedly.

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
