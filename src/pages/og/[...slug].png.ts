import type { APIContext } from 'astro';
import { name } from '../../data/profile';
import { renderOgImage } from '../../lib/og';
import { getPosts, type Post } from '../../lib/posts';

export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

/** Each post's share image: its title. */
export async function GET({ props }: APIContext<{ post: Post }>) {
  const png = await renderOgImage({ eyebrow: name, title: props.post.data.title });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}
