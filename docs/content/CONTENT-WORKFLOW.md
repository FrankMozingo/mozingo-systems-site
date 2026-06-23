# Content Workflow

Use this workflow when a change needs to become a site update.

## Goal

Turn a plain-language change request into a controlled website update without losing the approved structure.

## Stack

- Astro (static output)
- Cloudflare Pages from GitHub
- `docs/content/SITE-CONTENT.json` is the editing interface for service pages
- Markdown files in `src/content/blog/` are the editing interface for blog posts

## Workflow

1. Edit `docs/content/SITE-CONTENT.json`.
2. Read the diff as a content brief, not as code.
3. Translate the changes into the corresponding `.astro` page in `src/pages/`.
4. Keep the homepage aligned to the two primary paths: AI Products and Operations Improvement.
5. Update `public/_redirects` if any route changes.
6. Sitemap output is generated during build; confirm the generated sitemap stays coherent.
7. Run validation and inspect the pages before merge.
8. If the change affects offer names or positioning, update `docs/brand/business-identity.md` and `docs/content/SITE-SOURCE.md` at the same time.

## Blog workflow

1. Copy `src/content/blog/_TEMPLATE.md`.
2. Rename it to the target slug in kebab-case.
3. Fill in frontmatter and markdown content.
4. Keep `draft: true` until the post and any matching video are ready to publish.
5. Set `draft: false`, run validation, and verify the generated route.

## Interpretation rules

- Preserve the business meaning of the source document.
- Do not add new claims that are not in the source.
- Do not remove necessary navigation or contact paths.
- If the source is ambiguous, stop and ask for clarification before shipping a guess.
- Keep the founder image secondary unless the source explicitly says otherwise.

## Review rule

- The JSON file is the editing interface.
- The Astro pages are the published output.
- A change is complete only when both match.
