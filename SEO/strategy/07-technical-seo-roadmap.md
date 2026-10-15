# Technical SEO implementation roadmap

The first technical release should make the approved public site discoverable, consistent, and easy to verify. This file preserves the original implementation specification and live baseline observations. **Update, 16 October 2026:** [Day 4](../daily-tasks/results/day-04-results.md) implemented the discovery, structured-data, error-metadata, caching, and measured image-delivery changes in source and validated the local production output. The user subsequently authorized a push; the Git-connected production deployment succeeded and public checks passed. See the [release evidence](../daily-tasks/results/release-2026-10-16.json). The observed issues below describe the earlier baseline, not the current release. External account setup remains with the superadmin.

## P0 Domain and ownership

The current public origin is `https://agape-unlimited.everrisepressdev.workers.dev`. Confirm whether this will remain the public domain or whether the foundation owns an approved custom domain.

A custom domain can make organizational ownership and communications clearer. The Workers address is not inherently unindexable, and this audit does not identify a hosting-domain penalty. Avoid building many directory listings or partner references to a temporary address immediately before moving it.

If a new domain is selected:

1. Confirm ownership and the preferred HTTPS hostname.
2. Configure the production host and build-time `NEXT_PUBLIC_SITE_URL` consistently.
3. Preserve existing paths where practical.
4. Redirect each old public URL to its corresponding new URL with a permanent redirect.
5. Update canonicals, social URLs, schema IDs, sitemap URLs, internal absolute references, and approved profiles.
6. Verify both old and new Search Console properties. Follow Google's current move guidance and use its migration tooling where applicable to the property types.
7. Check old URLs, new URLs, asset delivery, redirects, forms, and status codes after launch.

