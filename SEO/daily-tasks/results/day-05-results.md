# Publishing preparation and measurement: current status

Updated **22 October 2026**. The user explicitly chose **“Drop the CMS and keep the website managed through the repository.”** The prior Payload publishing implementation is retired. It was tested locally and on a temporary preview, but was not promoted to the production website.

## What remains useful

- SEO keyword research, page mapping, article briefs, the editorial calendar, and the publishing checklist.
- The [measurement specification](../../measurement/event-specification.md), including event meanings, privacy exclusions, QA cases, and manual superadmin setup steps. Tracking remains uninstalled.
- The existing eight designed pages, their metadata, canonical URLs, sitemap, organization/breadcrumb data, and client-confirmed Georgia content.

## What was removed

Payload, OpenNext, the admin editor and account routes, database schema/migrations, media upload integrations, dynamic page/article routes, private previews, and the CMS-only worksheet components were removed. There is no published guide or Resources hub. The earlier code-only article catalog and generator were not restored; future approved content can be implemented directly through repository changes.

The previous requirement to make pages editable in Payload is superseded, not left as unfinished CMS work. Their desktop and mobile design must remain unchanged. See [the editing guide](../../../docs/repository-editing-guide.md) and [the 22 October release record](../../../docs/release-2026-10-22.md).

## Historical validation and current limits

The local checks recorded on 20 October applied to the retired CMS implementation. They do not prove that a CMS is available today. The original CMS login failed on the deployed Cloudflare runtime during the 22 October attempt; password hashing was not weakened to work around it. The user then chose CMS removal.

Current production build, public-site testing, deployment, and temporary-resource cleanup evidence belongs in the dated release record. Contact delivery, donation checkout, named reviewers, and external analytics setup remain deferred. Search traffic and ranking metrics remain unknown.
