# Day 4: Fix technical search discovery

**Main task:** make published pages discoverable and technically consistent. **Planning effort:** 5-8 hours.

**Completed 16 October 2026:** implemented and checked in the local production-export preview. See [Day 4 results and release evidence](results/day-04-results.md). Deployment and superadmin setup remain separate; Days 2 and 3 were not marked complete.

## Read first

- [Technical roadmap](../strategy/07-technical-seo-roadmap.md) and Day 1's domain decision.
- Installed Next.js sitemap, robots, metadata, and static-export guides before implementation.

## Checklist

- [x] Use the approved current public origin consistently; if no replacement domain is approved, prepare fixes for the existing origin.
- [x] Add a sitemap containing only actual published canonical URLs.
- [x] Add an explicit source robots response with the correct sitemap location and intended crawler access.
- [x] Add truthful Organization/WebSite identity. Use visible breadcrumbs where appropriate and avoid unknown identity fields.
- [x] Verify canonical URLs, status codes, social metadata, and the existing real 404 response.
- [x] Measure representative mobile pages and record lab evidence and field-data availability. Fix measured, material issues where practical.
- [x] Check that source documents, planning notes, drafts, and secrets do not enter the public export.
- [x] Run the production build and relevant technical checks; record any implementation issue rather than working around it in generated output.
- [x] Prepare the release evidence and sitemap-submission steps for Day 10.

## Output and finish conditions

Save source changes and local output evidence for sitemap, robots, schema, canonicals, 404, and measured performance. Production checks occur after the actual release; do not describe a local response as a live fix.

This day is complete when the technical changes work in the production build, or partial when a required domain/account decision prevents implementation. A domain move requiring substantial separate work receives a named follow-up rather than a rushed migration.

## If hosting access or a domain decision is missing

Implement and validate what is safe for the existing origin, or prepare the concrete source changes locally. Record the remaining deployment/domain step and its owner. No need to wait to start the resource system.

## Prompt for this day

> Complete Day 4 of the ten-day SEO plan. Implement the approved sitemap, robots, truthful identity schema, canonical checks, and appropriate performance fixes using installed Next.js documentation. Preserve the real 404 and deferred contact/donation states. Validate the production build, distinguish local evidence from live evidence, and update Day 4's record.
