/** The name shown in the header, page titles, feeds, and share images. */
export const name = 'Sungsu Lee';

export const role = '소프트웨어 엔지니어';

/** One line about now: the home page's first paragraph, and the site description. */
export const summary = 'AI model에서 생성형 AI 이미지 서비스를 만들고 있습니다. 화면이 어떻게 보이고, 느껴지고, 움직이는지 오래 고민하는 편입니다.';

/** "<page> — Sungsu Lee", or just the name for the home page. */
export function pageTitle(page?: string): string {
  return page ? `${page} — ${name}` : name;
}

export interface ProfileLink {
  label: string;
  href: string;
  /** Hidden links stay here, ready to show by flipping this flag. */
  visible: boolean;
}

export const profileLinks: ProfileLink[] = [
  { label: 'GitHub', href: 'https://github.com/sonsu-lee', visible: true },
  { label: 'Zenn', href: 'https://zenn.dev/sonsu', visible: false },
  { label: 'X', href: 'https://x.com/LeeSungsu84451', visible: false },
  { label: '메일', href: 'mailto:leesonsu07@gmail.com', visible: false },
];

export const visibleLinks = profileLinks.filter((link) => link.visible);
