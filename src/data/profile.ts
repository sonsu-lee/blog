import type { Locale } from '../i18n/config';

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

export interface Job {
  company: Record<Locale, string>;
  summary: Record<Locale, string>;
  start: number;
  /** Omitted while it's the current job. */
  end?: number;
}

/** From the resume revision of 2026-09-28. Newest first. */
export const work: Job[] = [
  {
    company: { ko: 'AI model', ja: 'AI model株式会社', en: 'AI model Inc.' },
    summary: {
      ko: '생성형 AI 이미지 서비스의 설계·개발',
      ja: '生成AI画像サービスの設計・開発',
      en: 'Designing and building generative AI image services',
    },
    start: 2026,
  },
  {
    company: { ko: '북오프코퍼레이션', ja: 'ブックオフコーポレーション株式会社', en: 'BOOKOFF Corporation' },
    summary: {
      ko: '사내 상품·가격 정보 관리 시스템의 프론트엔드',
      ja: '社内の商品・価格情報管理システムのフロントエンド',
      en: 'Frontend for internal product and pricing systems',
    },
    start: 2024,
    end: 2025,
  },
  {
    company: { ko: '셀메이트', ja: 'Sellmate（韓国）', en: 'Sellmate (Korea)' },
    summary: {
      ko: 'EC 업무 SaaS와 매장용 Web POS의 프론트엔드',
      ja: 'EC事業者向けSaaS・店舗向けWeb POSのフロントエンド',
      en: 'Frontend for e-commerce SaaS and in-store web POS',
    },
    start: 2023,
    end: 2024,
  },
];
