import type { APIContext } from 'astro';
import type { Locale } from '../../i18n/config';
import { useTranslations } from '../../i18n/ui';
import { localeStaticPaths } from '../../i18n/utils';
import { renderOgImage } from '../../lib/og';

export function getStaticPaths() {
  return localeStaticPaths();
}

/** The share image for pages without their own: home, writing, about. */
export async function GET({ params }: APIContext) {
  const locale = params.locale as Locale;
  const t = useTranslations(locale);
  const png = await renderOgImage({ locale, eyebrow: t('site.role'), title: 'Sonsu Lee' });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}
