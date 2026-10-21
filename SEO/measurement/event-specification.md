# Measurement implementation handoff

> Updated scope, 22 October 2026: the CMS and article routes were removed at the user’s request. Resource and worksheet events below are specifications for future repository-managed articles, not currently implemented features or collected data.

Prepared 20 October 2026, Asia/Dhaka. Owner: the user as superadmin. **Status: specification complete; provider selection, privacy review, installation, collection, and provider-level QA pending.** This document is not an analytics installation or evidence of recorded visitor activity.

Dependencies: [A06 in the superadmin handoff](../../SUPERADMIN-SETUP.md), R03/R16/R23 in [the shared checklist](../../NEEDS-YOUR-REVIEW.md), and real delivery/checkout configuration under R05/R07. The article system works without analytics. Resource fixtures must never be counted as public visits.

## Decisions required before installation

| Decision | Owner | Current state |
| --- | --- | --- |
| Canonical domain and account ownership | Superadmin, with foundation approval | Existing Workers address retained; permanent choice and account roles unknown |
| Measurement provider and property | Superadmin | No platform selected or installed by this task |
| Jurisdiction, data practices, notices, and any consent requirements | Foundation's responsible reviewer, R23 | Pending; no legal conclusion or consent model assumed |
| Allowed collection, retention period, access, deletion, and reporting | Superadmin and privacy owner | Pending explicit decisions |
| Eligible production host, excluded previews, test activity, and bot filtering | Superadmin | Production host is the existing canonical origin; previews and fixtures excluded |
| Contact and giving outcome evidence | Foundation owner and superadmin | Both real connections intentionally deferred |

Use the [existing reporting plan](../strategy/09-measurement-and-reporting.md) for query groups and later reporting. Unknown search impressions, traffic, rankings, and conversions remain unknown, not zero.

## Collection boundary

The resource implementation contains no analytics SDK, tracking tag, event queue, analytics cookie, beacon, or installed event listener for measurement. Worksheet state stays in component memory; it is not submitted or persisted by the tool. Printing is the browser's native print action.

Later integration requires a separate explicit task after A06 approval. Any adapter must refuse to emit while approval/consent is absent, on unapproved hosts, on local previews, or on `/resource-template-check` and fixture/draft URLs. Do not derive consent requirements from this document; record the actual reviewed decision first. Turning off analytics must leave reading, editing a worksheet, links, and printing fully functional.

## Shared parameter contract

Use a positive allowlist. Reject unknown events, keys, and unregistered values before transport. Do not attach generic objects, DOM text, browser errors, form data, or raw URLs.

| Parameter | Allowed value | Rule |
| --- | --- | --- |
| `page_path` | One existing canonical core path or approved published resource path | Match core routes or reviewed published article paths in the repository. Strip query/fragment before matching; reject unknown paths rather than recording them |
| `resource_id` | Registered public guide slug | Published guides only, never arbitrary path text or a fixture slug |
| `tool_id` | Registered tool ID in that published guide | Existing worksheet/checklist ID, never a typed field value |
| `action` | `first_edit`, `print_request`, or `download_click` | Explicit user action; use only where that feature exists |
| `topic` | `general`, `programs`, `volunteering`, `partnership`, `donation` | Map from approved routing categories; do not accept custom topic text |
| `error_category` | `validation`, `unavailable`, `network`, `rate_limit`, `provider` | Fixed categories, never provider messages, request bodies, or stack traces |
| `provider_category` | A short provider label approved at setup | No checkout URL, customer identifier, or account credential |
| `provider_group` | A reviewed public resource category | For external referrals; never full destination URLs |

The adapter may map these names to its provider's required fields, but it must preserve the allowlist and meanings. Event time may come from the platform. No new user/session identifier, cross-site linkage, or persistent deduplication storage is authorized here.

**Never collect:** names, email addresses, phone numbers, free-text contact messages, organization fields typed into forms, worksheet answers, checklist labels entered by users, sensitive requests, payment details, provider receipt IDs, private records, raw query strings, or fragments. A public slug and fixed enum are sufficient for these measurements.

Review provider defaults as well as custom events. Automatic page views, page titles, page/referrer URLs, form tracking, outbound links, file downloads, session replay, and enhanced measurement can collect information even when custom payloads are clean. Do not enable them unreviewed. A platform with no advertising cookies still requires a documented data-practices decision.

## Event definitions and current readiness

