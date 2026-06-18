# Mozingo Systems Operator Guide

Use this guide to take the workspace from its current local state to verified operation. GPT-5.4 mini is the default shepherd for routine steps. It must tell Frank when a step should move to GPT-5.5.

## Start a GPT-5.4 mini thread

Open this repository in Codex, select `gpt-5.4-mini`, and send:

```text
Read AGENTS.md, docs/OPERATOR-GUIDE.md, docs/OPERATIONAL-STATUS.md, and docs/OPERATIONS.md. Act as my Mozingo Systems setup shepherd. Start with the first item that is not VERIFIED. Give me one action at a time, explain where to click or what command to run, state the expected result, wait for my evidence, and update docs/OPERATIONAL-STATUS.md only after verification. Tell me to switch to GPT-5.5 when the model-routing rules require it.
```

## Shepherd protocol

The active model must:

1. Read the status ledger before taking action.
2. Re-check local or external state instead of trusting stale notes.
3. Select the lowest-numbered item that is not `VERIFIED`, unless a dependency blocks it.
4. Give Frank one bounded action at a time.
5. Include the purpose, exact action, expected result, and evidence needed.
6. Wait for the result or screenshot before advancing.
7. Mark an item `VERIFIED` only when objective evidence exists.
8. Record the date and concise evidence in `docs/OPERATIONAL-STATUS.md`.
9. Stop before production writes unless the user authorized that exact change.
10. Use the escalation policy below instead of struggling repeatedly.

Do not dump the full checklist on Frank during a shepherding session. Keep the whole plan in the repository and present only the current step plus the next expected decision.

## Model routing

