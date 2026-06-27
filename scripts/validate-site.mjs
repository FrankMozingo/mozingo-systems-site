import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const siteRoot = resolve(root, "dist");
const origin = "https://mozingosystems.com";
const publicPages = [
  { file: "index.html", route: "/" },
  { file: "ai-products/index.html", route: "/ai-products" },
  { file: "operations-improvement/index.html", route: "/operations-improvement" },
  { file: "about/index.html", route: "/about" },
  { file: "contact/index.html", route: "/contact" },
  { file: "blog/index.html", route: "/blog" },
];
const errors = [];
let linksChecked = 0;
let documentationLinksChecked = 0;

function read(path) {
  return readFileSync(resolve(siteRoot, path), "utf8");
}

function fail(path, message) {
  errors.push(`${path}: ${message}`);
}

function expectedCanonical(route) {
  return route === "/" ? origin : `${origin}${route}`;
}

function localTarget(reference) {
  const clean = reference.split("#")[0].split("?")[0];
  if (!clean || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(clean)) return null;
  const normalized = decodeURIComponent(clean);
  if (normalized === "/") return "index.html";
  if (normalized === "/404") return "404.html";
  const relativePath = normalized.startsWith("/") ? normalized.slice(1) : normalized;
  if (!relativePath) return "index.html";
  return relativePath.includes(".") ? relativePath : `${relativePath.replace(/\/+$/, "")}/index.html`;
}

