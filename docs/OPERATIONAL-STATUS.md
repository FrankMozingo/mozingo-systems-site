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
| G1 | Operations workspace committed and pushed on a branch | READY | Working tree is still on `main` with uncommitted changes. Create and push `codex/operations-workspace`. |
| G2 | Pull request passes `Validate site` CI and is merged | READY | Workflow exists locally but has not run on GitHub. Complete after G1. |
| G3 | `main` requires pull requests and passing CI | READY | Configure after the workflow has produced a GitHub status check. |
| P1 | Mozingo Systems plugin installed and skills discoverable | READY | Plugin and three skills validate locally. Codex CLI execution was blocked from the Windows app terminal; install through the app or an available CLI. |
| C1 | Cloudflare project type and Git deployment settings recorded | READY | Zone is active, but project type and Git integration were not exposed by the connector. Inspect dashboard read-only. |
| C2 | Production deploys from `main` and previews are enabled | READY | Requires Cloudflare project inspection and a merged PR deployment. |
| C3 | Apex is canonical and `www` permanently redirects to it | FAILED | Apex returned `200`; `www.mozingosystems.com` did not resolve on 2026-06-18. |
| C4 | TLS, HTTPS, cache, bot, and security decisions verified | READY | Zone baseline is documented; dashboard settings still require confirmation. |
| F1 | Production contact form reaches monitored inbox | READY | Form action is configured, but delivery has not been tested end to end. |
| S1 | Search Console property is verified and sitemap accepted | READY | No Search Console evidence recorded. |
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
