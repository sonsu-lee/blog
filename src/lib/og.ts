import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** Where each page's share image is served. Posts get their own; other pages share the site's. */
export function ogImagePath(slug?: string): string {
  return slug ? `/og/${slug}.png` : '/og.png';
}

// Satori reads TTF, OTF, or WOFF (not WOFF2), so images use Pretendard's static OTF.
const fontFile = 'pretendard/dist/public/static/Pretendard-SemiBold.otf';
let font: Promise<Buffer> | undefined;

/** Mirrors --sand-1, --sand-12, and --sand-11 in tokens.css (images are always light). */
const colors = { background: '#fdfdfc', text: '#21201c', muted: '#63635e' };

interface OgImage {
  /** The small line at the top. */
  eyebrow: string;
  /** The large text at the bottom. */
  title: string;
}

/**
 * Renders a share image in the style of emilkowal.ski's: the page's warm off-white,
 * nothing but text, the title large at the bottom left.
 */
export async function renderOgImage({ eyebrow, title }: OgImage): Promise<Uint8Array<ArrayBuffer>> {
  font ??= readFile(join(process.cwd(), 'node_modules', fontFile));
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '88px 96px',
          background: colors.background,
          fontFamily: 'Pretendard',
        },
        children: [
          { type: 'div', props: { style: { fontSize: 28, color: colors.muted }, children: eyebrow } },
          {
            type: 'div',
            props: {
              // Korean wraps between words, as on the page.
              style: { maxWidth: 1000, fontSize: 64, lineHeight: 1.25, color: colors.text, wordBreak: 'keep-all' },
              children: title,
            },
          },
        ],
      },
    },
    { width: OG_WIDTH, height: OG_HEIGHT, fonts: [{ name: 'Pretendard', data: await font, weight: 600, style: 'normal' }] },
  );
  return Uint8Array.from(await sharp(Buffer.from(svg)).png().toBuffer());
}
