// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { defaultLocale, intlLocales, locales } from './src/i18n/config';

/**
 * Absolute URLs (RSS, sitemap, hreflang) need the site's origin. Set SITE_URL once a
 * domain is connected; until then Vercel builds use the project's production domain,
 * and local builds use the dev server.
 */
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:4321');

export default defineConfig({
  site,
  integrations: [
    mdx(),
    sitemap({
      i18n: { defaultLocale, locales: intlLocales },
      // The root page only redirects to a locale.
      filter: (page) => new URL(page).pathname !== '/',
    }),
  ],
  markdown: {
    shikiConfig: {
      // Both themes are emitted as --shiki-light / --shiki-dark; prose.css picks one per color scheme.
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
  i18n: {
    defaultLocale,
    locales: [...locales],
    // Every locale gets a prefix (/ko/, /ja/, /en/); src/pages/index.astro picks one for visitors to /.
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  fonts: [
    // Latin text on /en. Korean and Japanese pages set Latin in Pretendard, which is built on Inter.
    // Pretendard itself is imported as a stylesheet in BaseLayout (see the note there).
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.fontsource(),
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['sans-serif'],
    },
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      provider: fontProviders.fontsource(),
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
    // <em> in English: serif italic, standing in for Emil's Tiempos.
    {
      name: 'Source Serif 4',
      cssVariable: '--font-source-serif',
      provider: fontProviders.fontsource(),
      weights: [400],
      styles: ['italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['serif'],
    },
  ],
});
