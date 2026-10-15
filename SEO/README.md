# Agape Unlimited Foundation SEO and content plan

Prepared 15 October 2026; execution schedule updated 16 October 2026. The current schedule is [ten daily tasks](daily-tasks/README.md), with one main task per day. Record actual start and completion dates as you work. The original 90-day roadmap remains a reference for longer-term measurement and maintenance.

Help people find the right Agape first. Then publish a few useful guides with tools people can use. Add local service pages once the foundation confirms where it works and which programs are active. The goal is to reach the right people and give them a clear next step.

## Start with these decisions

Start execution from [Day 1 in the ten-day plan](daily-tasks/day-01-foundation-and-baseline.md). Each day has its own checklist, output, finish conditions, fallback, and reusable AI prompt. Use the progress tracker in the plan to record actual completion.

Day 1's [baseline and results](daily-tasks/results/day-01-results.md) were completed on 16 October 2026. Search Console and other external setup are reserved for the user in the [superadmin handoff](../SUPERADMIN-SETUP.md); they were not configured by the baseline task.

At the user's request, [Day 4 technical implementation](daily-tasks/results/day-04-results.md) was completed out of order on 16 October. The production build and all 17 local tests passed. The changes were pushed and deployed through the existing Cloudflare integration; 23 public release checks and all four live SEO tests passed. See the [release evidence](daily-tasks/results/release-2026-10-16.json). Days 2 and 3 retain their recorded status.

1. Review the unresolved facts in [NEEDS-YOUR-REVIEW.md](../NEEDS-YOUR-REVIEW.md), especially the service area, active programs, and organizational identity. The [facts intake template](templates/foundation-facts-and-intake.md) supports that shared checklist.
2. Decide whether the current Workers address is the permanent public domain. A custom domain is a trust and ownership recommendation, not a requirement for Google indexing.
3. Establish search measurement and fix discovery gaps, especially the missing sitemap.
4. Improve the existing pages before opening ten separate program pages.
5. Develop the first four resource briefs with original tools and a named reviewer.

Contact email delivery and donation checkout remain deferred by the user. This plan does not enable them. Branded contact and donation pages can explain their pending status, but recruitment and fundraising campaigns must wait for a functioning destination.

## Initial keyword shortlist

These are priority hypotheses, not measured traffic forecasts. Search volume, organic keyword difficulty, current rankings, and conversion baselines have not been supplied by a keyword platform or Search Console. Search-result observations are dated, English-language discovery checks, not a location-controlled Google rank report.

| First target | Destination | Why it is on the shortlist | Publication condition |
| --- | --- | --- | --- |
| Agape Unlimited Foundation | `/` | Establish the full identity against similarly named organizations | Existing mission can be used now |
| Agape Unlimited Foundation mission | `/about` | Answer navigational trust questions clearly | Confirm any added founder and governance facts |
| Agape Unlimited Foundation programs | `/programs` | Explain the actual program scope | Keep planned work distinct from active services |
| Agape Unlimited Foundation volunteer | `/get-involved` | Capture people already looking for this foundation | Do not imply open roles while intake is unavailable |
| how to organize a school supply drive | `/resources/organize-school-supply-drive` | A concrete task that can support an original planning tool | Reviewed guide; no implied Agape collection service |
| school supply drive checklist | Same guide, checklist section initially | A practical asset can make the page useful beyond generic advice | Keep as a section until separate-page demand is supported |
| questions to ask before volunteering with children | `/resources/questions-before-volunteering-with-children` | Specific preparation need aligned with community support | Safeguarding review; avoid legal or screening guarantees |
| ways to support families in your community without donating money | `/resources/support-families-without-donating-money` | Useful while online giving is pending | Examples must respect consent and local provider rules |
| how small businesses can support local nonprofits | `/resources/small-business-nonprofit-partnerships` | Reaches potential partners with an actionable planning need | Add an original planning worksheet and reviewed examples |
| mentor vs tutor | `/resources/mentor-vs-tutor` | Helps families distinguish two kinds of support | Qualified review and clear boundaries on advice |
| youth mentoring volunteer opportunities in `[City]` | `/get-involved/volunteer`, if justified | Potentially valuable local recruitment intent | Geography, active role, screening process, working intake |
| family support resources in `[City]` | `/resources/family-support-in-[city]`, if justified | Potentially useful local navigation intent | Service market and every listed provider verified |

