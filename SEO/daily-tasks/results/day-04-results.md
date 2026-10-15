# SEO Day 4 results: technical search discovery

**Work date:** 16 October 2026, Asia/Dhaka. **Status:** complete in source and production. **Release state:** pushed to `main` and deployed through the existing Git-connected Cloudflare workflow following the user's explicit push request; live verification passed. Source release: `d836dd2948deb6b4e99bd1009c102608ad1c2e0a`.

The user requested Day 4 out of sequence. Days 2 and 3 retain their existing status. Search Console, verification, analytics, DNS, contact delivery, and donation checkout remain under the [superadmin handoff](../../../SUPERADMIN-SETUP.md).

## Implemented website changes

| Area | Result | Source |
| --- | --- | --- |
| Sitemap | `/sitemap.xml` exports eight published canonical URLs; no API, query variants, errors, drafts, or invented update dates | [Sitemap route](../../../app/sitemap.ts), [published-page registry](../../../lib/seo.ts) |
| Robots | `/robots.txt` explicitly allows public crawling and declares the canonical sitemap | [Robots route](../../../app/robots.ts) |
| Identity | Homepage JSON-LD links the real Organization and WebSite using stable IDs, approved name/description, current origin, supplied logo, and English language | [SEO data](../../../lib/seo.ts), [serializer](../../../components/structured-data.tsx) |
| Breadcrumbs | Seven interior pages expose BreadcrumbList data matching their visible Home/current-page navigation | [Page intro](../../../components/page-intro.tsx) |
| Canonicals | Existing core canonicals remain clean and consistent; contact query parameters do not create a separate canonical | [Metadata helper](../../../lib/metadata.ts) |
| Error metadata | 404 has its own title/description, no homepage canonical, and the framework's `noindex`; real HTTP 404 behavior is preserved | [Error page](../../../app/not-found.tsx), [root layout](../../../app/layout.tsx), [homepage](../../../app/page.tsx) |
| API indexing | JSON responses carry `X-Robots-Tag: noindex`; contact availability still returns false and remains uncached | [Worker](../../../worker/index.ts), [static fallback](../../../app/api/contact/route.ts) |
| Asset caching | Fingerprinted Next.js assets use a one-year immutable policy; HTML and discovery responses remain revalidated | [Headers](../../../public/_headers) |
| Image delivery | Navigation uses a smaller supplied-seal derivative; portraits use responsive WebP variants with original JPEG fallbacks | [Photo component](../../../components/foundation-photo.tsx), header/footer and public image assets |
| Site origin | The existing HTTPS origin is retained and normalized; invalid origin configuration fails rather than emitting malformed metadata | [Public site configuration](../../../lib/site.ts) |

No address, founder name, legal subtype, tax classification, registration number, social profile, rating, event, active service, or working donation action was invented. The schema describes established public information only. It does not assert a Google rich-result or indexing outcome.

## Performance evidence

Lighthouse CLI **13.5.0** measured the local Wrangler preview at `http://localhost:8794`. Settings were mobile 412 x 823, device scale factor 1.75, simulated 150 ms RTT and 1,638.4 Kbps throughput, with 4x CPU slowdown. These are individual lab runs, not a median or real-user Core Web Vitals.

| Homepage measure | Before | Final |
| --- | --- | --- |
| Performance score | 58 | 92 |
| Largest Contentful Paint | 13.39 seconds | 3.18 seconds |
| First Contentful Paint | 1.04 seconds | 0.79 seconds |
| Total Blocking Time | 319 ms | 120 ms |
| Cumulative Layout Shift | 0 | 0 |
| Total measured transfer | 2,411,502 bytes | 508,375 bytes |
| Lighthouse accessibility | 100 | 100 |
| Lighthouse SEO checks | 100 | 100 |

The original seal is 1,786,869 bytes despite being shown around 51-62 pixels wide. The 186 x 171 navigation copy is 58,640 bytes, a **96.7% reduction**, while the original supplied asset remains intact. Homepage transfer fell by approximately **78.9%** in these runs.

The first smaller-seal/loading pass scored 83. The remaining image-delivery findings justified the responsive photograph pass, which produced the final 92 score. Photo variants are 480, 768, and original-width WebP files at quality 84; original JPEGs remain the fallback. Eager main portraits receive `fetchPriority="high"`; deprecated Next.js `priority` props were removed.

Other representative mobile templates were measured after the shared discovery, caching, and smaller-seal changes. These pages do not use the photograph component subsequently optimized on Home/About/Values:

| Template | Performance | LCP | CLS | Accessibility / SEO |
| --- | --- | --- | --- | --- |
| Programs | 95 | 2.84 seconds | 0 | 100 / 100 |
| Contact | 96 | 2.81 seconds | 0.0069 | 100 / 100 |
| Donate | 97 | 2.51 seconds | 0 | 100 / 100 |

