# Publishing system and measurement: current implementation

Work date: 20 October 2026. The user explicitly replaced the original code-only article system with **Payload CMS**. That earlier implementation was never deployed. Its route generator, TypeScript article catalog, and fixture preview harness were removed.

## Retained and integrated

- Published-only article listing and sitemap, titles/descriptions/canonicals, Article and Breadcrumb structured data.
- Responsive article presentation, actual authorship, sources, related posts, and a publication approval check.
- Printable worksheets, now editable through Payload's native Blocks fields. Visitor entries remain private page memory.
- The measurement event specification and superadmin handoff, with no analytics installed.

## Added through Payload

Pages, Posts, Media, Users, native rich text and editable section blocks, drafts/autosave, revisions, and authenticated previews. No custom Elementor-style editor was built. The user can write and publish through `/admin` without editing code.

The eight existing designed pages remain fallback templates. Existing public copy was imported into eight simpler CMS drafts. The user subsequently required the existing design to stay unchanged. These drafts are interim content sources and must remain unpublished; connecting native CMS fields to the original designed components and comparing desktop/mobile output remain pending under R26.

See [CMS implementation and verification](../../../docs/cms-implementation.md), [editor instructions](../../../docs/cms-editor-guide.md), and [measurement specification](../../measurement/event-specification.md). Earlier 23-test static-export evidence does not describe the current CMS implementation.

## Release boundaries

No genuine article was published, no production content was changed, and no push/deploy or external setup occurred. Temporary local test records are removed after testing. D1, R2, production secret, first administrator, and recovery email are superadmin follow-ups under A11 / R24-R26. Contact delivery and donation checkout remain deferred. All search metrics remain unknown.