Do not redirect every old page to the new homepage. Do not choose a domain merely because another unrelated Agape organization uses a similar name. [Google site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

## P0 Sitemap

**Observed:** `/sitemap.xml` returns HTTP 404.

For this small static export, an explicit sitemap is straightforward. The installed Next.js docs support `app/sitemap.xml` or `app/sitemap.ts`; the developer must follow the installed version's static-export rules. Do not edit `out/` as the source of truth.

**Initial inclusion:** the eight intended public pages, subject to the foundation's indexability choices. Add new resource and program pages only after they are genuinely published and meet their content gates.

**Exclude:** `/api/contact`, query-string contact variants, 404 routes, unpublished drafts, source files, private information, and this planning directory.

**Acceptance criteria:**

- Production `/sitemap.xml` returns HTTP 200 and valid XML.
- Every included URL is absolute, canonical, on the approved origin, and returns HTTP 200.
- No redirect, `noindex` page, query variant, or unpublished route is listed.
- `lastmod`, if supplied, represents a significant page update rather than every build or checkout time.
- Submit the resulting sitemap in the appropriate verified Search Console property.

Google treats sitemap submission as a discovery signal, not an indexing guarantee, and ignores sitemap priority and change-frequency values. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## P0 Robots ownership and indexability

**Observed:** the live robots response contains explanatory comments but no sitemap declaration. No source robots file was found in the inspected application paths.

Create an explicit first-party robots file or route at the source level. Keep public pages available to normal search crawlers and include the approved sitemap location. Review the combined response after Cloudflare's processing; a source file alone does not prove the deployed output.

Do not treat `robots.txt` as access control or as a substitute for `noindex`. It cannot protect personal data. Do not disallow CSS, JavaScript, or images needed to render public pages. The contact endpoint is an application route, not a content acquisition page; use appropriate content and header controls rather than expecting it to rank.

Keep any existing AI-training preference separate from the search-indexing decision. Do not introduce a new rights or training policy as a side effect of sitemap work. [Google robots specification](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec).

## P0 Search Console and Bing setup

On a foundation-owned custom domain, a DNS-verified domain property can cover variants. On the current shared-host subdomain, use the supported property verification available to the foundation; do not assume DNS control over the hosting provider's parent domain.

Check the homepage and key pages with URL Inspection, the indexing report, sitemap report, and manual-action/security reports. Record the Google-selected canonical and crawl result. An HTML 200 response proves reachability, not indexing. [Search Console setup and use](https://developers.google.com/search/docs/monitor-debug/search-console-start).

Bing Webmaster Tools can be evaluated through the foundation's own account after the canonical site is settled. IndexNow is a later discoverability option for participating engines, not a Google indexing mechanism or an initial blocker. An accepted notification is not proof of indexing. [IndexNow protocol documentation](https://www.indexnow.org/documentation).

## P1 Metadata and headings

Use the proposed [metadata table](../research/page-metadata.csv) as copy for review, not as a bulk replacement command. Preserve the full foundation identity on key pages and introduce specific subject wording on resource pages. Existing descriptions are already unique.

Keep the current emotional headings where they serve the design, with nearby descriptive text that explains the page's subject. Do not force exact-match phrases into every H2, image alt, and link. Use a logical heading structure and readable text in the HTML.

Verify canonicals on the production domain after deployment. Contact topic parameters should resolve to the same clean canonical page. Keep privacy and error-page indexing decisions deliberate. The existing 404 already returns a correct status and `noindex`; cleaning its inherited homepage canonical is a lower-priority refinement.

Search title and snippet display can differ from supplied metadata. Concise, descriptive copy is the goal; a character counter is an editorial aid rather than a ranking rule. [Google title links](https://developers.google.com/search/docs/appearance/title-link), [Google snippets](https://developers.google.com/search/docs/appearance/snippet).

## P0 Organizational identity and later page schema

**Observed:** no JSON-LD on the eight main pages.

Begin conservatively:

| Type | Where | Useful established information | Information that must wait |
| --- | --- | --- | --- |
| Organization | Homepage or About | Foundation name, approved canonical URL, supplied logo, factual description | Address, phone, founder, tax ID, registration, founding date, unverified social profiles |
| WebSite | Homepage | Name and canonical URL | A fictional SearchAction when no site search exists |
| BreadcrumbList | Pages with visible breadcrumbs | Actual hierarchy and published URLs | Invented parent pages |
| Article | Published editorial resources | Visible headline, real author/editor, publication and substantive update dates, real image | Fake experts, copied bylines, fabricated publication dates |

Use persistent IDs derived from the approved domain. The general Organization type is safer than asserting a legal subtype the foundation has not established. Do not add LocalBusiness merely to pursue local ranking, or claim a charity classification from another entity.

Google recommends organizational information on a home or organization-description page, not necessarily repeated on every page. Structured data must match visible facts and does not guarantee an enhanced appearance. [Organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization).

### Features not to sell as early wins

- FAQ rich results were retired in May 2026. Keep useful FAQs for people; do not budget for an FAQ-rich-result boost. [Google updates](https://developers.google.com/search/updates).
- `llms.txt` is not required for Google Search and does not improve or harm Google rankings by itself. Other systems may use it; that is a separate, optional purpose. [Google's 2026 AI guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
- Do not add ratings, reviews, events, donation actions, or program availability that are not real and visible.
- An RSS feed can be useful once a maintained editorial collection exists, but is not necessary for this eight-page site to be indexed.
- Schema maps, agent catalogs, MCP cards, and experimental discovery files are outside the first 90-day priority unless a real product need emerges.

## P1 Resource publishing architecture

Keep the Next.js static export and Cloudflare Worker separation unless a real publishing requirement calls for a change. A data-driven static resource collection can support the first articles without a new backend or CMS.

The developer should define required content fields: slug, title, description, reader task, author/editor, reviewer where relevant, publication status, dates, canonical path, sources, related pages, and review date. Generate only published slugs and use the installed Next.js guide for `generateStaticParams` and static export.

Keep private review notes and foundation intake information outside published content. Draft status should prevent an incomplete article from entering the export, resource index, sitemap, or internal navigation. Do not make every Markdown file in `SEO/` a website article.

## P1 Performance measurement

Measure the homepage, one resource template, Programs, Contact, and Donate on a representative mobile profile. Record test location, device assumptions, date, and the tested URL. Pair lab diagnostics with Search Console or CrUX field data when enough data exists. A new low-traffic site may not yet have a field baseline.

Inspect image transfer sizes, image dimensions, the hero loading path, fonts, JavaScript, layout shifts, and caching of hashed assets. Preserve keyboard focus, reduced motion, and working form feedback during optimization.

Use Google's current Core Web Vitals guidance as the measurement reference. Report actual readings rather than a promise that the site is fast because it is statically exported. [Core Web Vitals and Search](https://developers.google.com/search/docs/appearance/core-web-vitals).

## P1 Technical acceptance checks

Add focused checks to the existing suite:

1. Sitemap is valid and every listed canonical page returns 200.
2. Robots response includes the correct sitemap and does not unintentionally block public pages.
3. Each intended content page has a unique nonempty title, description, canonical, and sensible primary heading.
4. Organization identity and article data serialize correctly and match visible content.
5. No internal link points to an unpublished resource or a broken anchor.
6. 404s remain 404s, with no soft-404 success page.
7. Deferred contact and donation states remain honest.
8. Published assets contain no planning files, credentials, application records, or private editorial notes.

Run the production build and existing behavior/accessibility checks after source changes. Validate schema with appropriate current tools; not every schema type produces a Google rich result, so do not equate a missing enhancement with invalid JSON-LD.

## Release evidence

For every SEO release, save commit, deployed origin, changed URLs, build result, sitemap and robots response checks, selected metadata, schema validation, redirect evidence if relevant, and Search Console follow-up notes. A successful deployment check does not prove Google has already recrawled the pages.
