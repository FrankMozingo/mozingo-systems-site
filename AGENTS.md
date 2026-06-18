# Mozingo Systems Agent Instructions

This repository is the operating workspace for Mozingo Systems' public website and digital presence.

## Read first

1. Read `docs/brand/business-identity.md` for company truth, voice, and visual identity.
2. Read `docs/OPERATIONS.md` before release, maintenance, or incident work.
3. For setup shepherding, read `docs/OPERATOR-GUIDE.md` and `docs/OPERATIONAL-STATUS.md`.
4. Read the relevant SEO or Cloudflare runbook before external operations.

## Setup shepherd mode

- Default to GPT-5.4 mini for routine evidence collection, documented commands, dashboard guidance, small reversible edits, and verification.
- Give the user one bounded action at a time with purpose, exact steps, expected result, and required evidence.
- Do not mark an operational item complete from configuration alone when an end-to-end test is possible.
- Update `docs/OPERATIONAL-STATUS.md` only after re-checking evidence.
- Follow the model-routing and handoff rules in `docs/OPERATOR-GUIDE.md`.
- Tell the user to switch to GPT-5.5 before DNS, SSL/TLS, email routing, domain ownership, production security, architectural, destructive, incident-response, or repeatedly blocked work.
- After GPT-5.5 resolves the risky step, route routine verification and status maintenance back to GPT-5.4 mini.

## Architecture

- Keep the production site static HTML and CSS unless the user explicitly approves an architectural change.
- Keep shared layout and visual changes in `public/styles.css`.
- Use `/assets/Logo.png` for the favicon and header logo.
- Use `/assets/frank-mozingo.jpg` for the founder photo.
- Treat `public/` as the complete deployable site. Do not put operational documentation, credentials, plugin files, or repository internals inside it.

## Public pages

- `public/index.html`
- `public/ai-services.html`
- `public/blueprint.html`
- `public/improvement-projects.html`
- `public/partnership.html`
- `public/about.html`
- `public/contact.html`

The older service pages are retained only for redirect compatibility and historical source. Do not add them to navigation or the sitemap.

## Change rules

- Preserve semantic HTML, keyboard access, useful alt text, and mobile behavior.
- Update navigation consistently across public pages.
- Update `public/_redirects`, `public/sitemap.xml`, and canonical URLs together when routes change.
- Keep the Formspree contact action unless the user requests a new intake flow.
- Do not invent claims, testimonials, client names, prices, results, credentials, or locations.
- Do not commit tokens, credentials, account IDs, customer data, auth links, or private dashboard exports.
- Run `npm run check` after every website change.
- Use `npm run dev` for visual and interaction verification.

## External systems

- Discover current tool schemas before calling Cloudflare, Search Console, Ahrefs, SEMrush, Firecrawl, or other external services.
- Inspect current production state before changing it.
- Define rollback before DNS, TLS, deployment, redirect, cache, or security changes.
- Preserve Cloudflare Email Routing records during website operations.
- Record durable operating changes in the relevant runbook without recording secrets.

## Completion

A change is complete only when implementation, validation, relevant documentation, and production verification are addressed. Clearly distinguish local, remote, deployed, and verified states. For operational-readiness work, completion means the matching status-ledger row is `VERIFIED` with dated evidence.
