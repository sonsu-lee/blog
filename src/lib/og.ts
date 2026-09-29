import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import type { Locale } from '../i18n/config';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** Where each page's share image is served. Posts get their own; other pages share the locale's. */
export function ogImagePath(locale: Locale, slug?: string): string {
  return slug ? `/og/${locale}/${slug}.png` : `/og/${locale}.png`;
}

// Satori reads TTF, OTF, or WOFF (not WOFF2), so images use Pretendard's static OTFs.
// Pretendard's Latin is drawn from Inter, so English images match the site too.
const fontFiles: Record<Locale, string> = {
  ko: 'pretendard/dist/public/static/Pretendard-SemiBold.otf',
  ja: 'pretendard-jp/dist/public/static/PretendardJP-SemiBold.otf',
  en: 'pretendard/dist/public/static/Pretendard-SemiBold.otf',
};

const fontCache = new Map<string, Promise<Buffer>>();

function loadFont(file: string): Promise<Buffer> {
  let font = fontCache.get(file);
  if (!font) {
    font = readFile(join(process.cwd(), 'node_modules', file));
    fontCache.set(file, font);
  }
  return font;
}

/** Mirrors --sand-1, --sand-12, and --sand-11 in tokens.css (images are always light). */
const colors = { background: '#fdfdfc', text: '#21201c', muted: '#63635e' };

interface OgImage {
  locale: Locale;
  /** The small line at the top. */
  eyebrow: string;
  /** The large text at the bottom. */
  title: string;
}

/**
 * Renders a share image in the style of emilkowal.ski's: the page's warm off-white,
 * nothing but text, the title large at the bottom left.
 */
/**
 * Satori has no phrase-aware breaking for Japanese, so titles are split into words
 * and laid out as a wrapping row: lines can only break between words.
 */
const japaneseWords = new Intl.Segmenter('ja', { granularity: 'word' });

/** Katakana, including ー. ICU's dictionary splits some loanwords (トーク|ン), so runs are rejoined. */
const katakanaOnly = /^[\u30A0-\u30FF]+$/;

function japaneseUnits(title: string): string[] {
  const units: string[] = [];
  for (const { segment } of japaneseWords.segment(title)) {
    const last = units.at(-1);
    if (last && katakanaOnly.test(last) && katakanaOnly.test(segment)) units[units.length - 1] = last + segment;
    else units.push(segment);
  }
  return units;
}

function titleChildren(locale: Locale, title: string) {
  if (locale !== 'ja') return title;
  return japaneseUnits(title).map((unit) => ({ type: 'span', props: { style: { whiteSpace: 'nowrap' }, children: unit } }));
}

export async function renderOgImage({ locale, eyebrow, title }: OgImage): Promise<Uint8Array<ArrayBuffer>> {
  const font = await loadFont(fontFiles[locale]);
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
              style: {
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: 1000,
                fontSize: 64,
                lineHeight: 1.25,
                color: colors.text,
                // Korean wraps between words; Japanese wraps between the words from titleChildren.
                wordBreak: locale === 'ko' ? 'keep-all' : 'normal',
              },
              children: titleChildren(locale, title),
            },
          },
        ],
      },
    },
    { width: OG_WIDTH, height: OG_HEIGHT, fonts: [{ name: 'Pretendard', data: font, weight: 600, style: 'normal' }] },
  );
  return Uint8Array.from(await sharp(Buffer.from(svg)).png().toBuffer());
}
