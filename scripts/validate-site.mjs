import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const siteRoot = resolve(root, "public");
const origin = "https://mozingosystems.com";
const publicPages = [
  "index.html",
  "ai-services.html",
  "blueprint.html",
  "improvement-projects.html",
  "partnership.html",
  "about.html",
  "contact.html",
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

function expectedCanonical(page) {
  return page === "index.html" ? `${origin}/` : `${origin}/${page}`;
}

function localTarget(reference) {
  const clean = reference.split("#")[0].split("?")[0];
  if (!clean || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(clean)) return null;
  const relative = clean.startsWith("/") ? clean.slice(1) : clean;
  if (!relative) return "index.html";
  return decodeURIComponent(relative);
}

for (const page of publicPages) {
  const fullPath = resolve(siteRoot, page);
  if (!existsSync(fullPath)) {
    fail(page, "public page is missing");
    continue;
  }

  const html = read(page);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim();
  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1].trim();
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  if (!/^<!doctype html>/i.test(html.trimStart())) fail(page, "missing HTML5 doctype");
  if (!/<html\s+lang=["']en["']/i.test(html)) fail(page, "missing lang=\"en\"");
  if (!/<meta\s+charset=["']?utf-8/i.test(html)) fail(page, "missing UTF-8 charset");
  if (!/<meta\s+name=["']viewport["']/i.test(html)) fail(page, "missing viewport metadata");
  if (!title) fail(page, "missing title");
  if (!description || description.length < 50 || description.length > 170) {
    fail(page, "description must be 50-170 characters");
  }
  if (canonical !== expectedCanonical(page)) {
    fail(page, `canonical must be ${expectedCanonical(page)}`);
  }
  if (h1Count !== 1) fail(page, `expected one h1, found ${h1Count}`);
  if (!html.includes("/assets/Logo.png")) fail(page, "missing canonical logo asset");
  if (/LogoFinal|favicon\.svg/.test(html)) fail(page, "contains a retired brand asset reference");

  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const target = localTarget(match[1]);
    if (!target) continue;
    linksChecked += 1;
    if (!existsSync(resolve(siteRoot, target))) fail(page, `broken local reference ${match[1]}`);
  }

  for (const match of html.matchAll(/<form\b[^>]*action=["']([^"']+)["']/gi)) {
    if (!match[1].startsWith("https://")) fail(page, "form action must use HTTPS");
  }
}

const sitemap = read("sitemap.xml");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedUrls = publicPages.map(expectedCanonical);
for (const url of expectedUrls) {
  if (!sitemapUrls.includes(url)) fail("sitemap.xml", `missing ${url}`);
}
for (const url of sitemapUrls) {
  if (!expectedUrls.includes(url)) fail("sitemap.xml", `unexpected public URL ${url}`);
}

const robots = read("robots.txt");
if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) {
  fail("robots.txt", "missing canonical sitemap declaration");
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
  if (!/^(301|302|307|308)$/.test(status)) {
    fail("_redirects", `unsupported status on line ${lineNumber + 1}`);
  }
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

console.log(`Validated ${publicPages.length} public pages, ${linksChecked} local references, ${documentationLinksChecked} documentation links, redirects, robots.txt, and sitemap.xml.`);
