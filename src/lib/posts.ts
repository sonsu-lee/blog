import { getCollection, type CollectionEntry } from 'astro:content';
import { isLocale, locales, type Locale } from '../i18n/config';
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
const newestFirst = (a: Post, b: Post) => b.data.date.valueOf() - a.data.date.valueOf();

/** Every published post in every language. */
export async function getAllPosts(): Promise<Post[]> {
  return (await getCollection('posts', isVisible)).sort(newestFirst);
}

/** A locale's posts, newest first. */
export async function getPosts(locale: Locale): Promise<Post[]> {
  return (await getAllPosts()).filter((post) => postLocale(post) === locale);
}

/** The same post in each language it exists in (including this one). Translations share a slug. */
export async function getTranslations(post: Post): Promise<Partial<Record<Locale, Post>>> {
  const slug = postSlug(post);
  const all = await getAllPosts();
  return Object.fromEntries(
    locales.flatMap((l) => {
      const match = all.find((p) => postLocale(p) === l && postSlug(p) === slug);
      return match ? [[l, match]] : [];
    }),
  );
}

/** The older and newer neighbours of a post within its language. */
export async function getAdjacent(post: Post): Promise<{ older?: Post; newer?: Post }> {
  const posts = await getPosts(postLocale(post));
  const i = posts.findIndex((p) => p.id === post.id);
  return { older: posts[i + 1], newer: posts[i - 1] };
}

/** Posts grouped by year, keeping the newest-first order within and across years. */
export function groupByYear(posts: Post[]): Array<[number, Post[]]> {
  const groups = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.date.getUTCFullYear();
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  return [...groups];
}
