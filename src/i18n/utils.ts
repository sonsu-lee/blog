import { getRelativeLocaleUrl } from 'astro:i18n';
import { locales, type Locale } from './config';

/** A path inside a locale, e.g. localePath('ja', 'posts') → /ja/posts/ */
export function localePath(locale: Locale, path = ''): string {
  return getRelativeLocaleUrl(locale, path);
}

/** The same path in every locale, for hreflang links and the language switcher. */
export function alternatesFor(path = ''): Record<Locale, string> {
  return Object.fromEntries(locales.map((l) => [l, localePath(l, path)])) as Record<Locale, string>;
}

/** getStaticPaths for pages that exist in every locale. */
export function localeStaticPaths() {
  return locales.map((locale) => ({ params: { locale } }));
}
