// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

/**
 * Absolute URLs (RSS, sitemap, share images) need the site's origin. Set SITE_URL once a
 * domain is connected; until then Vercel builds use the project's production domain,
 * and local builds use the dev server.
 */
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:4321');

export default defineConfig({
  site,
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // Both themes are emitted as --shiki-light / --shiki-dark; Prose picks one with light-dark().
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
  fonts: [
    // Latin in Inter 4 with its optical-size axis, the same font emilkowal.ski uses. No fallbacks:
    // the stack in tokens.css continues with Pretendard, whose Latin is drawn from Inter.
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.google(),
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: [],
      options: { experimental: { variableAxis: { opsz: [['14', '32']] } } },
    },
    // Code. Hangul and kana come from Pretendard, imported as stylesheets in BaseLayout (see the note there).
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      provider: fontProviders.fontsource(),
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
  ],
});
