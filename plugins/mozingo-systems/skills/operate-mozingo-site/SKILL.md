---
name: operate-mozingo-site
description: Maintain, operationalize, and release the Mozingo Systems static website. Use for setup shepherding, readiness tracking, changes to HTML, CSS, navigation, forms, assets, redirects, sitemap entries, business content, local validation, or GitHub-to-Cloudflare release preparation in this repository.
---

# Operate the Mozingo Systems Site

1. Read `AGENTS.md`, `docs/brand/business-identity.md`, and the relevant page before editing.
2. For operational-readiness work, read `docs/OPERATOR-GUIDE.md` and `docs/OPERATIONAL-STATUS.md`, advance one item at a time, and follow their GPT-5.5 escalation rules.
3. Preserve the static, dependency-free architecture unless the user explicitly approves a platform change.
4. Treat `index.html`, `ai-services.html`, `blueprint.html`, `improvement-projects.html`, `partnership.html`, `about.html`, and `contact.html` as the public page set.
5. Update shared navigation consistently across public pages.
6. Update `_redirects`, `sitemap.xml`, and canonical URLs together when routes change.
7. Keep credentials and account identifiers out of the repository.
8. Run `npm run check` after every site change.
9. Preview with `npm run dev` for visual or interaction changes.
10. Follow `docs/OPERATIONS.md` for release, rollback, and maintenance work.

For copy changes, use the direct, practical, evidence-based voice in the business identity. Do not invent testimonials, customer results, credentials, prices, or guarantees.
