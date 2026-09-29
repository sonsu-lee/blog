import type { Locale } from './config';

/** Interface strings. Post content lives in the content collection, not here. */
export const ui = {
  ko: {
    'site.role': '소프트웨어 엔지니어',
    'lang.label': '언어',
    'home.now': '지금',
    'home.now.body': '웹 인터페이스를 만드는 일을 합니다. 화면이 어떻게 보이고, 느껴지고, 움직이는지 오래 고민하는 편입니다.',
    'home.now.blog': '이 블로그에는 한국어·일본어·영어로 만들며 배운 것들을 기록합니다.',
  },
  ja: {
    'site.role': 'ソフトウェアエンジニア',
    'lang.label': '言語',
    'home.now': 'いま',
    'home.now.body': 'ウェブのインターフェースをつくっています。画面がどう見えて、どう感じられて、どう動くのかを長く考えるほうです。',
    'home.now.blog': 'このブログには、日本語・韓国語・英語でものをつくりながら学んだことを書いています。',
  },
  en: {
    'site.role': 'Software Engineer',
    'lang.label': 'Language',
    'home.now': 'Now',
    'home.now.body': 'I build interfaces for the web. I spend a lot of time thinking about how a screen looks, feels, and moves.',
    'home.now.blog': 'This blog is where I write down what I learn while making things in English, Korean, and Japanese.',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)['ko'];

export function useTranslations(locale: Locale) {
  return (key: UIKey): string => ui[locale][key];
}
