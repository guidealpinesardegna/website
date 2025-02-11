// @ts-check
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";

import tailwindcss from "@tailwindcss/vite";

export const i18nConfig = {
  defaultLocale: "it",
  locales: ["it", "en"],
  routing: {
    prefixDefaultLocale: false,
  },
};

// https://astro.build/config
export default defineConfig({
  integrations: [],
  adapter: netlify(),
  i18n: i18nConfig,

  experimental: {
    svg: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});