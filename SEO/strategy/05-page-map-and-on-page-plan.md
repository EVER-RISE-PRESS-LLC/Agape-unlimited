# Page map and on page content plan

Improve the eight existing pages before expanding the URL count. The current site has the right broad journeys, but the next layer must explain identity, availability, practical participation, and evidence more clearly.

All wording below is proposed, not deployed. The [metadata table](../research/page-metadata.csv) includes draft titles, descriptions, publication conditions, and character counts. Approved mission statements and the current visual identity remain the source of truth.

## Existing page assignments

### Homepage

**Owns:** exact full-brand navigation. **Supports:** the foundation's children-and-families purpose.

Keep the emotional hero if desired, but add a clear sentence near it identifying Agape Unlimited Foundation and its focus. A person arriving from search should know what organization this is without interpreting a slogan. Add verified service geography only after confirmation.

Recommended content order:

1. Full foundation name and factual mission descriptor.
2. The people the mission is intended to serve.
3. Current program status, linking to the program hub.
4. Ways to learn, contribute, or seek information, each with honest availability.
5. Approved founder or governance information and a link to About.
6. A small selection of reviewed resources once published.

**Evidence needed:** identity and any new operational claims. **Current safe next step:** learn about the mission or program areas. **Avoid:** every target keyword in the hero, invented beneficiary numbers, or a call to apply for unavailable support.

### About

**Owns:** brand mission, organization background, and approved founder queries.

Add an approved founder introduction, the origin of the current mission, accountable leadership or governance information, and a precise statement of where the foundation works. If registration or tax information is added, use the correct jurisdiction and source it from the foundation's own records.

Suggested headings: About the foundation; Our mission; The people responsible for the work; Where we work; How our programs develop; Learn more or contact us. Not every section must be published before the facts exist.

**Original contribution:** an approved founder interview or a concise explanation of how the foundation chooses priorities. **Links:** Programs, Values, Get Involved, and any eventual accountability material. **Avoid:** importing the history or charity status of a similarly named entity.

### Programs

**Owns:** brand program navigation and the overview of the ten areas.

Retain the explorable list. Add a short status statement and a compact status key only after each area's status is known. A useful distinction is active, in development, partner referral, or not currently available. Do not assign those labels without confirmation.

For an active program, state who it serves, where, what happens, how availability works, and how to ask. For a planned area, explain the aim and clearly label it planned. A short unverified area should remain an entry on the hub, not become an independent SEO page.

**Links:** approved program detail pages, relevant preparation guides, and the appropriate involvement page. **Avoid:** an unsupported `apply now` action or ten nearly identical pages with a different heading.

### Values

**Owns:** brand values and organizational principles. It is primarily a trust page, not an acquisition engine for broad terms such as compassion or opportunity.

Keep the six approved values. Add short examples of how they influence an actual approved process when examples exist. One specific, verifiable practice is more useful than several paragraphs repeating each value.

**Links:** relevant program explanations, responsible storytelling, accessible participation, and About. **Avoid:** presenting a proposed practice as an implemented policy.

### Get Involved

**Owns:** brand participation and the current ways to contribute.

Separate time and skills, partnerships, and giving. If roles are not open, say so. If intake is unavailable, the page can still explain the foundation's plans and link to useful preparation resources.

When operations are ready, add role type, commitment, location, age or eligibility criteria, supervision, required checks, application steps, and what happens next. These details must come from the program owner.

**Links:** reviewed volunteering resources, partnership guide, Donate, and the maintained contact route. **Avoid:** advertising weekend, remote, one-off, youth, or corporate opportunities just because those terms are appealing.

### Contact

**Owns:** branded contact intent.

Maintain the clear pending message until delivery works. Once configured, include the approved public email and any maintained alternative channel. Explain which questions the form handles and avoid a response-time promise unless the foundation can meet it.

