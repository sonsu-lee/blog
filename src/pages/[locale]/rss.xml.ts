import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { intlLocales, type Locale } from '../../i18n/config';
import { useTranslations } from '../../i18n/ui';
import { localePath, localeStaticPaths } from '../../i18n/utils';
import { getPosts, postPath } from '../../lib/posts';

export function getStaticPaths() {
  return localeStaticPaths();
}

/** One feed per language, so readers subscribe only to the languages they read. */
export async function GET(context: APIContext) {
  const locale = context.params.locale as Locale;
  const t = useTranslations(locale);
  const posts = await getPosts(locale);

  return rss({
    title: `Sonsu Lee — ${t('posts.title')}`,
    description: t('home.now.body'),
    site: new URL(localePath(locale), context.site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postPath(post),
    })),
    customData: `<language>${intlLocales[locale]}</language>`,
  });
}