OpenAI currently recommends GPT-5.5 for most Codex work and describes GPT-5.4 mini as the faster, lower-cost choice for lighter coding tasks and subagents. This workspace intentionally uses mini for routine shepherding and escalates work that needs stronger reasoning or safer production execution. See the official [Codex model guidance](https://developers.openai.com/codex/models) and [GPT-5.5 guidance](https://developers.openai.com/api/docs/guides/latest-model.md).

### Keep using GPT-5.4 mini

- Read files, inspect status, and collect evidence.
- Run documented validation commands.
- Explain a dashboard path or a single setting.
- Make small, reversible HTML, CSS, metadata, or documentation edits.
- Prepare branches, commits, pull requests, and status updates.
- Run read-only Cloudflare, GitHub, Search Console, or crawl audits.
- Verify URLs, redirects, forms, CI results, and deployment status.
- Carry out a procedure whose choices and rollback are already documented.

### Switch to GPT-5.5 before proceeding

- Creating or changing DNS, nameservers, SSL mode, TLS policy, email-routing records, domain ownership, or production security rules.
- Responding to an active outage, compromise, credential exposure, malicious content, or domain-control incident.
- Changing deployment ownership, production architecture, frameworks, hosting strategy, forms provider, or data handling.
- Diagnosing a failure that spans two or more external systems and has conflicting evidence.
- Designing a major SEO information architecture, content strategy, structured-data system, or migration.
- Performing a production rollback drill or any broad/destructive operation.
- Making legal, privacy, compliance, or high-impact business-claim decisions.
- Continuing after mini has made two unsuccessful attempts against the same blocker.
- Reviewing a large, ambiguous change where the safe boundary or success criteria are unclear.

Do not escalate merely to run `npm run check`, inspect a screenshot, update the status ledger, fix a broken link, or follow a known dashboard path.

### Required escalation message

Mini must say:

```text
Switch to GPT-5.5 for this step. Reason: <specific risk or complexity>. I have not made the production change. Paste the handoff below into the GPT-5.5 thread, then return to GPT-5.4 mini for routine verification after the step is complete.
```

It must then provide this handoff packet:

```text
Goal:
Current status item:
Verified current state:
Evidence collected:
Attempts already made:
Proposed action:
Expected result:
Rollback plan:
Files or dashboards involved:
Decision needed from Frank:
```

## Ordered path to operation

### 1. Put this workspace on a feature branch

Use mini. The current working tree is on `main` with uncommitted website and operations changes.

Ask mini to:

1. Run `npm run check` and `git diff --check`.
2. Create `codex/operations-workspace` from the current state.
3. Review `git status` and the full diff for secrets or unintended files.
4. Commit the workspace with a focused message.
5. Push the branch to `origin`.

Evidence: pushed branch URL or `git status` plus remote branch confirmation.

### 2. Open a pull request and prove CI

Use mini.

1. Open a pull request from `codex/operations-workspace` to `main`.
2. Confirm the `Validate site` GitHub Actions job starts.
3. Fix any CI-only failure through the branch.
4. Confirm the check passes before merge.

Evidence: pull request URL and passing `Validate site` check.

### 3. Protect `main`

Use mini to guide the dashboard steps.

1. In GitHub, open repository **Settings** and then **Rules** or **Branches**.
2. Create a ruleset targeting `main`.
3. Require a pull request before merge.
4. Require the `Validate site` status check.
5. Block force pushes and branch deletion.
6. Save and confirm the ruleset is active.

Evidence: screenshot or copied ruleset summary with no sensitive data.

### 4. Install and verify the Mozingo plugin

Use mini.

1. Open the repo-local plugin from `.agents/plugins/marketplace.json` in the Codex app, or run the documented CLI commands when the CLI is available.
2. Install `mozingo-systems`.
3. Complete Rube authentication only through the Codex or MCP authentication flow.
4. Start a new thread.
5. Confirm `operate-mozingo-site`, `audit-mozingo-seo`, and `operate-mozingo-cloudflare` are discoverable.

Evidence: plugin shown as installed and the three skills visible in a new thread.

### 5. Inventory the Cloudflare deployment

Use mini for read-only inspection.

1. Identify whether the site is deployed through Pages, Workers, or Workers Builds.
2. Record the project name, linked repository, production branch, build command, output directory, custom domains, and preview behavior.
3. Confirm `main` is the production branch and GitHub remains the source of truth.
4. Confirm a deployment from the merged pull request succeeds.

Evidence: non-sensitive project summary and successful deployment URL or ID.

### 6. Fix the canonical `www` behavior

Switch to GPT-5.5 before making the DNS or custom-domain change.

1. Attach `www.mozingosystems.com` to the existing Cloudflare project using the project's custom-domain flow.
2. Configure a permanent redirect from `www` to `https://mozingosystems.com`.
3. Avoid manually inventing DNS records when Cloudflare can manage the project binding.
4. Verify the apex returns `200` and `www` redirects permanently to the apex.

Evidence: DNS resolution, valid TLS, and final redirect URL.

### 7. Confirm TLS and security settings

Use mini for read-only inspection. Switch to GPT-5.5 before changing SSL mode, TLS policy, bot controls, challenge behavior, or production security rules.

Confirm and record:

- Always Use HTTPS
- Automatic HTTPS Rewrites
- SSL/TLS encryption mode
- Minimum TLS version
- Bot Fight Mode decision
- AI crawler and content-bot policy
- Security level and challenge behavior
- Cache behavior for HTML and assets

Evidence: dated, non-sensitive setting summary plus successful public verification.

### 8. Prove the contact path

Use mini.

1. Submit a clearly labeled test through the production contact form.
2. Confirm Formspree accepts the request.
3. Confirm the message reaches the monitored business inbox and is not trapped in spam.
4. Confirm a reply can be sent to the test sender.

Evidence: test timestamp and delivery confirmation. Do not put message contents or personal data in Git.

### 9. Connect Google Search Console

Use mini to inspect and guide. Switch to GPT-5.5 if domain-property verification requires a DNS write.

1. Create or confirm the `mozingosystems.com` domain property.
2. Complete ownership verification.
3. Submit `https://mozingosystems.com/sitemap.xml`.
4. Inspect the home page and one service URL.
5. Confirm there are no manual actions or security alerts.

Evidence: verified property, accepted sitemap, and URL inspection result.

### 10. Establish the quality baseline

Use mini and `docs/templates/QUALITY-BASELINE.md`.

1. Test home, service, about, and contact pages at mobile and desktop widths.
2. Run accessibility checks.
3. Run performance checks against production.
4. Verify navigation, keyboard access, logo, form, redirects, robots, and sitemap.
5. Record findings and create focused follow-up issues for failures.

Evidence: dated baseline document with tools, URLs, scores, defects, and owners.

### 11. Exercise rollback

Switch to GPT-5.5 to design and supervise the first production rollback drill.

1. Choose a harmless, observable test change.
2. Define the known-good Git commit and Cloudflare deployment.
3. Deploy the test through the normal pull-request path.
4. Roll back using the documented Cloudflare or Git revert process.
5. Verify production and reconcile Git with the deployed state.

Evidence: commit IDs, deployment references, timestamps, verification, and lessons learned.

### 12. Begin continuous operations

Use mini for the weekly and monthly cadence in `docs/OPERATIONS.md`. Use GPT-5.5 for incidents, architectural changes, major strategy, or repeated ambiguous failures.

Evidence: first dated weekly review and scheduled monthly review.

## Completion rule

The environment is 100% operational only when every row in `docs/OPERATIONAL-STATUS.md` is `VERIFIED`. Files, configuration, or screenshots alone are not enough when an end-to-end test is possible.
