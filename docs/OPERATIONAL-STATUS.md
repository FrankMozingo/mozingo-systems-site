# Operational Status

Last reviewed: 2026-06-18

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
| L1 | Local website validation passes | VERIFIED | `npm run check` validated 7 public pages and 84 local references on 2026-06-18. |
| L2 | Local preview serves pages and redirects | VERIFIED | Home and contact returned `200`; legacy route returned `301` on 2026-06-18. |
| G1 | Operations workspace committed and pushed on a branch | VERIFIED | Branch `codex/operations-workspace` was pushed and pull request #2 was opened on 2026-06-18. |
| G2 | Pull request passes `Validate site` CI and is merged | VERIFIED | PR #2 merged on 2026-06-18 after GitHub `validate` and Cloudflare Workers preview passed; production checks then passed on `main`. |
| G3 | `main` requires pull requests and passing CI | VERIFIED | Protection enabled on 2026-06-18: pull requests, strict `validate` and Workers Builds checks, linear history, resolved conversations, no force pushes, and no deletion. |
| P1 | Mozingo Systems plugin installed and skills discoverable | VERIFIED | Marketplace and `mozingo-systems` plugin installed and enabled; all three skills are present in the installed plugin cache. Start a new thread to load them. |
| C1 | Cloudflare project type and Git deployment settings recorded | VERIFIED | GitHub checks and build logs confirm Workers Builds project `mozingo-systems-site`, GitHub integration, production from `main`, `wrangler deploy`, and preview `wrangler versions upload`. |
| C2 | Production deploys from `main` and previews are enabled | VERIFIED | Preview and post-merge production Workers Builds passed with `wrangler.jsonc` targeting only `public/`; live site and logo returned `200`. |
| C3 | Apex is canonical and `www` permanently redirects to it | FAILED | Apex returned `200`; `www.mozingosystems.com` did not resolve on 2026-06-18. |
| C4 | TLS, HTTPS, cache, bot, and security decisions verified | READY | Zone baseline is documented; dashboard settings still require confirmation. |
| F1 | Production contact form reaches monitored inbox | VERIFIED | Formspree accepted an operational test and delivered it to the connected Gmail inbox on 2026-06-18. |
| S1 | Search Console property is verified and sitemap accepted | BLOCKED | Domain property was added and the connection authorized, but ownership is unverified. Google DNS token retrieval requires an additional Site Verification scope or manual Search Console verification. Pause until the site redesign is settled. |
| Q1 | Mobile, desktop, accessibility, and performance baseline recorded | READY | Use `docs/templates/QUALITY-BASELINE.md`. |
| R1 | A production rollback drill is completed and documented | READY | No drill evidence recorded. Use GPT-5.5 for the first drill. |
| O1 | Weekly and monthly operating cadence has begun | READY | Start after core deployment, form, search, quality, and rollback controls are verified. |

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
