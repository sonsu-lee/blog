/** The name shown in the header, page titles, feeds, and share images. */
export const name = 'Sungsu Lee';

export const role = 'Software Engineer';

/** One line about now: the home page's first paragraph, and the site description. */
export const summary = 'AI model에서 생성형 AI 이미지 서비스를 만들고 있습니다. 화면이 어떻게 보이고, 느껴지고, 움직이는지 오래 고민하는 편입니다.';

/** "<page> — Sungsu Lee", or just the name for the home page. */
export function pageTitle(page?: string): string {
  return page ? `${page} — ${name}` : name;
}

/** Where the More sentence points. Zenn and email aren't shown anywhere yet. */
export const links = {
  x: 'https://x.com/LeeSungsu84451',
  github: 'https://github.com/sonsu-lee',
  zenn: 'https://zenn.dev/sonsu',
  email: 'mailto:leesonsu07@gmail.com',
};
