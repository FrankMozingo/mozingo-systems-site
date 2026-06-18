# Mozingo Systems Operational Process

This is the controlling process for website delivery, maintenance, SEO, Cloudflare, and incident response. Use `docs/OPERATOR-GUIDE.md` for the ordered setup walkthrough and `docs/OPERATIONAL-STATUS.md` for current progress.

## Definition of 100% operational

The environment is operational only when every row in `docs/OPERATIONAL-STATUS.md` is `VERIFIED`. Implemented files, configured settings, and passing local tests are intermediate evidence; end-to-end verification is required when it is possible.

GPT-5.4 mini should shepherd routine setup and maintenance through `docs/OPERATOR-GUIDE.md`. It must route production-risk, ambiguous, destructive, or security-sensitive work to GPT-5.5 using the documented handoff packet.

## Local plugin installation

When the Codex CLI is available, run these commands from the repository root:

```powershell
codex plugin marketplace add .
codex plugin add mozingo-systems@mozingo-systems
```

Start a new Codex thread after installation so the skills and Rube MCP configuration are loaded. Authenticate external services through the MCP connection; never add tokens to this repository.

## Change process

1. Write the intended business outcome and affected pages.
2. If the change is editorial, update `docs/content/SITE-SOURCE.md` first so the site has a current source of truth.
3. Create a branch using `codex/<short-purpose>` or another documented team convention.
4. Read `AGENTS.md` and the relevant business, SEO, or Cloudflare runbook.
5. Make the smallest coherent change.
6. Run `npm run check`.
7. Run `npm run dev` and inspect changed behavior at desktop and mobile widths.
8. Open a pull request and complete the release-risk section.
9. Require the `Validate site` check to pass.
10. Merge to `main`; Cloudflare performs continuous delivery from Git.
11. Verify the production URL, navigation, contact path, canonical URL, and any changed redirect.
12. If verification fails, roll back immediately rather than stacking unverified fixes.

## Release gates

Every release must satisfy these gates:

- Scope: the change has an explicit outcome and owner.
- Content: claims match the business identity and can be supported.
- Technical: automated validation passes.
- Visual: changed pages work at narrow and wide widths.
- Search: title, description, canonical, internal links, sitemap, and redirects remain coherent.
- Security: no secrets or sensitive customer data are committed.
- Operations: rollback is the previous known-good commit or Cloudflare deployment.

## Rollback

1. Identify the last known-good commit and deployment.
2. Prefer a Git revert so history remains auditable.
3. Merge the revert through the normal validation path when the site is available.
4. For an active outage, use Cloudflare's rollback mechanism first, then reconcile Git immediately.
5. Verify the home page, contact page, form path, TLS, and redirects.
6. Record cause, impact, resolution, and a prevention action in the pull request or issue.

## Continuous operations cadence

### Weekly

- Review failed GitHub or Cloudflare deployments.
- Test the home-to-contact conversion path.
- Check Search Console for coverage, enhancement, or manual-action alerts.

### Monthly

- Run a live crawl and compare it with `npm run check`.
- Review search queries, impressions, clicks, and landing pages.
- Check broken external links, form delivery, and redirect behavior.
- Review Cloudflare analytics, security events, and bot traffic.
- Patch operating docs when the actual environment differs.

### Quarterly

- Review every public page against current offers and business priorities.
- Run accessibility, mobile, and performance audits.
- Review DNS, SSL, users, API tokens, integrations, and least privilege.
- Exercise one rollback and one contact-form recovery procedure.
- Archive obsolete pages only after redirects and search impact are accounted for.

## Content updates

When Mozingo Systems changes offers, homepage language, or page structure, update the source-of-truth document in `docs/content/SITE-CONTENT.json` in the same pull request. Use `docs/content/CONTENT-WORKFLOW.md` to interpret the document into page edits. The website should be treated as a rendering of the current content brief, not a collection of one-off edits.

## Incident severity

- SEV-1: site unavailable, TLS failure, malicious content, or domain control issue. Roll back or contain immediately.
- SEV-2: contact form failure, broken primary navigation, or major page regression. Resolve the same business day.
- SEV-3: isolated content, styling, analytics, or SEO issue. Schedule through the normal change process.

## Ownership

- Business truth and final claims: Frank Mozingo
- Website implementation and CI: site operator
- Search strategy and measurement: SEO operator
- DNS, TLS, deployment, and edge security: Cloudflare operator
- Credentials and recovery methods: account owner; never the repository

## Current maturity target

Repository controls are implemented locally but are not yet committed, pushed, or proven in GitHub CI. The remaining path includes source-control rollout, branch protection, plugin installation, Cloudflare project settings, canonical `www` behavior, form delivery, Search Console, live quality audits, and a tested rollback. Follow the operator guide in order and update the status ledger after each verified outcome.
