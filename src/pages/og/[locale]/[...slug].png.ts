import type { APIContext } from 'astro';
import { name } from '../../../data/profile';
import { getAllPosts, postLocale, postSlug, type Post } from '../../../lib/posts';
import { renderOgImage } from '../../../lib/og';

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ params: { locale: postLocale(post), slug: postSlug(post) }, props: { post } }));
}

/** Each post's share image: its title, set in its own language. */
export async function GET({ props }: APIContext<{ post: Post }>) {
  const { post } = props;
  const png = await renderOgImage({ locale: postLocale(post), eyebrow: name, title: post.data.title });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}
