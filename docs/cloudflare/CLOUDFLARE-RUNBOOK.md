# Cloudflare Runbook

## Verified baseline

Read-only inspection on 2026-06-18 confirmed:

- `mozingosystems.com` is an active Cloudflare zone on the Free Website plan.
- Authoritative nameservers are `maleah.ns.cloudflare.com` and `thomas.ns.cloudflare.com`.
- The apex is proxied through a Cloudflare-managed Worker record.
- The apex, `robots.txt`, `sitemap.xml`, and legacy redirect were reachable over HTTPS.
- `www.mozingosystems.com` did not resolve and needs an explicit DNS and redirect decision.
- Cloudflare Email Routing MX, SPF, and DKIM records are present.
- Bot Fight Mode, AI bot protection, content bot protection, and crawler protection were disabled.
- Cloudflare-managed `robots.txt` was disabled; the repository's `robots.txt` is authoritative.

The connector did not expose the Cloudflare Pages or Workers project settings. Confirm the Git repository, production branch, preview behavior, and deployment history in the Cloudflare dashboard before marking them operational.

## Safe inspection order

1. Discover the current Cloudflare tools and schemas.
2. Confirm the active account and `mozingosystems.com` zone.
3. Read the current DNS, project, custom-domain, SSL, redirect, cache, and security state.
4. Compare observed values with this runbook and `docs/OPERATIONS.md`.
5. Propose the smallest change and define rollback before writing.
6. Apply one logical change.
7. Verify externally and update this runbook if the intended baseline changed.

## Deployment settings to confirm

- Repository: `FrankMozingo/mozingo-systems-site`
- Production branch: `main`
- Framework preset: none or static HTML
- Build command: none
- Deploy command: `npx wrangler deploy` for production and `npx wrangler versions upload` for previews
- Static assets directory: `public`
- Preview deployments: enabled for pull requests or non-production branches
- Canonical domain: `https://mozingosystems.com`
- `www` behavior: redirect to the canonical apex unless business requirements change

The current `www` gap should be closed by attaching the hostname to the same Cloudflare project and issuing a permanent redirect to the canonical apex. Confirm the project type and current custom-domain controls before creating DNS manually.

Do not create a second deployment pipeline in GitHub Actions while Cloudflare Git integration owns deployment. GitHub Actions validates; Cloudflare deploys.

The repository includes `wrangler.jsonc` so both production and preview deploy commands use the same explicit Workers Static Assets configuration. Do not remove it or point assets at the repository root; the prior auto-detected configuration uploaded repository internals.

## DNS and email guardrails

- Preserve Email Routing MX, SPF, and DKIM records during website changes.
- Treat root and `www` changes as production changes.
- Record current values and TTL before editing.
- Avoid exposing origin addresses when Cloudflare proxying is part of the design.
- Verify email routing after any broad DNS import or zone migration.

## Security baseline to decide

The free plan can provide useful controls, but each control needs an explicit decision and a post-change test:

- Always Use HTTPS
- Automatic HTTPS Rewrites
- SSL/TLS encryption mode
- Minimum TLS version
- Bot Fight Mode
- AI crawler and content-bot policy
- Security level and managed challenge behavior
- Cache rules for HTML versus immutable assets

Do not enable aggressive bot or challenge settings without testing the contact flow and legitimate crawlers.

## Production verification

- Apex and preferred `www` behavior
- Valid TLS certificate and no mixed content
- Home, contact, and one service page return 200
- Legacy URLs return the intended permanent redirect
- `robots.txt` and `sitemap.xml` are reachable
- Form submission reaches the monitored destination

## Emergency rollback

Use the last known-good Cloudflare deployment for immediate recovery, then revert the responsible Git commit so production and source control converge. DNS rollbacks must restore exact prior values; do not improvise replacement records during an outage.
