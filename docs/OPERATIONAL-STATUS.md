# Operational Status

Last reviewed: 2026-06-20

This ledger is the cross-thread source of truth. Update it only after checking current evidence.

## States

- `VERIFIED`: objective evidence confirms the outcome.
- `READY`: implementation exists, but external activation or verification remains.
- `IN_PROGRESS`: work has started and the next action is known.
- `BLOCKED`: a specific dependency prevents progress.
- `FAILED`: a test proves the outcome is not working.

## Readiness ledger

| ID | Outcome | State | Current evidence or next action |
| --- | --- | --- | --- |
| L1 | Local website validation passes | VERIFIED | `npm run check` passed against the current release and operations documentation on 2026-06-19. |
| L2 | Local preview serves pages and redirects | VERIFIED | Home and contact returned `200`; legacy route returned `301` on 2026-06-18. |
| G1 | Operations workspace committed and pushed on a branch | VERIFIED | Branch `codex/operations-workspace` was pushed and pull request #2 was opened on 2026-06-18. |
| G2 | Pull request passes `Validate site` CI and is merged | VERIFIED | PR #2 merged on 2026-06-18 after GitHub `validate` and Cloudflare Workers preview passed; production checks then passed on `main`. |
| G3 | `main` requires pull requests and passing CI | VERIFIED | Protection enabled on 2026-06-18: pull requests, strict `validate` and Workers Builds checks, linear history, resolved conversations, no force pushes, and no deletion. |
| P1 | Mozingo Systems plugin installed and skills discoverable | VERIFIED | Marketplace and `mozingo-systems` plugin installed and enabled; all three skills are present in the installed plugin cache. Start a new thread to load them. |
| C1 | Cloudflare project type and Git deployment settings recorded | VERIFIED | GitHub checks and build logs confirm Workers Builds project `mozingo-systems-site`, GitHub integration, production from `main`, `wrangler deploy`, and preview `wrangler versions upload`. |
| C2 | Production deploys from `main` and previews are enabled | VERIFIED | Preview and post-merge production Workers Builds passed with `wrangler.jsonc` targeting only `public/`; live site and logo returned `200`. |
| C3 | Apex is canonical and `www` permanently redirects to it | VERIFIED | Apex returned `200`; HTTP and HTTPS `www` requests returned a one-hop `301` to the apex while preserving path and query on 2026-06-19. DNS and TLS provisioned successfully. |
| C4 | TLS, HTTPS, cache, bot, and security decisions verified | VERIFIED | SSL mode Full (strict), minimum TLS 1.2, Always Use HTTPS, Automatic HTTPS Rewrites, TLS 1.3, HTTP/3, Brotli, Medium security, Browser Integrity Check, and production response headers were verified on 2026-06-19. Aggressive bot controls remain intentionally disabled. |
| C5 | Legacy MOX Consulting domain consolidates into Mozingo Systems | VERIFIED | Four active Cloudflare Single Redirects permanently send mox-consulting.com to mozingosystems.com; contact, about, four legacy service/location/tool paths, query preservation, and the homepage fallback passed seven clean-browser production tests on 2026-06-20. Email Routing DNS records were unchanged. |
| F1 | Production contact form reaches monitored inbox | VERIFIED | Formspree accepted an operational test and delivered it to the connected Gmail inbox on 2026-06-18. |
| S1 | Search Console property is verified and sitemap accepted | VERIFIED | Domain property `sc-domain:mozingosystems.com` is owned; sitemap accepted 5 URLs with 0 errors and 0 warnings. Home is indexed with matching user and Google canonicals; `/ai-products` is discovered and awaiting normal indexing as of 2026-06-19. |
| Q1 | Mobile, desktop, accessibility, and performance baseline recorded | VERIFIED | After PR #10, three Lighthouse 13.4.0 mobile runs per page scored 99-100 with 1.88-2.01 s home LCP and 1.76-2.02 s contact LCP; CLS and TBT remained 0. Issue #8 is closed. |
| R1 | A production rollback drill is completed and documented | VERIFIED | On 2026-06-19 GPT-5.5 rolled Cloudflare Worker `f4c966b2` back to `f3f02dca`, verified the prior production signature at HTTP 200, restored `f4c966b2`, and verified the current CSP and asset signature at HTTP 200. |
| O1 | Weekly and monthly operating cadence has begun | VERIFIED | First weekly review completed 2026-06-19; next monthly review is scheduled in the operating record for 2026-07-19. |