The page should not compete with an actual volunteer-role page for local recruitment terms. Topic query parameters should keep the clean `/contact` canonical. Never include submitted names, email addresses, or message content in URLs or analytics.

### Donate

**Owns:** branded giving intent. Broader donor acquisition is deferred.

Before promotion, establish the approved provider, checkout availability, payment options actually supported, receipt process, and relevant gift information. Add impact examples only when they accurately reflect the foundation's own records. Do not invent a dollar-to-benefit conversion.

Keep FAQs that help donors. Google stopped displaying FAQ rich results in May 2026; useful visible answers remain worthwhile without promising an expanded search listing. [Google documentation updates](https://developers.google.com/search/updates).

### Privacy

**Owns:** branded privacy information. It does not need a broad search acquisition strategy.

Keep it accessible from the form and footer. Update it when analytics, email delivery, donation handling, or data practices change. A legal or privacy reviewer should assess substantive policy changes for the foundation's jurisdiction.

## Proposed architecture

```text
/
├── /about
├── /programs
│   ├── /programs/education-support           [only when operational]
│   └── /programs/youth-mentorship           [only when operational]
├── /values
├── /get-involved
│   ├── /get-involved/volunteer              [verified roles and intake]
│   └── /get-involved/partner                [supported arrangements]
├── /resources                             [new editorial hub]
│   ├── /resources/organize-school-supply-drive
│   ├── /resources/questions-before-volunteering-with-children
│   ├── /resources/support-families-without-donating-money
│   ├── /resources/small-business-nonprofit-partnerships
│   ├── /resources/mentor-vs-tutor
│   ├── /resources/find-a-youth-mentoring-program
│   ├── /resources/inclusive-community-event-checklist
│   └── /resources/family-support-in-[city]  [verified local directory]
├── /contact
├── /donate
└── /privacy
```

Bracketed notes are planning conditions, not URL segments. These URLs are candidates and do not exist merely because they appear in this directory.

## Internal link rules

Each new article needs a link from the resource hub and at least one relevant existing page. It should link to its parent hub, a useful related resource, and the appropriate next step where that next step functions. Do not insert a donation link into every paragraph.

| Source | Destination | Natural anchor example |
| --- | --- | --- |
| Programs education entry | Supply-drive guide | Plan a school supply drive |
| Get Involved | Volunteering preparation guide | Questions to ask before volunteering |
| Partnership guide | Actual partner page, when ready | Explore a partnership with Agape |
| Mentor comparison | Program-selection guide | Questions for choosing a mentoring program |
| Resource guide | Programs hub | Learn about our program areas |
| Volunteer role page | Approved application route | Ask about this volunteer role |

Use descriptive language that fits the sentence. Exact-match anchors everywhere are unnecessary. Add reciprocal links when they help the reader, not solely to create a link pattern.

## Preventing thin and overlapping pages

- The checklist starts as an HTML section and printable asset on the supply-drive guide.
- Do not create separate pages for pencils, backpacks, and notebooks before there is a distinct supported task.
- Do not publish a city page that differs only in place names.
- Do not publish a service page with only a mission paragraph and a contact button.
- Resource summaries should explain what the reader can do, rather than repeat the same generic foundation introduction on every article.
- Keep one selected canonical destination for each substantive task.

## Images and page presentation

Use supplied photographs only with appropriate permission. New editorial imagery should show the tool or process where useful. A blank worksheet, a planning diagram, or a photographed collection setup can be more relevant than a generic smiling-children stock photo. Never portray an illustrative or AI-generated person as a real participant.

Alt text should describe the image's purpose. It is not another keyword field. Charts and checklists need readable HTML equivalents, and resources should work on a small phone without a download or login.

## Readiness check for every URL

Before a new page enters the navigation or sitemap, confirm unique purpose, useful content, accurate availability, approved facts, an owner, a review date, a working reader task, unique metadata, a self-consistent canonical, and at least two meaningful internal discovery routes. The number of internal links is an editorial handoff check, not a ranking formula.