The homepage's final LCP remains above the 2.5-second lab target. Further tuning should use the deployed environment and actual user data when available. INP and CrUX/Search Console field baselines were not collected. A resource template does not exist yet and remains Day 5 work. Lighthouse's SEO score is a limited automated check, not proof of indexing or a complete SEO strategy.

The [compact performance record](../../research/day-04-performance-2026-10-16.json) preserves tool version, timestamps, settings, scores, metrics, and image/LCP findings for all runs. [Lighthouse scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) and [Web Vitals guidance](https://web.dev/articles/vitals) explain the limits and metrics.

## Validation completed

- `npm run build`: passed; sitemap and robots were statically exported with the site.
- `npm run typecheck`: passed with regenerated local Worker types.
- `npm run lint`: passed.
- `PLAYWRIGHT_BASE_URL=http://localhost:8794 npm run test:e2e`: **17 tests passed** in 15.4 seconds, including the existing desktop/mobile accessibility and contact tests.
- Four new production-preview tests verify discovery XML and canonical coverage, identity/breadcrumb data, error/query/API crawl metadata, private-file exclusion, working links/anchors, and immutable asset headers.
- `npm run deploy -- --dry-run`: passed local packaging. This did not deploy a Worker or change account configuration.
- The export was checked for planning documents and private source files; none were included. Preview requests for review/setup documents and `.env` return 404.
- Existing screenshot checks passed; the mobile layout and supplied seal were visually inspected. Original source photographs and seal remain unchanged.

Provider responses in the existing contact tests are mocked. No real email or payment was sent. Benign terminal color-environment warnings and a Wrangler update notice do not indicate test failures; no dependency upgrade was performed.

The [HTTP/schema verification record](../../research/day-04-technical-verification-2026-10-16.json) preserves local response statuses, headers, metadata, JSON-LD, sitemap, and robots output. The code adds `npm run test:seo` for the four focused tests.

## Production release and live verification

The user subsequently requested a push. Source commit `d836dd2948deb6b4e99bd1009c102608ad1c2e0a` was pushed to `main`; the existing Cloudflare Workers Builds production check completed successfully. No direct local Wrangler production deployment or account configuration was performed.

All **23 public release checks passed**, covering eight reachable canonical pages with unique metadata, valid sitemap XML, the final robots response after Cloudflare processing, Organization/WebSite and seven breadcrumb graphs, query canonicals, the real 404, API indexing and cache headers, private-document exclusion, immutable assets, unchanged optimized-image hashes, the social image, and deferred contact/giving states. All **four SEO tests also passed against the deployed site** in 11.5 seconds. See the [dated release evidence](release-2026-10-16.json) for statuses, headers, hashes, metadata, structured data, and the deployment check.

Earlier pre-release observations remain in the technical verification record: the sitemap returned 404, while robots returned 200; an unidentified client was initially refused with 403. Those observations describe the site before publication. The final identified audit client confirmed the deployed fixes.

The superadmin still performs Search Console verification, URL inspection, and sitemap submission. No DNS, domain, analytics, tracking, verification token, account, or integration was configured here. Contact delivery and donation checkout remain intentionally deferred. This release does not complete the remaining content tasks or the final full-project handoff.

## Metadata review

The 404 title leads with the problem and identifies the foundation. Its description gives useful next steps rather than repeating the title. Both use plain language and no invented claim. The organizational description reuses the already approved mission summary. URLs, schema IDs, and enum values are technical identifiers rather than copy targets. Character counts are editorial checks, not ranking rules.

## Source references

- Installed Next.js 16.3.8 guides for metadata, JSON-LD, static export, sitemap, robots, not-found, and Image. Static handlers use the documented `force-static` export; JSON-LD escapes `<` during serialization.
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap): canonical absolute URLs and no synthetic modification dates.
- [Google Organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization) and [breadcrumb guidance](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb): truthful identity and visible navigation.
- [Cloudflare static asset headers](https://developers.cloudflare.com/workers/static-assets/headers/): source-level cache headers, checked in the local Worker preview.

## Client-ready daily update

1. Added the sitemap and crawler instructions for the website's published pages.
2. Added accurate organization information and breadcrumb data for search engines.
3. Cleaned up missing-page metadata and added technical SEO checks.
4. Optimized the navigation logo and photograph delivery, improving the local mobile homepage performance score from 58 to 92.
5. Completed the production build, code checks, all 17 automated tests, and deployment packaging checks.
6. Pushed the changes to GitHub and verified the Cloudflare production release, including all four live SEO tests. Search Console and other admin setup remain with the superadmin; contact email delivery and donation checkout remain deferred.
