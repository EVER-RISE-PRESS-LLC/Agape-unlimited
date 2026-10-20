# Day 5: Build the resource system and measurement

**Main task:** prepare the reusable publishing foundation and measurement handoff for the four guides. **Planning effort:** 4-7 hours. External account and tracking setup belong to the superadmin under [the setup handoff](../../SUPERADMIN-SETUP.md).

## Read first

- [Content strategy](../strategy/06-content-strategy.md), [technical architecture](../strategy/07-technical-seo-roadmap.md), and [measurement definitions](../strategy/09-measurement-and-reporting.md).
- [Publishing checklist](../templates/publishing-checklist.md) and installed Next.js and Payload documentation.

## Checklist

- [x] Build a reusable article template with heading, summary, actual author information, dates, sources, editable sections, related posts, and a publication approval check.
- [x] Build the Resources hub and a Payload CMS content model that serves only published articles.
- [x] Keep an empty hub or preview article out of public navigation and sitemap until a real guide is ready.
- [x] Support usable HTML worksheets, responsive article content, print styles, and keyboard access.
- [x] Ensure article metadata, canonicals, and appropriate visible-content schema come from the same source record.
- [x] Document the analytics ownership and data/consent requirements under A06 without opening accounts or sign-in flows.
- [x] Save the event specification and manual setup dependencies for the superadmin; do not install tracking as part of this general daily task.
- [x] Check resource/tool engagement events and exclude private form text, names, emails, and payment information.
- [x] Keep contact and donation completion events unavailable while their real connections remain deferred.
- [x] Test draft isolation, authenticated preview, publishing/unpublishing, uploads, roles, and revisions with temporary local records.

## Output and finish conditions

Save a working resource template, hub, draft/published rules, and a complete measurement specification for the superadmin. Public readers should only see real complete resources. Record measurement as specified and admin setup pending until the user actually completes it.

## If measurement access or review is missing

Finish the content system and event specification without installing unapproved tracking. Record R16/R23 dependencies. The guides can be written and checked while tracking remains pending.

## Prompt for this day

> Complete Day 5 of the ten-day SEO plan. Use Payload CMS to build the reusable publishing system, article presentation, published-only hub, and accessible HTML/print tools. Finish the measurement specification and manual setup handoff for the superadmin; do not open accounts or install tracking. Follow installed Next.js docs, exclude drafts and private data, preserve deferred giving/contact, and update Day 5's progress.

## Execution record

Completed in source and local checks on 20 October 2026. See [results and limits](results/day-05-results.md), [publishing instructions](../../docs/cms-editor-guide.md), and [the event specification](../measurement/event-specification.md). No guide, analytics integration, account setup, push, or production release is implied by these completed implementation checkboxes.

On 20 October the user replaced the code-only approach with Payload CMS and native section editing. The route generator and fixture-only preview were removed. The current CMS results supersede earlier static-export test counts. Existing page replacements remain drafts pending visual review; external rollout is A11.
