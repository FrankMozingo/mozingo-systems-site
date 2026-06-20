# Cloudflare Runbook

## Verified baseline

Inspection and controlled configuration on 2026-06-19 confirmed:

- `mozingosystems.com` is an active Cloudflare zone on the Free Website plan.
- Authoritative nameservers are `maleah.ns.cloudflare.com` and `thomas.ns.cloudflare.com`.
- The apex is proxied through a Cloudflare-managed Worker record.
- The apex, `robots.txt`, `sitemap.xml`, and legacy redirect were reachable over HTTPS.
- `www.mozingosystems.com` is attached as a Workers custom domain and permanently redirects to the canonical apex in one hop, preserving path and query.
- Cloudflare Email Routing MX, SPF, and DKIM records are present.
- Bot Fight Mode, AI bot protection, content bot protection, and crawler protection were disabled.
- Cloudflare-managed `robots.txt` was disabled; the repository's `robots.txt` is authoritative.
- SSL/TLS mode is Full (strict), minimum TLS is 1.2, and Always Use HTTPS plus Automatic HTTPS Rewrites are enabled.
- TLS 1.3, HTTP/3, Brotli, Medium security level, and Browser Integrity Check are enabled.
- Aggressive bot controls remain disabled pending a specific policy and contact/search-crawler test plan.
- The production Worker is `mozingo-systems-site`; GitHub `main` deploys production and branches receive previews.
- The scoped connector credential is identified as `mozingo-operations`; its secret is stored outside the repository.
- Search Console's DNS ownership TXT record is production configuration and must be preserved.
- mox-consulting.com is retained as a redirect-only legacy domain. Its Email Routing and Search Console DNS records remain production configuration and must be preserved.

Workers project settings and deployment history were confirmed in the Cloudflare dashboard. Repository changes continue through protected GitHub pull requests and Cloudflare Workers Builds.

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

The `www` hostname is attached to the same Worker and a zone-level Single Redirect named `Mozingo canonical redirects` sends it to the apex. Do not replace this with a second deployment or an origin record.

### Legacy-domain redirect map

Cloudflare has four active Single Redirects on mox-consulting.com, evaluated in this order:

1. /contact -> https://mozingosystems.com/contact
2. /about -> https://mozingosystems.com/about
3. /automation-consulting, /operations-audit, /locations/raleigh, and /tools/savings-calculator -> https://mozingosystems.com/operations-improvement
4. All remaining requests -> https://mozingosystems.com/

All redirects use status 301 and preserve query strings. Keep the catch-all last because redirect processing stops at the first matching redirect. This map passed seven clean-browser production checks on 2026-06-20.

Do not create a second deployment pipeline in GitHub Actions while Cloudflare Git integration owns deployment. GitHub Actions validates; Cloudflare deploys.

The repository includes `wrangler.jsonc` so both production and preview deploy commands use the same explicit Workers Static Assets configuration. Do not remove it or point assets at the repository root; the prior auto-detected configuration uploaded repository internals.

## DNS and email guardrails

- Preserve Email Routing MX, SPF, and DKIM records during website changes.
- Treat root and `www` changes as production changes.
- Record current values and TTL before editing.
- Avoid exposing origin addresses when Cloudflare proxying is part of the design.
- Verify email routing after any broad DNS import or zone migration.

## Security baseline

The verified production decisions are:

- Always Use HTTPS: enabled
- Automatic HTTPS Rewrites: enabled
- SSL/TLS encryption mode: Full (strict)
- Minimum TLS version: 1.2
- Bot Fight Mode, AI crawler protection, and content-bot controls: disabled
- Security level: Medium; Browser Integrity Check enabled
- TLS 1.3, HTTP/3, and Brotli: enabled
- Cache rules: no custom rule is required for the current static Worker; re-evaluate if asset versioning or dynamic HTML is introduced

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

For the mox-consulting.com consolidation, disable or delete the four Single Redirects to restore the legacy Worker response. Do not change MX, SPF, DKIM, Search Console verification, or the Cloudflare-managed Worker DNS record as part of that rollback.

The first production drill was completed on 2026-06-19: version `f4c966b2` was rolled back to `f3f02dca`, the older HTML/CSP signature was verified at HTTP 200, and `f4c966b2` was promoted back to 100% with its current CSP and asset signature verified at HTTP 200.
