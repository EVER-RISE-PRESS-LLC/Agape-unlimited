# Production SEO baseline

Checked 15 October 2026 against `https://agape-unlimited.everrisepressdev.workers.dev`. The [raw HTTP and HTML evidence](live-site-audit-2026-10-15.json) records the fetch time, response statuses, metadata, headings, images, and links. This is a read-only inspection of the deployed pages, not a Search Console indexing report, Lighthouse score, or analytics audit.

## Findings that change the plan

1. The eight main HTML pages return HTTP 200 and have unique titles, descriptions, and canonical URLs.
2. `/sitemap.xml` returns HTTP 404. Discovery needs an explicit sitemap once the public domain is settled.
3. `/robots.txt` returns HTTP 200, but the inspected body contains only explanatory content-signal comments. It has no `Sitemap:` line or actual crawler directives. Comments do not by themselves block Googlebot.
4. None of the eight main pages contains JSON-LD. The organizational identity has no structured-data support yet.
5. Program availability is intentionally provisional, and the contact endpoint returns `{"available":false}`. A service acquisition strategy must respect both facts.
6. The public address is a Workers subdomain under a development account name. It is technically usable; the foundation should decide whether it wants its own permanent domain before building many external references.

## Page inventory

| URL | HTTP | Title characters | Description characters | H1 count | JSON-LD blocks |
| --- | --- | --- | --- | --- | --- |
| `/` | 200 | 69 | 133 | 1 | 0 |
| `/about` | 200 | 37 | 149 | 1 | 0 |
| `/programs` | 200 | 41 | 132 | 1 | 0 |
| `/values` | 200 | 39 | 140 | 1 | 0 |
| `/get-involved` | 200 | 41 | 125 | 1 | 0 |
| `/contact` | 200 | 36 | 128 | 1 | 0 |
| `/donate` | 200 | 35 | 141 | 1 | 0 |
| `/privacy` | 200 | 36 | 119 | 1 | 0 |

These lengths are editorial diagnostics. Google truncates title links according to available display space; it does not impose a universal 60-character ranking limit. The homepage's 69-character title is a refinement opportunity, not a technical indexing failure. [Google title guidance](https://developers.google.com/search/docs/appearance/title-link).

## Strengths to preserve

- Static exported HTML contains the main page content and navigation.
- The foundation has coherent branding, readable page structure, and a distinct page for each primary visitor journey.
- Root-relative internal links connect all eight core pages through shared navigation and the footer.
- Each main page has a single H1 and its own canonical path.
- A 1200 x 630 branded PNG is available at `/opengraph-image`, returns HTTP 200, and has the correct image content type.
- The tested nonexistent URL returns a real 404 and includes `noindex`.
- Existing browser checks cover the site's navigation, mobile layout, form states, and automated accessibility checks. Those checks are useful regression protection; they are not proof of search rankings or real-user speed.

## Nine category assessment

| Category | Current evidence | Priority and next action |
| --- | --- | --- |
| Head metadata | Unique titles, descriptions, canonicals, social metadata present | P1: add more specific subject wording while preserving mission accuracy |
| Structured data | Zero JSON-LD blocks on all eight core pages | P0: truthful Organization and WebSite identity; breadcrumbs where visible |
| Content quality | Clear mission; sparse operational detail; no resource library | P1: verify facts, deepen key pages, build a focused resource collection |
| Social images | Branded 1200 x 630 PNG works | Preserve; article-specific images can wait for real articles |
| Sitemaps and discovery | Sitemap missing; robots response has comments only | P0: first-party robots and sitemap, then Search Console submission |
| Machine and AI discovery | No dedicated discovery files assessed as necessary | Low priority: normal indexing and clear content first; no Google requirement for llms.txt |
| Performance | HTML and assets reachable; no current field or lab speed measurement | P1: measure before assigning performance fixes |
| Redirects and errors | Real 404 works; not a full URL-variant or migration test | P0 if changing domain; otherwise preserve current error behavior |
| Delivery validation | Build and browser checks exist; no SEO-specific CI assertions found | P1: validate sitemap, metadata, canonicals, schema, internal links, and publication gates |

The table is an evidence-based planning assessment. No numerical SEO, authority, or speed score is assigned because none was measured.

## Content gaps by visitor question

| Question | Current limitation | Required evidence before expansion |
| --- | --- | --- |
| Who runs the foundation? | No approved founder name or governance details in the inspected site | Approved biography, organizational role, relevant background |
| Where does it work? | No confirmed service geography | Country, city or region, reach and limits |
| Which services can I use now? | Ten areas of interest, not confirmed operating programs | Program status, eligibility, availability, process, responsible owner |
| Can I volunteer now? | General invitation, no verified roles or working direct intake | Current roles and maintained response route |
| Can I make a gift now? | Online giving pending | Approved checkout and relevant gift information |
| Why trust a practical guide? | No author/reviewer system or first-hand resource articles yet | Editorial ownership, verified sources, original contribution |

The current pages honestly avoid invented results, testimonials, partner logos, tax claims, and service guarantees. That restraint should remain part of the SEO strategy.

## Specific technical observations

### Error metadata

The tested 404 response inherits the homepage canonical and description. HTTP 404 and `noindex` already prevent this from being an urgent content-indexing problem. If the framework allows clean error-specific metadata without fragile workarounds, remove the misleading homepage canonical from the error template during a later refinement.

### Program content

The program explorer is rendered into the HTML, including its program headings. Filtering and collapsed descriptions are usability features. Do not label the page uncrawlable simply because it is interactive. Still verify the final rendered page in URL Inspection after material changes.

### Images and cache policy

The inspected social PNG is approximately 192 KB. This does not establish the sizes or loading performance of the founder photographs. The sampled HTML and social image use revalidation caching. Hashed JavaScript, CSS, fonts, and real-user Core Web Vitals need separate checks before a performance diagnosis.

### Robots ownership

There is no source robots file in the inspected application paths. A host-generated robots response is therefore a likely explanation for the live comments, not a confirmed dashboard setting. Add an explicit source file and inspect the combined deployed output so the intended sitemap and rules are actually served.

## Items requiring account access

Search Console ownership, indexing coverage, chosen canonical, query impressions, backlinks, manual actions, analytics installation, and historic search performance remain unknown. A `site:` query cannot establish a complete indexed-page count. The measurement plan specifies how to obtain those facts.

## Recommended first technical release

Bundle the approved domain decision, canonical consistency, a working sitemap, an explicit robots file, conservative Organization identity, and SEO regression checks. Keep this planning directory out of the static export. The implementation details and acceptance criteria are in the [technical roadmap](../strategy/07-technical-seo-roadmap.md).
