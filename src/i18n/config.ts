export const locales = ['ko', 'ja', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ko';

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/** Each language named in itself, as the language switcher shows it. */
export const localeNames: Record<Locale, string> = {
  ko: '한국어',
  ja: '日本語',
  en: 'English',
};
