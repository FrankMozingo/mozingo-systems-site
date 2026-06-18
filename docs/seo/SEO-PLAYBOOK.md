# SEO Playbook

## Objective

Earn qualified discovery for practical AI services and operational engineering. Optimize for relevant business conversations, not raw traffic.

## Search foundations

- One indexable canonical URL per public page
- Unique title, description, and H1 aligned to the page's offer
- Clear internal links between problems, offers, proof, and contact
- `robots.txt` and `sitemap.xml` aligned with the public page set
- Permanent redirects for retired URLs
- Fast, accessible, mobile-friendly pages
- Claims and location information consistent with the business identity

## Measurement stack

- Google Search Console: indexing, queries, landing pages, Core Web Vitals, and alerts
- Cloudflare analytics: traffic and security context
- Optional Ahrefs or SEMrush: competitors, keywords, and backlinks
- Optional Firecrawl or another crawler: production crawl verification

Repository validation is necessary but cannot measure rankings, live rendering, external links, or search-engine coverage.

## Audit sequence

1. Run `npm run check`.
2. Crawl the live canonical domain.
3. Compare live URLs, status codes, canonicals, titles, descriptions, headings, and internal links with the repository.
4. Review Search Console indexing and query data for the same URLs.
5. Classify findings as crawlability, indexability, relevance, trust, or conversion.
6. Prioritize by business impact, confidence, effort, and reversibility.
7. Implement through the normal pull-request process and annotate the measurement date.

## Content rules

- Build pages around a real offer, problem, audience, or decision.
- Use concrete operational language and explain the next step.
- Add proof only when it can be substantiated.
- Avoid near-duplicate location pages, generic AI articles, and keyword-driven filler.
- Prefer updating a strong existing page over creating a weak new one.

## Structured data backlog

Add JSON-LD only when the visible content supports it. Reasonable candidates are `Organization`, `ProfessionalService`, `WebSite`, and `BreadcrumbList`. Do not add review, rating, FAQ, or local-office markup without matching visible and factual content.

## Monthly review

Record:

- Indexed public pages versus sitemap pages
- Non-brand query impressions and clicks
- Leads or qualified contact starts by landing page when measurable
- Top gaining and declining pages
- Coverage, security, and manual-action alerts
- Content actions for the next month