## Update format

When changing a row, add concise evidence in the table and append an entry here:

```text
YYYY-MM-DD - <ID> - <old state> -> <new state> - <evidence or blocker>
```

## History

- 2026-06-18 - L1 - READY -> VERIFIED - Local validator passed.
- 2026-06-18 - L2 - READY -> VERIFIED - Local server and redirect smoke tests passed.
- 2026-06-18 - C3 - READY -> FAILED - Apex worked but `www` did not resolve.
- 2026-06-18 - G1 - READY -> VERIFIED - Feature branch pushed and pull request #2 opened.
- 2026-06-18 - G2 - READY -> IN_PROGRESS - GitHub validation passed; Cloudflare preview configuration fix required.
- 2026-06-18 - C1 - READY -> VERIFIED - Workers Builds deployment settings confirmed from GitHub and Cloudflare build evidence.
- 2026-06-18 - C2 - READY -> IN_PROGRESS - Explicit `public/` assets deployment added after preview failure.
- 2026-06-18 - G3 - READY -> VERIFIED - `main` protection enabled and verified through GitHub API.
- 2026-06-18 - C2 - IN_PROGRESS -> IN_PROGRESS - Cloudflare preview passed after explicit Wrangler configuration.
- 2026-06-18 - G2 - IN_PROGRESS -> VERIFIED - PR #2 merged and both post-merge checks passed on `main`.
- 2026-06-18 - P1 - READY -> VERIFIED - Repo marketplace and Mozingo plugin installed and enabled.
- 2026-06-18 - C2 - IN_PROGRESS -> VERIFIED - Preview, production deployment, live site, and public asset isolation verified.
- 2026-06-18 - F1 - READY -> VERIFIED - Formspree test delivered to Gmail.
- 2026-06-18 - S1 - READY -> BLOCKED - Property added but domain ownership verification remains; SEO work intentionally paused for redesign.
- 2026-06-19 - C3 - FAILED -> VERIFIED - Cloudflare custom domain and canonical redirect were added; HTTP and HTTPS `www` tests passed in one hop with path and query preserved.
- 2026-06-19 - C4 - READY -> VERIFIED - HTTPS, strict origin validation, TLS 1.2 minimum, transport, compression, browser integrity, and response security controls were verified in production.
- 2026-06-19 - S1 - BLOCKED -> VERIFIED - Search Console domain ownership was verified through Cloudflare and the sitemap was accepted without errors or warnings.
- 2026-06-19 - Q1 - READY -> VERIFIED - Production responsive, accessibility, and performance baseline was recorded; non-blocking mobile LCP work is tracked in issue #8.
- 2026-06-19 - R1 - READY -> VERIFIED - Worker rollback from `f4c966b2` to `f3f02dca` and restoration to `f4c966b2` were exercised and externally verified.
- 2026-06-19 - O1 - READY -> VERIFIED - First weekly review completed and the next monthly review date was recorded.
- 2026-06-19 - Q1 - VERIFIED -> VERIFIED - PR #10 restored the homepage logo and reduced critical-path weight; repeated production mobile Lighthouse runs scored 99-100 with LCP at or below 2.02 s.
- 2026-06-20 - C5 - READY -> VERIFIED - Deployed and externally verified the old-domain redirect map; all seven production tests passed and MX, SPF, DKIM, Search Console verification, and Worker DNS records remained unchanged.