`[City]` is a research variable. It is never literal website copy. The geography question is open; no city, country, faith identity, registration, eligibility, or active program has been inferred from another organization's name.

## Reading order

| Need | File |
| --- | --- |
| Business priorities and publishing gates | [Positioning and priorities](strategy/01-positioning-and-priorities.md) |
| Current production findings | [Day 1 baseline](daily-tasks/results/day-01-results.md) and [16 October raw evidence](research/live-site-audit-2026-10-16.json); [15 October audit](research/02-live-site-audit.md) retained for comparison |
| Competitor and query observations | [Search landscape](research/03-search-landscape-and-serp-notes.md) |
| Keyword choices and validation process | [Keyword targeting](strategy/04-keyword-targeting.md) and [keyword inventory](research/keywords.csv) |
| Existing page improvements and future URLs | [Page map](strategy/05-page-map-and-on-page-plan.md) and [proposed metadata](research/page-metadata.csv) |
| Editorial themes and original assets | [Content strategy](strategy/06-content-strategy.md) |
| Indexing, metadata, schema, performance, and domain work | [Technical roadmap](strategy/07-technical-seo-roadmap.md) |
| Local visibility, partnerships, and links | [Local SEO and authority](strategy/08-local-seo-and-authority.md) |
| Measurement, attribution, and reporting | [Measurement plan](strategy/09-measurement-and-reporting.md) |
| Current daily execution and progress | [Ten-day action plan](daily-tasks/README.md) and [backlog with assigned days](strategy/implementation-backlog.csv) |
| Earlier schedule and longer-term reference | [Original 90-day roadmap](strategy/10-90-day-roadmap.md) and [superseded 12-week calendar](content/12-week-editorial-calendar.csv) |
| Assign an article or landing page | [Twelve content briefs](content/content-briefs.md) |
| Decide how each of the ten program areas could expand | [Program expansion map](content/program-expansion-map.md) |
| Check unanswered questions and deferred configuration | [Shared review checklist](../NEEDS-YOUR-REVIEW.md) |
| Complete external setup manually as superadmin | [Setup handoff](../SUPERADMIN-SETUP.md) |
| Reusable operating documents | [Brief template](templates/content-brief.md), [publishing checklist](templates/publishing-checklist.md), and [monthly report](templates/monthly-report.md) |
| Evidence behind recommendations | [Source register](research/sources.md) |
| Document and editorial checks | [Plan quality review](research/plan-quality-review.md) |

## How to use the keyword inventory

Filter `priority` first, then `readiness`, then `target_url`. Several queries deliberately share a destination. Do not create one page per row. `SERP-observed` means the listed query was researched. Variants derived from a researched parent have a separate hypothesis label. Empty metric cells mean unknown, never zero.

The three execution groups are:

- **Improve now:** factual brand pages and technical discovery work.
- **Develop next:** educational resources with an original asset and review.
- **Hold until verified:** local services, open volunteer roles, directory listings, case studies, and donation acquisition.

## Scope and handoff

This directory contains strategy, daily instructions, and dated execution records. A task file does not prove its implementation is complete; use the tracker and evidence. Day 1 completed the public audit and manual setup handoff. Day 4 made website source changes, checked their local production output, and was subsequently pushed, deployed, and verified under the user's explicit release request. Account settings, contact credentials, and checkout configuration remain deferred. These documents are outside `public/` and `app/`; creating the directory does not publish its contents on the website.

The strategy uses the current children-and-families mission from the live site and repository README. The earlier disability-focused brand document is historical input and does not establish current medical, transportation, vehicle, or housing services.

Review execution at the end of each daily task and on Day 10. Review search performance after the first 28 days of reliable data and at the later quarter review. Research and source dates are recorded so future updates can replace findings rather than silently treat them as permanent facts.
