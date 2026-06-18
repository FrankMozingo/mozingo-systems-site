# Content Workflow

Use this workflow when an edited document needs to become a site change.

## Goal

Turn a plain-language change request into a controlled website update without losing the approved structure.

## Workflow

1. Edit `docs/content/SITE-CONTENT.json`.
2. Read the diff as a content brief, not as code.
3. Translate the changes into page-level edits.
4. Keep the homepage aligned to the two primary paths: AI products and Operations Improvement.
5. Update `public/_redirects` and `public/sitemap.xml` if any route changes.
6. Run validation and inspect the pages before merge.
7. If the change affects offer names or positioning, update `docs/brand/business-identity.md` and `docs/content/SITE-SOURCE.md` at the same time.

## Interpretation rules

- Preserve the business meaning of the source document.
- Do not add new claims that are not in the source.
- Do not remove necessary navigation or contact paths.
- If the source is ambiguous, stop and ask for clarification before shipping a guess.
- Keep the founder image secondary unless the source explicitly says otherwise.

## Review rule

- The JSON file is the editing interface.
- The HTML pages are the published output.
- A change is complete only when both match.
