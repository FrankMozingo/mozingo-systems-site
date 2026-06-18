# Architecture

## System boundary

The production website is static HTML, CSS, and image assets served through Cloudflare. GitHub is the source of truth. Form submissions leave the site through Formspree.

```text
Editor or agent
      |
      v
Git branch -> GitHub pull request -> Validate site CI
                                      |
                                      v
                                merge to main
                                      |
                                      v
                          Cloudflare Git deployment
                                      |
                                      v
                          https://mozingosystems.com

Contact form -> Formspree -> business inbox
```

## Repository layout

```text
public/                         Complete deployed static website
public/assets/                  Public images and brand assets
docs/                           Business and operating documentation
scripts/                        Dependency-free local validation and preview
plugins/mozingo-systems/        Repo-local Codex plugin and skills
.agents/plugins/                Repo-local plugin marketplace metadata
.github/                        CI, ownership, and pull request controls
public/*.html, public/styles.css Production website
public/_redirects               Cloudflare-compatible redirect rules
public/robots.txt, public/sitemap.xml Search discovery controls
wrangler.jsonc                  Workers Static Assets deployment contract
```

## Design constraints

- Keep the production site build-free until a measured requirement justifies a framework.
- Keep shared visual rules in `public/styles.css`.
- Keep all deployable files inside `public/`; Wrangler must never upload `.git`, docs, plugins, or agent configuration.
- Keep public routes explicit and version-controlled.
- Use repository scripts for deterministic checks; external audits supplement them.
- Store no secrets in the repository. MCP and Cloudflare authentication are user-scoped.

## External dependencies

- Cloudflare: DNS, edge delivery, deployment, TLS, and security controls
- GitHub: source control and continuous integration
- Formspree: contact form processing
- Optional: Google Search Console, Ahrefs or SEMrush, and a crawler for search analysis
