# Website Quality Baseline

Date: 2026-06-19
Operator: Codex on GPT-5.5
Production deployment or commit: `062cf709f84413fd72ead27e75ac406d470217d9`

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
| Mobile | 390 px wide and Lighthouse simulated mobile | Chromium | Passed; mobile lab LCP follow-up resolved in PR #10 |

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
| Home | 99-100 | 99 | 1.88-2.01 s mobile / 0.9 s desktop | 0 | Three post-fix mobile runs; TBT 0 |
| Contact | 99-100 | 99 | 1.76-2.02 s mobile / 0.8 s desktop | 0 | Three post-fix mobile runs; TBT 0 |

## Defects and actions

| Severity | Finding | Owner | Target date | Tracking link |
| --- | --- | --- | --- | --- |
| Resolved | The original logo was oversized and external font requests added critical-path work. PR #10 optimized the logo, restored it on the homepage, and removed the font dependency. | Site operator | 2026-06-19 | [GitHub issue #8](https://github.com/FrankMozingo/mozingo-systems-site/issues/8) |

## Verdict

- [x] Baseline accepted.
- [x] Performance follow-up completed in PR #10.

The mobile LCP follow-up is resolved. Production remains functional, accessible, stable, and fully indexed for the canonical home URL.
