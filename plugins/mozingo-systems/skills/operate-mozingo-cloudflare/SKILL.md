---
name: operate-mozingo-cloudflare
description: Audit and operate the Mozingo Systems Cloudflare environment safely. Use for mozingosystems.com DNS, Cloudflare Pages or Workers deployments, custom domains, SSL, caching, redirects, security settings, bot controls, analytics, incidents, or production rollback.
---

# Operate Mozingo Cloudflare

1. Read `docs/cloudflare/CLOUDFLARE-RUNBOOK.md` and `docs/OPERATIONS.md`.
2. Discover current Cloudflare tool schemas before every external workflow; never invent tool names or arguments.
3. Confirm the target account, zone, hostname, and current value before proposing a change.
4. Prefer read-only inspection first and capture enough state to roll back.
5. Treat DNS, SSL, deployment, redirect, and security changes as production changes.
6. Never commit API tokens, account IDs, zone IDs, auth links, or copied dashboard exports containing sensitive data.
7. Make one logical production change at a time, then verify the public URL, TLS, redirects, and critical pages.
8. Preserve Cloudflare Email Routing records unless the user explicitly requests an email change.
9. Record confirmed configuration changes in the runbook without recording secrets.

The repository's Rube MCP entry provides the integration surface. Authentication remains user-scoped and must be completed outside version control.
