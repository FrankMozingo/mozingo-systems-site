# Security Policy

## Scope

This repository contains a public static website and operating documentation. It must not contain credentials, private customer data, private form submissions, Cloudflare identifiers used for authentication, or recovery information.

## Reporting

Report a suspected vulnerability or account compromise privately to `info@mozingosystems.com`. Do not open a public issue containing exploit details, tokens, or personal data.

## Repository rules

- Store secrets only in the owning platform's secret store.
- Use least-privilege, scoped API tokens and rotate them after suspected exposure.
- Require pull-request validation before merging to `main`.
- Review external form actions, scripts, fonts, and integrations before adding them.
- Never paste Formspree submissions or customer information into issues, logs, or agent prompts.

## Incident response

1. Contain the affected account, token, deployment, or DNS change.
2. Restore a known-good deployment.
3. Rotate exposed credentials and review access logs.
4. Reconcile production with Git.
5. Document impact, cause, and prevention without publishing sensitive details.
