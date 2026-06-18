# Mozingo Systems Workspace

The source of truth for the Mozingo Systems website, brand identity, SEO process, Cloudflare operations, agent workflows, and release controls.

## Start here

```powershell
npm run check
npm run dev
```

The preview runs at `http://127.0.0.1:4173`. There are no package dependencies and no production build step.

## Operating documents

- [GPT-5.4 mini operator guide and GPT-5.5 routing](./docs/OPERATOR-GUIDE.md)
- [Operational status ledger](./docs/OPERATIONAL-STATUS.md)
- [100% operational process](./docs/OPERATIONS.md)
- [Architecture](./docs/architecture.md)
- [Business identity](./docs/brand/business-identity.md)
- [Cloudflare runbook](./docs/cloudflare/CLOUDFLARE-RUNBOOK.md)
- [SEO playbook](./docs/seo/SEO-PLAYBOOK.md)
- [Security policy](./SECURITY.md)
- [Agent instructions](./AGENTS.md)

## Workspace layout

```text
assets/                   Public images and brand assets
docs/                     Business and operating source of truth
scripts/                  Local preview and deterministic validation
plugins/mozingo-systems/  Installable Codex plugin and MCP config
.agents/                  Agent roles and repo-local plugin marketplace
.github/                  CI, ownership, and pull request controls
*.html, styles.css        Production static website
```

## Delivery model

GitHub Actions validates pull requests and `main`. Cloudflare's Git integration should own deployments so there is one delivery authority. Required external setup and verification are tracked in `docs/OPERATIONS.md`.

## Plugin

The repo-local `mozingo-systems` plugin contains three skills:

- `operate-mozingo-site`
- `audit-mozingo-seo`
- `operate-mozingo-cloudflare`

Its MCP configuration points to Rube for user-authenticated external services. No credentials belong in this repository.

For a guided setup session, select GPT-5.4 mini and use the starter prompt in `docs/OPERATOR-GUIDE.md`. The guide tells mini exactly when to stop and hand a riskier step to GPT-5.5.
