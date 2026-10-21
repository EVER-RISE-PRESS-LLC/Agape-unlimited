# Editing the website through the repository

Updated 22 October 2026. The user chose repository-managed content and removed the CMS. There is no admin login, database, media upload service, or page builder to maintain.

## Change an existing page

1. Read `AGENTS.md` and `NEEDS-YOUR-REVIEW.md`. Use confirmed facts only. Georgia, United States is the service area; individual active programs, eligibility, registration status, and exact legal identity still need clarification.
2. Edit the text in `app/page.tsx` or the relevant `app/<page>/page.tsx`. Keep the existing elements, class names, section order, image proportions, and responsive rules unless a design change is explicitly requested.
3. Shared program copy lives in `components/programs.tsx`; values live in `lib/values.ts`. Make a shared edit once so the homepage and detail page stay consistent.
4. Update the page's `metadata` title/description when the content changes its meaning. `lib/site.ts` contains the shared organization description; `lib/seo.ts` contains the eight published paths and organization schema.
5. Use `npm run dev` for quick preview. Compare the changed pages at desktop and mobile widths, including menus, links, text wrapping, and keyboard interaction.
6. Run `npm run build`, `npm run typecheck`, `npm run lint`, and `npm run test:e2e`. For a release, run `npx wrangler deploy --dry-run` as well.
7. Review the diff, commit the source, and push approved changes to `main`. Cloudflare Builds runs `npm run build` and `npx wrangler deploy`. Verify the build result and the live page before reporting a release as complete.

Do not edit `out/`, `.next/`, or the generated social-image asset. They are rebuilt from source. Git commits are the content history; a reviewed revert can restore an earlier version.

## Images and design

Place approved public images in `public/images/`. `components/foundation-photo.tsx` defines the existing responsive image variants. Preserve their filenames, crops, alt text, sizes, and loading behavior unless an image change is requested. Keep photo permissions under R13. Shared style rules are in `app/globals.css`; no CSS change is required for routine text edits.

## Future articles

The keyword research, briefs, editorial calendar, and publishing checklist remain in `SEO/`. No guide or Resources hub is currently published. The former CMS article routes were removed on 22 October.

When a genuine reviewed article is requested, implement its page in the repository using the existing visual language. Include an accurate title, description, canonical URL, heading, actual author/reviewer information, sources, and useful internal links. Add its path to `lib/seo.ts` only when it is ready to publish. Build an article index only once there is real approved content to list. Do not restore a CMS or a custom editor without a new user request.

## Configuration kept for later

Contact email delivery and donation checkout remain deferred under R05-R07. Never substitute made-up addresses or payment links. Keep the visible setup-pending messages until the superadmin supplies the approved configuration. Search Console and analytics setup are separate manual tasks; the SEO documents do not authorize installing them.
