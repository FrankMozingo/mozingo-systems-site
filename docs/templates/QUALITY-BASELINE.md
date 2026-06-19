# Website Quality Baseline

Date: 2026-06-19
Operator: Codex on GPT-5.5
Production deployment or commit: `ec8341dfd343e54a785e0ffd37fde2cf22c738e9` (Cloudflare version `f4c966b2`)

## Pages tested

- Home: `https://mozingosystems.com/` - passed
- AI Products: `https://mozingosystems.com/ai-products` - passed
- Operations Improvement: `https://mozingosystems.com/operations-improvement` - passed
- About: `https://mozingosystems.com/about` - passed
- Contact: `https://mozingosystems.com/contact` - passed

## Environments

| Environment | Viewport or device | Browser | Result |
| --- | --- | --- | --- |
| Desktop | 1280 px wide | Chromium and Lighthouse simulated desktop | Passed |
| Mobile | 390 px wide and Lighthouse simulated mobile | Chromium | Passed; mobile lab LCP follow-up tracked |

## Functional checks

- [x] Navigation works on desktop and mobile.
- [x] Logo and images load with useful alternative text.
- [x] Keyboard navigation and focus are usable.
- [x] Contact form submits and delivery is confirmed (delivery confirmed 2026-06-18).
- [x] Legacy routes redirect permanently in one hop.
- [x] `robots.txt` and `sitemap.xml` return `200`.
- [x] Apex is canonical and `www` redirects to it in one hop while preserving path and query.

## Accessibility

Tool and version: Lighthouse 13.4.0 plus keyboard and responsive browser inspection.

Findings: Home and Contact scored 100 for accessibility on desktop and mobile. All five pages have a skip link, visible keyboard focus, semantic headings, useful alternative text, reduced-motion support, and no horizontal overflow at 390 px.

## Performance

Tool and version: Lighthouse 13.4.0 against production.

| Page | Mobile performance | Desktop performance | LCP | CLS | Notes |
| --- | ---: | ---: | ---: | ---: | --- |
| Home | 84 | 99 | 4.6 s mobile / 0.9 s desktop | 0 | Accessibility, Best Practices, and SEO all 100 |
| Contact | 83 | 99 | 4.7 s mobile / 0.8 s desktop | 0 | Accessibility, Best Practices, and SEO all 100 |

## Defects and actions

| Severity | Finding | Owner | Target date | Tracking link |
| --- | --- | --- | --- | --- |
| Medium | Mobile simulated LCP is 4.6-4.7 s despite zero CLS and near-zero TBT; investigate transfer and render timing under throttling. | Site operator | 2026-07-17 | [GitHub issue #8](https://github.com/FrankMozingo/mozingo-systems-site/issues/8) |

## Verdict

- [x] Baseline accepted.
- [ ] Follow-up work is required before operational sign-off.

The mobile LCP item is an optimization follow-up, not a launch blocker: production is functional, accessible, stable, and fully indexed for the canonical home URL.
