import type { Locale } from '../i18n/config';

export interface Project {
  name: string;
  href: string;
  /** One line under the name, in each language. */
  description: Record<Locale, string>;
}

/**
 * Shown on the home page under Projects; the section is hidden while this is empty.
 *
 * {
 *   name: 'blog',
 *   href: 'https://github.com/<you>/blog',
 *   description: { ko: '이 블로그의 소스 코드.', ja: 'このブログのソースコード。', en: 'Source code for this blog.' },
 * }
 */
export const projects: Project[] = [];
