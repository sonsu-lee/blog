import type { Locale } from '../i18n/config';

/** The name shown in the header, page titles, feeds, and share images. */
export const name = 'Sungsu Lee';

/** "<page> — Sungsu Lee", or just the name for the home page. */
export function pageTitle(page?: string): string {
  return page ? `${page} — ${name}` : name;
}

export interface ProfileLink {
  label: string | Record<Locale, string>;
  href: string;
  /** Hidden links stay here, ready to show by flipping this flag. */
  visible: boolean;
}

export const profileLinks: ProfileLink[] = [
  { label: 'GitHub', href: 'https://github.com/sonsu-lee', visible: true },
  { label: 'Zenn', href: 'https://zenn.dev/sonsu', visible: false },
  { label: 'X', href: 'https://x.com/LeeSungsu84451', visible: false },
  { label: { ko: '메일', ja: 'メール', en: 'Email' }, href: 'mailto:leesonsu07@gmail.com', visible: false },
];

export const visibleLinks = profileLinks.filter((link) => link.visible);

export function linkLabel(link: ProfileLink, locale: Locale): string {
  return typeof link.label === 'string' ? link.label : link.label[locale];
}