| Event | Exact trigger after approved installation | Allowed context | Deduplication | Current availability and meaning |
| --- | --- | --- | --- | --- |
| `resource_view` | A published article is rendered and eligible collection is permitted | `page_path`, `resource_id` | Once per actual page navigation; no duplicate hydration or effect event | Specified, not installed. No article is published yet. Readership only |
| `resource_tool_use` | First meaningful edit/check in an existing tool, a native print request, or a click on an actual downloadable tool | `page_path`, `resource_id`, `tool_id`, `action` | One first edit per tool per page visit; collapse duplicate `beforeprint` callbacks from one action | Specified, not installed. Print request is not proof of printing or saving; editing is not a form submission |
| `program_detail_view` | An actual verified program detail page renders | `page_path` | Once per navigation | Unavailable until verified detail pages exist; not triggered by the Programs hub |
| `contact_form_start` | First meaningful interaction with a form whose live delivery availability is enabled | `page_path`, `topic` | Once per enabled form visit | Unavailable while contact delivery is deferred; disabled-form interest is not an inquiry |
| `contact_submit_success` | The genuine production endpoint accepts a valid submission after the real email provider accepts it for sending | `page_path`, `topic` | Once per real accepted submission; protect against UI retries/duplicate feedback | Unavailable. Does not establish inbox delivery, staff response, or resolution |
| `contact_submit_error` | A genuine production validation or delivery failure occurs in an enabled flow | `page_path`, `topic`, `error_category` | Once per attempted submission and category | Specified, not installed. Mocked failures and setup-pending checks are excluded |
| `donation_checkout_click` | A visitor activates the foundation-approved working HTTPS checkout link | `page_path`, `provider_category` | Once per activation; exclude duplicate handlers | Unavailable while checkout is deferred. Counts interest, never a completed donation |
| `donation_confirmed` | A separately approved reliable provider confirmation/reconciliation verifies a completed gift | Reviewed non-personal campaign context only | Trusted private reconciliation must remove duplicate transactions before any aggregate reporting | Unavailable; no provider confirmation integration exists. Never fire from a return URL, click, or browser success screen alone |
| `external_resource_click` | A visitor activates a checked provider/source link in a published resource | `page_path`, `resource_id`, `provider_group` | Once per activation | Specified, not installed. Referral interest, not proof that someone received support |

No worksheet download exists in the current template. Do not emit `download_click` from browser printing, printing to PDF, or a nonexistent download button. Tools are visible in the article, so rendering a worksheet is not `resource_tool_use`. Do not call a print request a completed download.

Topic mapping must match `components/contact-form.tsx` when a future adapter is implemented; an unknown or changed value is rejected until the contract is reviewed. Keep provider receipt/transaction reconciliation in its approved private system, outside ordinary page analytics.

## Resource/tool QA cases for the future adapter

These are expected behavior, not completed provider tests. They must pass after an adapter is authorized and implemented.

| Scenario | Expected result |
| --- | --- |
| Read a real published article with eligible collection | One `resource_view`; canonical path and registered resource ID only |
| Open a preview, draft, unknown route, or local fixture | No events, even if it resembles a published article |
| Collection disabled or consent withheld where required | No analytics request/storage; guide and worksheet still work |
| Render a tool without using it | No tool-use event |
| Change multiple worksheet fields or checkboxes | One `first_edit` for the tool; no answers or field text included |
| Print from its button, browser menu, or keyboard | One `print_request` per user request if permitted; no claim that printing finished |
| Cancel the print dialog | Never count a completed print or download |
| Reload or navigate away | No worksheet values exported; no persistent draft added by analytics |
| URL includes an email address in a query or fragment | No raw URL/referrer sent; allowlisted path only |
| Unknown path contains personal text | Reject the event; do not log the rejected value |
| Payload includes an extra property such as `email` or `message` | Reject before transport; do not log the value |
| Contact is disabled; donation link absent | No start/success/checkout/confirmed outcome events |
| Mocked provider success or test payment | Excluded from real outcomes and production reports |
| Checkout returns with `success=true` | No `donation_confirmed` without trusted reconciliation |
| Print event fires repeatedly for a single preview | Collapse duplicate callbacks; retain the request-only definition |
| Provider or analytics request fails | Do not retry with private debug fields or block the visitor's task |

## Manual implementation sequence for the superadmin

1. Resolve the applicable ownership, domain, and privacy decisions in A06/R16/R23. Record actual owners; do not assume the developer is the foundation's privacy or factual approver.
2. Choose the provider and approve retention, access, collection, consent behavior, and public policy wording for the actual practices. Keep identifiers and credentials in appropriate private configuration.
3. Authorize a separate repository implementation for the adapter. Supply only the public settings required for the chosen platform through that task's approved mechanism.
4. Review both automatic collection and this custom allowlist before publishing a tag. Explicitly gate hosts, fixtures, test activity, and any required consent before loading/sending.
5. Test in the chosen provider's actual debug workflow. Inspect network requests/storage and confirm no private values, full query strings, or unapproved referrers leave the page.
6. Test resources and tools using a real reviewed guide. Exercise typing, checkbox use, button/browser/keyboard print, cancellation, refresh, and back/forward navigation. Record actual payloads with sample non-personal values.
7. Keep contact/giving outcomes disabled until their separate real connections are configured and verified. Validate each flow using its approved testing method and separate tests from genuine outcomes.
8. Record the production collection start date, configuration version, QA evidence, and remaining limitations. Begin the first full report only after 28 complete days of reliable data; the start date is currently unknown.

## References checked for this specification

- [Google Analytics: avoid sending personally identifiable information](https://support.google.com/analytics/answer/6366371), checked 20 October 2026. This informs data minimization; it does not select Google Analytics or resolve jurisdiction-specific requirements.
- [Google Article structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/article), checked 20 October 2026. Authorship, dates, and descriptions in the template must match visible approved content; markup does not guarantee indexing or a rich result.
- The installed Next.js 16.3.8 guides are the implementation authority for static export, awaited route parameters, generated routes, metadata, and escaped JSON-LD.
