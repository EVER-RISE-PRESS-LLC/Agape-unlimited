# Research sources and evidence limits

Research and access date: 15 October 2026. Recommendations in this package combine the deployed site, the current repository brief, primary search documentation, and examples published by the organizations doing the work. An external organization is a research example, not an Agape partner or evidence of Agape's services.

## Evidence from this project

| Source | What it establishes | Limit |
| --- | --- | --- |
| [Deployed website](https://agape-unlimited.everrisepressdev.workers.dev/) | Current public wording and reachable visitor journeys | Website copy does not establish legal registration, active delivery, or an approved service area |
| [Raw production inspection](live-site-audit-2026-10-15.json) and [audit interpretation](02-live-site-audit.md) | HTTP responses, metadata, headings, links, image response, and contact availability at the recorded fetch time | A read-only fetch does not establish Google indexing, rankings, speed, analytics, or completed messages |
| [Repository README](../../README.md) and [design direction](../../docs/design-direction.md) | The current children-and-families brief takes precedence over the historical disability-focused brand guide | Neither document supplies the missing operational facts |
| [Shared review checklist](../../NEEDS-YOUR-REVIEW.md) and [AGENTS instructions](../../AGENTS.md) | User decisions, deferred connections, and unanswered facts to preserve across sessions | Unchecked items remain unknown; instructions do not supply an answer |
| Installed Next.js documentation in `node_modules/next/dist/docs/` | Local framework conventions for static export, metadata, sitemap, and robots files | The installed version must be consulted again when implementing; this request changes no application code |

The production inspection covers eight main pages, robots, sitemap, a deliberately missing URL, the social image, and the contact availability endpoint. It sends no contact message or payment. Review the raw record when a later release changes the site.

## Official search and measurement guidance

| ID | Primary source | Use in this plan |
| --- | --- | --- |
| S01 | [Google: people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | Intended audience, useful original contribution, trust, and no arbitrary word-count requirement |
| S02 | [Google: spam policies](https://developers.google.com/search/docs/essentials/spam-policies) | Avoid manipulative links, doorway location pages, and scaled content without reader value |
| S03 | [Google: generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | Apply normal discovery and content fundamentals to AI features; avoid selling special ranking shortcuts |
| S04 | [Google: documentation updates](https://developers.google.com/search/updates) | Verify time-sensitive changes, including retired FAQ rich results and the clarified status of `llms.txt` |
| S05 | [Google: generative AI reporting announcement](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports) | Include the newer impression views in the future Search Console audit without inventing AI-specific conversions |
| S06 | [Google: Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization) | Use truthful organization information and appropriate placement; do not invent required identity fields |
| S07 | [Google: build a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) | Canonical absolute URLs, useful modification dates, and discovery rather than indexing guarantees |
| S08 | [Google: using Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start) | Ownership, inspection, indexing, and performance as account-based evidence |
| S09 | [Google: site moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) | Corresponding permanent redirects, property checks, and migration verification if the public domain changes |
| S10 | [Google: title links](https://developers.google.com/search/docs/appearance/title-link) | Descriptive titles and display limits; character counts remain editorial aids |
| S11 | [Google: snippets](https://developers.google.com/search/docs/appearance/snippet) | Accurate descriptions; supplied wording does not guarantee the displayed snippet |
| S12 | [Google: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) | Measure actual experience before specifying performance fixes |
| S13 | [Google: Business Profile eligibility](https://support.google.com/business/answer/13762416) | Establish the real in-person operating model before local profile work |
| S14 | [Google: represent a business accurately](https://support.google.com/business/answer/3038177) | Real identity, location, service-area arrangements, and maintained contact information |
| S15 | [Google Analytics: avoid personally identifiable information](https://support.google.com/analytics/answer/6366371) | Keep private form details and sensitive information out of analytics |
| S16 | [Google Ads: Keyword Planner metrics](https://support.google.com/google-ads/answer/3022575) | Explain estimates, geography, close variants, and advertiser competition; it is not organic difficulty |
| S17 | [Google: Search Console performance data](https://support.google.com/webmasters/answer/12917174) | Interpret query reporting and incomplete query visibility without claiming every system will reconcile |
| S18 | [Google: robots specification](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec) | Comments, supported rules, scope, and sitemap declarations |
| S19 | [Google: AI-assisted website content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) | Source verification, accuracy, and human responsibility in the editorial workflow |
| S20 | [IndexNow: protocol documentation](https://www.indexnow.org/documentation) | A possible later notification process for participating engines; acceptance is not indexing |

### Guidance with material date sensitivity

Google's update log records the end of FAQ rich results from 7 May 2026 and the removal of their documentation on 15 June. Its June clarification also says `llms.txt` is unnecessary for Google Search and has no ranking effect by itself. Keep useful on-page answers, but do not allocate this site's initial budget to those supposed Google enhancements. [Google documentation updates](https://developers.google.com/search/updates).

The June 2026 generative AI reporting announcement records worldwide rollout by 31 August. The measurement plan therefore calls for checking the newer impression views rather than relying on older aggregate-only descriptions. The account itself has not been inspected. [Google reporting announcement](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports).

Recheck current documentation before implementation. A Google documentation statement describes Google's systems; it does not automatically establish another search engine's behavior.

## Name collisions and subject examples

| ID | Primary source | Why it was inspected | Boundary |
| --- | --- | --- | --- |
| E01 | [Agape Unlimited in Kitsap](https://www.agapekitsap.org/) | Closely matching name in search | A separate organization; its treatment services, location, people, and records do not apply to this foundation |
| E02 | [Agape Unlimited Inc.](https://www.agapeunlimited.org/) | Another closely matching name | Its medical-mission and faith descriptions do not establish this foundation's identity |
| E03 | [Rethaka Foundation: organizing a supply drive](https://www.rethakafoundation.org/how-to-organize-a-donation-drive-for-school-supplies) | Practical guide format in Q03 | Not an Agape collection arrangement or permission to reproduce the guide |
| E04 | [Texas Baptists: school supply drives](https://www.texasbaptists.org/article/how-to-organize-a-school-supplies-drive-for-your-church) | Practitioner process example in Q03 | Historical article; not current local need, pricing, or Agape affiliation |
| E05 | [Kids In Need Foundation: supply-drive checklist](https://www.kinf.org/wp-content/uploads/2016/04/KINF_SupplyDrives2016.pdf) | Checklist format in Q04 | The file path identifies an older asset; search indexing dates do not make it a 2026 campaign |
| E06 | [Kids In Need Foundation: host a supply drive](https://www.kinf.org/how-to-help/host-a-supply-drive) | Current planning page and linked toolkit entry point for B01 | An older search-discovered toolkit PDF returned 404; use the current page, and do not adopt its shipping arrangements for Agape |
| E07 | [Kids In Need Foundation: Supply A Student](https://www.kinf.org/programs/supply-a-student) | Clear participation and planning information | Do not copy its services, prices, quantities, or logistics into Agape copy |
| E08 | [United Way of Central Georgia: Backpacks for Brookdale](https://unitedwaycg.org/backpacks-brookdale) | A recipient-specific list in Q05 | Local campaign details do not become a universal approved supply list |
| E09 | [MENTOR: becoming a mentor](https://mentoring.org/take-action/become-a-mentor/) | Preparation, program choice, and volunteer intent | Does not establish that Agape runs a mentoring program or follows a particular standard |
| E10 | [MENTOR: screening resource](https://mentoring.org/resource/screening/) | Specialist background for B02 | Finished guidance needs an appropriate reviewer and actual jurisdictional context |
| E11 | [Big Brothers Big Sisters: getting involved](https://www.bbbs.org/get-involved/) | Audience routing and clear next steps | Its roles, commitments, enrollment, and results are not Agape facts |
| E12 | [Boys & Girls Clubs of America: finding a mentor](https://www.bgca.org/news-stories/2024/January/mentorship-matters-how-to-find-a-mentor-for-your-child/) | Family program-selection intent in Q08 | A US organization's guide; local applicability still needs verification |
| E13 | [SAFE Credit Union: supporting local nonprofits](https://blog.safecu.org/how-businesses-and-you-can-support-local-nonprofits) | Practitioner perspective and Q07 format | An older example for framing, not evidence of current Agape partners or offerings |
| E14 | [AVANCE San Antonio: volunteering](https://www.avancesa.org/support-us/volunteer/) | An example of operational role information | Do not transfer its local roles or requirements to Agape |
| E15 | [Family House: corporate volunteer application](https://familyhouseinc.org/corporate-volunteer-application/) | Practical information needed to evaluate group support | A form example, not a partnership or permission to submit anything |
| E16 | [W3C: accessible presentations and events](https://www.w3.org/WAI/teach-advocate/accessible-presentations/) | Authoritative accessibility planning background for B08 | A citation is not legal certification or proof that all Agape events meet every access need |
| E17 | [Explore Learning: mentor versus tutor](https://www.explorelearning.co.uk/free-resources/mentor-vs-tutor-whats-the-difference/) | Comparison format in the directly researched Q16 | Commercial education provider; use for search-format analysis, not unreviewed clinical or universal definitions |
| E18 | [211: official local-service locator](https://register.211.org/) | A possible US referral starting point if that market is confirmed | No US service geography, listing eligibility, or individual provider availability is assumed |

## Search research method

The [query notebook](03-search-landscape-and-serp-notes.md) records Q01-Q16 and representative patterns. Research used English web-search discovery, not a logged-in keyword subscription, controlled Google location/device test, exhaustive competitor export, or rank tracker.

The [110-keyword inventory](keywords.csv) separates nine directly researched phrases from hypotheses, geographic templates, and deliberate exclusions. The evidence label says what was checked; the note links it to a query family. None of the rows has measured monthly search volume or organic difficulty. There is no measured competitor traffic, link authority, or ranking forecast in this plan.

Search results establish observed formats and possible intent, not legal facts or a foundation's operating capability. A result missing from a discovery query is not proof of deindexing. A primary organization page establishes what that organization says about itself, not that Agape has adopted its practices.

## Refresh and replacement

Recheck the actual search results in the confirmed country and language before commissioning a guide. Recheck provider information when drafting and before publication. Review time-sensitive search features before implementing them. Record new source URLs and check dates in the article brief, preserve important corrections, and update the keyword evidence labels when stronger data arrives.

Keep the root review checklist as the single record of unresolved foundation facts. This register records research evidence and its limits, not a second list of questions for the user.

## Day 1 follow-up, 16 October 2026

- [New public inspection](live-site-audit-2026-10-16.json) and [Day 1 result record](../daily-tasks/results/day-01-results.md): rechecked the eight main pages and five related endpoints; no authenticated account data.
- [Google property types and setup](https://support.google.com/webmasters/answer/34592) and [ownership verification](https://support.google.com/webmasters/answer/9008080), checked 16 October: background for the user's manual steps in [SUPERADMIN-SETUP.md](../../SUPERADMIN-SETUP.md). The user performs external setup; no verification or submission was performed.

## Day 4 implementation, 16 October 2026

- [Technical preview evidence](day-04-technical-verification-2026-10-16.json), [mobile lab evidence](day-04-performance-2026-10-16.json), and [Day 4 results](../daily-tasks/results/day-04-results.md) record source implementation, local checks, and release limits.
- [Google breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) and the existing Organization/sitemap references support the structured-data and discovery requirements. Data uses actual visible information.
- [Cloudflare static headers](https://developers.cloudflare.com/workers/static-assets/headers/) was checked for the fingerprinted asset cache policy; actual local responses were verified.
- [Lighthouse performance scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) and [Web Vitals](https://web.dev/articles/vitals) provide the metric context. Local single-run scores do not establish real-user performance, indexing, or rankings.
