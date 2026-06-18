import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const port = Number(process.env.PORT || 4173);
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const redirects = new Map(
  readFileSync(resolve(root, "_redirects"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [from, to, status] = line.split(/\s+/);
      return [from, { to, status: Number(status) }];
    }),
);

createServer((request, response) => {
  const url = new URL(request.url || "/", "http://localhost");
  const redirect = redirects.get(url.pathname);
  if (redirect) {
    response.writeHead(redirect.status, { Location: redirect.to });
    response.end();
    return;
  }

  let pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  if (!extname(pathname)) pathname += ".html";
  const file = resolve(root, `.${normalize(pathname)}`);

  if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Cache-Control": "no-store",
    "Content-Type": types[extname(file).toLowerCase()] || "application/octet-stream",
  });
  response.end(readFileSync(file));
}).listen(port, "127.0.0.1", () => {
  console.log(`Mozingo Systems site: http://127.0.0.1:${port}`);
});