for (const page of publicPages) {
  const fullPath = resolve(siteRoot, page.file);
  if (!existsSync(fullPath)) {
    fail(page.file, "public page is missing");
    continue;
  }

  const html = read(page.file);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim();
  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1].trim();
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const ogTitle = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i)?.[1];
  const ogDescription = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i)?.[1];
  const ogImage = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)?.[1];
  const twitterCard = html.match(/<meta\s+name=["']twitter:card["']\s+content=["']([^"']+)["']/i)?.[1];

  if (!/^<!doctype html>/i.test(html.trimStart())) fail(page.file, "missing HTML5 doctype");
  if (!/<html\s+lang=["']en["']/i.test(html)) fail(page.file, "missing lang=\"en\"");
  if (!/<meta\s+charset=["']?utf-8/i.test(html)) fail(page.file, "missing UTF-8 charset");
  if (!/<meta\s+name=["']viewport["']/i.test(html)) fail(page.file, "missing viewport metadata");
  if (!title) fail(page.file, "missing title");
  if (!description || description.length < 50 || description.length > 170) {
    fail(page.file, "description must be 50-170 characters");
  }
  if (canonical !== expectedCanonical(page.route)) {
    fail(page.file, `canonical must be ${expectedCanonical(page.route)}`);
  }
  if (h1Count !== 1) fail(page.file, `expected one h1, found ${h1Count}`);
  if (!ogTitle || !ogDescription || !ogImage) fail(page.file, "missing complete Open Graph metadata");
  if (twitterCard !== "summary") fail(page.file, "twitter:card must be summary");
  if (!/<a\b[^>]*class=["'][^"']*skip-link[^"']*["'][^>]*href=["']#main-content["']/i.test(html)) {
    fail(page.file, "missing skip link to #main-content");
  }
  if (!/<main\b[^>]*id=["']main-content["']/i.test(html)) fail(page.file, "main must use id=\"main-content\"");
  if (!html.includes("/assets/Logo.png")) fail(page.file, "missing canonical logo asset");
  if (/href=["']\/(?:ai-products|operations-improvement|about|contact)\.html(?:[#?"'])/i.test(html)) {
    fail(page.file, "internal public links must use canonical extensionless routes");
  }
  if (/LogoFinal|favicon\.svg/.test(html)) fail(page.file, "contains a retired brand asset reference");

  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const target = localTarget(match[1]);
    if (!target) continue;
    linksChecked += 1;
    if (!existsSync(resolve(siteRoot, target))) fail(page.file, `broken local reference ${match[1]}`);
  }

  for (const match of html.matchAll(/<form\b[^>]*action=["']([^"']+)["']/gi)) {
    if (!match[1].startsWith("https://")) fail(page.file, "form action must use HTTPS");
  }
}

const sitemapIndexPath = resolve(siteRoot, "sitemap-index.xml");
if (!existsSync(sitemapIndexPath)) {
  fail("sitemap-index.xml", "generated sitemap index is missing");
}

const sitemapIndex = existsSync(sitemapIndexPath) ? read("sitemap-index.xml") : "";
const sitemapFiles = [...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
  new URL(match[1]).pathname.replace(/^\//, ""),
);
if (!sitemapFiles.length) {
  fail("sitemap-index.xml", "generated sitemap index has no sitemap entries");
}

const sitemapUrls = [];
for (const sitemapFile of sitemapFiles) {
  if (!existsSync(resolve(siteRoot, sitemapFile))) {
    fail("sitemap-index.xml", `referenced sitemap is missing: ${sitemapFile}`);
    continue;
  }
  const sitemap = read(sitemapFile);
  sitemapUrls.push(...[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
}

const publishedBlogUrls = readdirSync(resolve(siteRoot, "blog"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => `${origin}/blog/${entry.name}`)
  .filter((url) => url !== `${origin}/blog/index.html`);

const expectedUrls = publicPages.map((page) => expectedCanonical(page.route)).concat(publishedBlogUrls);
for (const url of expectedUrls) {
  if (!sitemapUrls.includes(url)) fail("sitemap-index.xml", `missing ${url}`);
}
for (const url of sitemapUrls) {
  if (!expectedUrls.includes(url)) fail("sitemap-index.xml", `unexpected public URL ${url}`);
}

if (sitemapUrls.some((url) => url.endsWith("/blog/test-post"))) {
  fail("sitemap-index.xml", "draft test post must not appear in sitemap output");
}

const robots = read("robots.txt");
if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) {
  fail("robots.txt", "missing canonical sitemap.xml declaration");
}

const headers = read("_headers");
for (const requiredHeader of [
  "Content-Security-Policy:",
  "Permissions-Policy:",
  "Referrer-Policy:",
  "Strict-Transport-Security:",
  "X-Content-Type-Options:",
]) {
  if (!headers.includes(requiredHeader)) fail("_headers", `missing ${requiredHeader}`);
}

for (const [lineNumber, line] of read("_redirects").split(/\r?\n/).entries()) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [source, destination, status] = trimmed.split(/\s+/);
  if (!source || !destination || !status) {
    fail("_redirects", `invalid rule on line ${lineNumber + 1}`);
    continue;
  }
  const target = localTarget(destination);
  if (target && !existsSync(resolve(siteRoot, target))) {
    fail("_redirects", `destination does not exist on line ${lineNumber + 1}`);
  }
  if (!/^(200|301|302|303|307|308)$/.test(status)) {
    fail("_redirects", `unsupported status on line ${lineNumber + 1}`);
  }
}

if (!existsSync(resolve(siteRoot, "downloads/operations-audit-checklist.pdf"))) {
  fail("downloads", "operations audit checklist PDF is missing");
}

function markdownFilesIn(directory) {
  const absolute = resolve(root, directory);
  if (!existsSync(absolute)) return [];
  return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const child = resolve(absolute, entry.name);
    if (entry.isDirectory()) return markdownFilesIn(relative(root, child));
    return entry.name.endsWith(".md") ? [child] : [];
  });
}

const markdownFiles = [
  "README.md",
  "AGENTS.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "agent.md",
]
  .map((path) => resolve(root, path))
  .filter((path) => existsSync(path))
  .concat(markdownFilesIn("docs"), markdownFilesIn(".agents"), markdownFilesIn("plugins"));

for (const file of markdownFiles) {
  const markdown = readFileSync(file, "utf8");
  for (const match of markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const reference = match[1].replace(/^<|>$/g, "").split("#")[0];
    if (!reference || /^(https?:|mailto:|codex:)/i.test(reference)) continue;
    documentationLinksChecked += 1;
    const target = resolve(dirname(file), decodeURIComponent(reference));
    if (!existsSync(target) || (!statSync(target).isFile() && !statSync(target).isDirectory())) {
      fail(relative(root, file), `broken documentation reference ${match[1]}`);
    }
  }
}

if (errors.length) {
  console.error(`Site validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${publicPages.length} public pages, ${linksChecked} local references, ${documentationLinksChecked} documentation links, redirects, robots.txt, generated sitemaps, and downloads.`);
