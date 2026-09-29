import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export function postPath(post: Post): string {
  return `/posts/${post.id}/`;
}

const isVisible = (post: Post) => import.meta.env.DEV || !post.data.draft;
const newestFirst = (a: Post, b: Post) => b.data.date.valueOf() - a.data.date.valueOf();

/** Every published post, newest first. */
export async function getPosts(): Promise<Post[]> {
  return (await getCollection('posts', isVisible)).sort(newestFirst);
}

/** The older and newer neighbours of a post. */
export async function getAdjacent(post: Post): Promise<{ older?: Post; newer?: Post }> {
  const posts = await getPosts();
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

/** "September 29, 2026": short UI text is in English; sentences stay in Korean. */
const dateFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}
