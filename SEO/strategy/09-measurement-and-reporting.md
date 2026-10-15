# Search measurement and reporting

Measure whether people can find the correct foundation, use its resources, and complete a suitable next step. Page count, raw traffic, and impressions are useful diagnostics, but they are not substitutes for relevant readers or completed actions.

## Baseline status

The production site is reachable and the eight main pages return HTTP 200. Search Console ownership, indexed-page count, organic traffic, backlinks, current rankings, and analytics history have not been established in this task. Record these as unknown, not zero.

Contact delivery is unavailable and donation checkout is deferred. Until those connections work, report form interaction and giving-page visits only as interest signals. They are not delivered inquiries or donations.

## Measurement setup

1. Confirm the canonical public domain and account ownership.
2. Verify the appropriate Search Console property and submit the approved sitemap.
3. Record indexing and canonical evidence for the homepage, About, Programs, Get Involved, Contact, and Donate.
4. Choose an analytics approach and assess consent and privacy requirements for the foundation's jurisdiction.
5. Define and test events on a non-production or explicitly identified test path before relying on them.
6. Publish a baseline report after a complete period of reliable collection.

No measurement account, tracking script, or cookie behavior has been changed as part of this plan. [Google Search Console guidance](https://developers.google.com/search/docs/monitor-debug/search-console-start).

## Search Console dashboard

| View | Purpose | Segmentation |
| --- | --- | --- |
| Intended URLs and indexing status | Establish discovery and selected canonicals | Core pages, resources, program pages |
| Search impressions and clicks | Understand visibility and actual visits | Branded, nonbranded, ambiguous brand |
| Page/query pairs | Learn which task each page is being shown for | Topic cluster and intended page owner |
| CTR and average position | Diagnose title/intent fit and query mix | Same page, country, device, and comparable period |
| Country and device | Check whether the audience matches the mission | Confirmed market versus other markets |
| Generative AI visibility | Observe eligible appearance in AI features | Reported pages, countries, devices, dates |

Google announced dedicated generative AI performance views in June 2026 and states they were rolled out worldwide by 31 August 2026. Include the available impression views in the account audit; do not rely on older advice that all AI visibility is inseparable from the general report. Do not infer AI-specific clicks or donations from an impression-only view. [Google's report announcement](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports).

## Brand segmentation

Separate at least three groups:

- **Exact foundation intent:** queries containing the full foundation name or clearly referring to its approved identity.
- **Ambiguous shortened brand:** Agape Unlimited without enough context to identify this foundation.
- **Misdirected entity intent:** queries seeking treatment, medical missions, or another identified organization's location or staff.

Do not celebrate misdirected branded traffic as demand for Agape's actual programs. Review a small query sample manually each month before fixing the final matching rules. Brand variants and spelling differences can be added based on actual data.

## Proposed events

These are names and definitions for future implementation, not installed events.

| Event | Trigger | Allowed context | Counts as a primary outcome? |
| --- | --- | --- | --- |
| `resource_view` | A published resource page loads | Canonical path, topic cluster | No; readership |
| `resource_tool_use` | A user opens, prints, or downloads the specific tool | Canonical path, tool name, action | No; practical engagement |
| `program_detail_view` | A verified program detail page loads | Canonical path, program identifier | No; interest |
| `contact_form_start` | First meaningful interaction with an enabled form | Topic category, canonical path | No |
| `contact_submit_success` | The real endpoint accepts a valid message after the provider accepts delivery | Broad topic category, canonical source page | Yes, after verification and deduplication |
| `contact_submit_error` | A genuine delivery or validation error occurs | Error category without message text | No |
| `donation_checkout_click` | Visitor follows the approved donation link | Provider label, source page | No; checkout interest |
| `donation_confirmed` | Reliable approved-provider confirmation or reconciliation | Non-sensitive campaign context and deduplication ID | Yes, only after integration and consent/privacy review |
| `external_resource_click` | Visitor follows an official provider link from a resource guide | Provider category and source path | No; a referral signal, not confirmed help received |

Do not fire success events for a button click, opening an email app, a mocked test, a pending form, or an unconfirmed checkout return. A successful message means submission accepted for delivery, not that a staff member has read or resolved it.

## Privacy in analytics

Never send names, email addresses, phone numbers, full contact messages, payment details, sensitive service requests, or private records into analytics. Watch page URLs, event parameters, error logs, and form plugins for accidental collection. The topic categories already used by the site are sufficient for broad routing analysis.

Google Analytics prohibits sending personally identifiable information through ordinary measurement fields. Use the selected platform's policies and the foundation's jurisdictional requirements when implementing. [Google Analytics PII guidance](https://support.google.com/analytics/answer/6366371).

## Outcome definitions

### Qualified inquiry

A real, non-test, non-spam message relevant to the foundation's confirmed mission and service scope. If assessing qualification requires reading the message, keep that review in the foundation's responsible workflow rather than exporting personal text to analytics.

### Suitable volunteer interest

A relevant inquiry about an actual supported role. A visitor reading the volunteering guide is useful engagement but not an application. Completion of screening or acceptance into a role is a separate operational outcome.

### Partnership inquiry

A real organization or individual proposing support that fits current capacity. Do not count a resource download as a partnership.

### Giving outcome

A confirmed transaction from the approved provider, reconciled to avoid counting refreshes or returns twice. Checkout clicks and visits remain separate. The initial site cannot report this outcome while checkout is unconfigured.

## Targets for the first 90 days

Use controllable delivery targets first:

- Account ownership and an approved domain decision recorded.
- Intended public pages verified for crawlability and canonical consistency.
- A valid sitemap served and submitted.
- Core-page factual gaps assigned to an owner.
- Four complete reviewed resource guides developed, with later candidates chosen from evidence.
- Every published guide linked from a hub and a relevant existing page.
- No unsupported service, legal, impact, or availability claims.
- A first complete measurement baseline and a documented next-quarter decision.

These are proposed project targets. Indexing, impressions, clicks, rankings, and donations cannot be guaranteed by a delivery schedule.

After 28 reliable days, set realistic numerical search and conversion goals using the actual baseline, market, query mix, active programs, and operational capacity. Do not promise an arbitrary traffic percentage before those inputs exist.

## Weekly review

Check broken journeys, form/checkout readiness, new indexability errors, unusual query mix, and content corrections. Triage immediately if a page implies an unavailable service or a provider link becomes misleading. Review data once per week rather than rewriting titles in response to daily fluctuations.

## Monthly review

Use a consistent 28-day window and compare with the prior comparable period. Track seasonality and changes in market, domain, content, or measurement. New sites may have little useful year-over-year data.

For each cluster, report published URLs, impressions, clicks, useful resource actions, qualified inquiries where available, and one decision. Account for Search Console query anonymization and different collection methods when numbers do not reconcile exactly. [Google query-data guidance](https://support.google.com/webmasters/answer/12917174).

## Decision rules

| Observation | First investigation | Possible action |
| --- | --- | --- |
| Page not discovered | Internal links, sitemap, robots, status code | Fix discovery before rewriting content |
| Discovered but not indexed | Canonical, duplication, completeness, account evidence | Improve a specific gap; do not mass-submit repeatedly |
| Impressions for wrong intent | Query wording and page purpose | Clarify the page or retarget it |
| Relevant impressions, few clicks | Position, title, description, competing result format | Test a more accurate and useful search proposition |
| Useful visits, no next-step action | Task completion, CTA suitability, operational readiness | Repair the journey or offer a better next step |
| Clicks on donation link, no confirmed gifts | Provider data and attribution | Investigate checkout; do not call all clicks donations |
| Several pages answer the same task | Content overlap and page/query data | Differentiate or merge with redirects |
| Low traffic but useful qualified inquiries | Relevance and capacity | Retain a valuable page rather than chase broad traffic |

The [monthly report template](../templates/monthly-report.md) keeps findings, interpretations, and decisions separate so a client can understand what changed and what remains unknown.
