import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { pageTitle, summary } from '../data/profile';
import { getPosts, postPath } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts();

  return rss({
    title: pageTitle('글'),
    description: summary,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postPath(post),
    })),
    customData: '<language>ko-KR</language>',
  });
}
