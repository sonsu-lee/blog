import { getCollection, type CollectionEntry } from 'astro:content';
import { isLocale, type Locale } from '../i18n/config';
import { localePath } from '../i18n/utils';

export type Post = CollectionEntry<'posts'>;

export function postLocale(post: Post): Locale {
  const folder = post.id.split('/')[0];
  if (!isLocale(folder)) {
    throw new Error(`Post "${post.id}" must live in a locale folder: src/content/posts/{ko,ja,en}/`);
  }
  return folder;
}

export function postSlug(post: Post): string {
  return post.id.split('/').slice(1).join('/');
}

export function postPath(post: Post): string {
  return localePath(postLocale(post), `posts/${postSlug(post)}`);
}

const isVisible = (post: Post) => import.meta.env.DEV || !post.data.draft;

/** A locale's posts, newest first. */
export async function getPosts(locale: Locale): Promise<Post[]> {
  const posts = await getCollection('posts', (post) => isVisible(post) && postLocale(post) === locale);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Posts grouped by year, keeping the newest-first order within and across years. */
export function groupByYear(posts: Post[]): Array<[number, Post[]]> {
  const groups = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.date.getFullYear();
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  return [...groups];
}
