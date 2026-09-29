import { name, role } from '../data/profile';
import { renderOgImage } from '../lib/og';

/** The share image for pages without their own: home, writing, about. */
export async function GET() {
  const png = await renderOgImage({ eyebrow: role, title: name });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}
