# Editing the Agape website

Payload is the website's CMS. Open `/admin` to sign in. It provides Pages, Posts, Media, and Users. No separate CMS subscription is required by this code; production hosting and storage still need to be arranged.

## Write an article

1. Open **Posts → Create New**.
2. Enter a title, URL name (slug), short introduction, and the actual author.
3. Under **Page sections**, add Text, Image, Call to action, Questions and answers, or Printable worksheet. Drag the section handles to reorder. These are Payload's native Blocks controls.
4. Save your work as a draft. Autosave preserves changes and Versions keeps up to 30 revisions.
5. Use **Preview** or **Live Preview** to inspect the saved draft at phone and desktop widths. Preview requires your CMS login. It is not a public sharing link.
6. Under **Search appearance**, optionally set a search title and description. Otherwise the title and introduction are used.
7. Confirm that the content and any images are approved, then choose **Publish changes**.

Published posts appear under `/resources`, in the navigation and sitemap. The resources listing stays hidden until the first post is published. Publishing does not need a code change or website rebuild. Saving a newer draft leaves the last published version visible. Use the document's action menu to unpublish it.

URL names are locked after creation to avoid silently breaking links. Ask the site administrator to arrange a redirect if a published address must change. A future publication date is rejected because scheduling has not been enabled.

## Edit or add a page

Open **Pages**. Eight starter drafts contain copy from the current Home, About, Programs, Values, Get Involved, Contact, Donate, and Privacy pages. These drafts have not been published.

The starter drafts are interim content sources in the CMS's section layout. **Do not publish them over the existing designed pages.** The user requires those pages to retain their current appearance. Connecting native Payload fields to the existing designed components and comparing desktop/mobile output remains pending under R26. Until that integration is complete, leave these eight drafts unpublished. The current route behavior would select a published matching CMS page; unpublishing restores the original page. New pages have no fallback and disappear when unpublished.

Use the URL name `home` for the homepage. For other pages, the URL is `/<slug>`. Newly created pages are included in the sitemap when published; link to them from an existing page using a text link or call-to-action section. The main navigation is still curated in the site code.

Contact and Donate CMS pages keep their functional contact form / giving panel automatically. The forms and payment connection remain setup-pending until the approved private configuration is supplied. Do not write copy that implies the connections already work.

## What the section editor can do

- Add, edit, reorder, duplicate, and remove the configured section types.
- Format rich text and add links.
- Upload public images or PDFs to Media, with an image description or file label.
- Add questions and answers, links, buttons, and printable worksheets.
- Preview saved edits beside the editing form using Payload's built-in preview tools.

This is Payload's native editing interface. It does not include an Elementor-style free-form canvas, inline click-to-edit, arbitrary styling controls, or a custom visual builder. Adding a new kind of section requires a developer to define its fields and frontend rendering. Existing section types are fully editable without code.

## Media and privacy

Media uploads are public files. Only upload assets approved for public use, never private participant records. JPEG, PNG, WebP, GIF, and PDF are allowed, up to 10 MB per file. SVG and HTML uploads are not enabled. Media is stored in Cloudflare R2; local development uses its local emulator.

Worksheet entries stay in the visitor's current page memory. They are not sent to Payload, saved in the database, or tracked. The Print button lets visitors print or save a PDF through their browser. Reloading or leaving the page clears the entries.

## Accounts

The first user created in an empty installation becomes the administrator automatically. Administrators can create editor accounts. Editors can work with pages, posts, and media; they cannot grant themselves admin rights or create other users. Administrators manage users and deletion.

CMS password-reset email delivery is not configured. It fails explicitly and does not print reset emails or tokens to logs. The superadmin must arrange an approved CMS email adapter or maintain a documented administrative recovery procedure before handing the site to a client. Contact-form email is a separate deferred configuration.

Production database, storage, account bootstrap, backups, and deployment are in [SUPERADMIN-SETUP.md](../SUPERADMIN-SETUP.md), A11. Production has not been changed by the CMS implementation.
