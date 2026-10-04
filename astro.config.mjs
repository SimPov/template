import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The canonical base URL is the single source of truth in src/config/site.config.ts.
import siteConfigModule from './src/config/site.config.ts';

// Astro laadt de config via Vite: de default export kan als interop-wrapped module
// of als genamede export verschijnen.
const siteConfig = siteConfigModule?.default ?? siteConfigModule;

export default defineConfig({
  site: siteConfig.site.url,
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
