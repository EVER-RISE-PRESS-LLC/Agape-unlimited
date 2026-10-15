# Superadmin setup handoff

Prepared 16 October 2026. **Owner: the user, acting as superadmin.** The user has chosen to perform Search Console and other external administrative setup themselves. This document records the steps for later; it does not authorize an assistant to execute them.

The source of unresolved foundation facts is [NEEDS-YOUR-REVIEW.md](NEEDS-YOUR-REVIEW.md). Refer to its R IDs when recording answers. Keep passwords, private API keys, participant information, and account recovery details out of this file and chat.

## Action list

| ID | Manual action | Prerequisite | Current status |
| --- | --- | --- | --- |
| A01 | Confirm the foundation identity, service area, and actual program status | R01, R02, R04, R08-R10 | Foundation confirmation pending |
| A02 | Decide the permanent public domain and who controls its hosting/DNS | R03 | Existing Workers origin remains in use; permanent choice pending |
| A03 | Select the foundation's Search Console account and existing or new property | R16 and A02 | Superadmin action pending; no authenticated account/property inspected |
| A04 | Complete the verification method supplied by Search Console | A03 and appropriate site/domain control | Not performed by the assistant |
| A05 | Inspect core URLs and submit the real live sitemap when it exists | A04; Day 4 technical release | Sitemap and robots deployed and publicly verified on 16 October; Search Console inspection and manual submission remain pending |
| A06 | Choose analytics, approve data practices, and arrange its setup | R16, R23 | Provider/account/collection baseline unconfirmed; no setup performed |
| A07 | Identify the factual approver and specialist reviewers | R18 | Names and assignments pending |
| A08 | Configure contact email delivery when ready | R05, R06; approved private sender/recipient/key | Intentionally deferred by the user |
| A09 | Configure the approved donation checkout when ready | R07; approved HTTPS provider URL | Intentionally deferred by the user |
| A10 | Consider Bing and an eligible local profile only when useful | R01, R16, R20; accurate operations | Optional later admin work; not created or claimed |

Unchecked setup work remains open even if a daily audit or handoff task is complete. Record the actual completion date and non-sensitive evidence for each action when performed.

## A01: Confirm the public facts

Complete the relevant entries in the shared review checklist. The current website name and mission are approved copy; they do not establish a legal registration, service location, founding history, or ten active programs.

For each program, record whether it is active, planned, partner-delivered, referral-only, paused, or unavailable. Add actual audience, area, availability, process, and owner where known. Record the source and date. Do not publish facts borrowed from another organization named Agape.

## A02: Decide the public domain

The current public origin is `https://agape-unlimited.everrisepressdev.workers.dev`. Retain it until you decide otherwise. A custom-domain decision is separate from buying or configuring one.

If moving, arrange hosting/DNS and corresponding redirects before changing canonical URLs and public references. The implementation team can prepare repository changes under an explicit task. Keep the account and DNS actions with the superadmin unless you specifically delegate them later.

## A03-A04: Set up Search Console yourself

1. Sign in to [Google Search Console](https://search.google.com/search-console) with the intended foundation-managed account.
2. Check for an existing correct property before creating a duplicate. Record its exact URL and your role after inspecting it.
3. For the current Workers address, consider the URL-prefix property `https://agape-unlimited.everrisepressdev.workers.dev/`. Do not assume control over `workers.dev` or the hosting provider's parent domain.
4. Use a verification method actually offered by Google. A domain property requires DNS verification; URL-prefix properties also support site-level methods such as an HTML file or tag.
5. If you choose a site file or tag, use Google's exact supplied value. Publish it through the real source/deployment process and check the live output before clicking Verify. Do not invent a token or edit only the generated export.
6. Preserve existing legitimate verification methods. Record the verified property, method, date, and responsible account role without storing login credentials.

No property or verification was created during Day 1. An initial browser access check reached Google's sign-in screen before the user clarified this workflow; no credentials were entered and no account or settings were changed. Account setup and further account inspection are now reserved for the superadmin.

Sources checked 16 October 2026: [Google property types and setup](https://support.google.com/webmasters/answer/34592), [Google ownership verification](https://support.google.com/webmasters/answer/9008080).

## A05: Inspect pages and submit the sitemap after verification

Once the property is verified, inspect the homepage, About, Programs, Get Involved, Contact, and Donate. Record the crawl/indexing result and Google's chosen canonical for each, including any reported reason a page is not indexed.

Check that the live `/sitemap.xml` returns valid XML containing actual canonical pages before submitting it. Its implementation and release are recorded in [SEO Day 4](SEO/daily-tasks/results/day-04-results.md). On 16 October, the live sitemap returned valid XML with eight reachable canonical pages, and the live robots response declared the sitemap. See the [public release checks](SEO/daily-tasks/results/release-2026-10-16.json). Search Console verification, inspection, and submission remain manual superadmin actions; public reachability does not establish indexing.

Record the submission result and later inspection findings. Keep indexing, impressions, clicks, query position, and backlinks unknown until the account provides evidence. Reachable public HTML alone does not establish Google indexing. [Google's Search Console usage guidance](https://developers.google.com/search/docs/monitor-debug/search-console-start).

## A06: Approve measurement

Choose whether to use a measurement platform, identify the account owner, and review data/consent requirements for the actual jurisdiction and practices. Use the [measurement plan](SEO/strategy/09-measurement-and-reporting.md) for event definitions.

If you approve implementation, arrange that task explicitly. Verify collection with known test activity and record when reliable production collection starts. Review a full 28-day period only after it exists. A lack of observed page tags does not prove no server-side or hosting analytics exist.

Never include contact message text, names, email addresses, private service requests, or payment data in ordinary analytics events. Keep resource engagement, submitted inquiries, checkout clicks, and confirmed gifts distinct.

## A07: Assign reviewers

Record a foundation fact approver, education/logistics reviewer, safeguarding/program reviewer, accessibility reviewer, and measurement/privacy owner where applicable. One person may cover several roles if qualified; no named expert review is claimed before it happens.

The user is confirmed as the superadmin for external setup. That does not automatically identify the foundation's legal representative, program owner, or subject specialist. Those assignments remain under R18 and the related fact entries.

## A08-A09: Keep contact and giving deferred

For contact delivery, approved receiving and verified sending addresses plus a private Resend API key are needed. Configure private values through the appropriate ignored local secret file or Cloudflare secret settings. The optional public contact email is a separate setting.

For giving, use the foundation-approved HTTPS checkout URL and confirm supported gift and receipt arrangements. Public settings require a rebuild. Keep setup-pending messaging until the real flow works; do not infer delivery or completed gifts from button clicks or mocked tests.

These are documented later actions. No contact credentials, donation URL, real message, or payment was configured or submitted in Day 1.

## Completion record

When you complete an action, record its ID, actual date, result, non-sensitive evidence, and remaining dependency in a dated note. Update the related R item only with a confirmed answer. Do not mark A03-A06 complete simply because this handoff exists.
