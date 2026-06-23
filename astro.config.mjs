import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://mozingosystems.com",
  integrations: [sitemap()],
  output: "static",
  trailingSlash: "never",
});
