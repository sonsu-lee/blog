import type { Locale } from './config';

/** Interface strings. Post content lives in the content collection, not here. */
export const ui = {
  ko: {
    'site.role': '소프트웨어 엔지니어',
    'lang.label': '언어',
    'home.now': '지금',
    'home.now.body': '웹 인터페이스를 만드는 일을 합니다. 화면이 어떻게 보이고, 느껴지고, 움직이는지 오래 고민하는 편입니다.',
    'home.now.blog': '이 블로그에는 한국어·일본어·영어로 만들며 배운 것들을 기록합니다.',
    'home.writing': '글',
    'home.projects': '프로젝트',
    'home.allPosts': '모든 글',
    'posts.title': '글',
    'posts.summary.one': '한국어로 쓴 글 {count}편. 번역본이 있는 글은 제목 아래에 표시됩니다.',
    'posts.summary.other': '한국어로 쓴 글 {count}편. 번역본이 있는 글은 제목 아래에 표시됩니다.',
    'posts.empty': '아직 쓴 글이 없습니다.',
  },
  ja: {
    'site.role': 'ソフトウェアエンジニア',
    'lang.label': '言語',
    'home.now': 'いま',
    'home.now.body': 'ウェブのインターフェースをつくっています。画面がどう見えて、どう感じられて、どう動くのかを長く考えるほうです。',
    'home.now.blog': 'このブログには、日本語・韓国語・英語でものをつくりながら学んだことを書いています。',
    'home.writing': '記事',
    'home.projects': 'プロジェクト',
    'home.allPosts': 'すべての記事',
    'posts.title': '記事',
    'posts.summary.one': '日本語で書いた記事 {count}本。翻訳がある記事は、タイトルの下に表示されます。',
    'posts.summary.other': '日本語で書いた記事 {count}本。翻訳がある記事は、タイトルの下に表示されます。',
    'posts.empty': 'まだ記事がありません。',
  },
  en: {
    'site.role': 'Software Engineer',
    'lang.label': 'Language',
    'home.now': 'Now',
    'home.now.body': 'I build interfaces for the web. I spend a lot of time thinking about how a screen looks, feels, and moves.',
    'home.now.blog': 'This blog is where I write down what I learn while making things in English, Korean, and Japanese.',
    'home.writing': 'Writing',
    'home.projects': 'Projects',
    'home.allPosts': 'All writing',
    'posts.title': 'Writing',
    'posts.summary.one': '{count} post in English. Posts with translations list them under the title.',
    'posts.summary.other': '{count} posts in English. Posts with translations list them under the title.',
    'posts.empty': 'No posts yet.',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)['ko'];

export function useTranslations(locale: Locale) {
  return (key: UIKey, values: Record<string, string | number> = {}): string =>
    ui[locale][key].replace(/\{(\w+)\}/g, (_, name: string) => String(values[name] ?? `{${name}}`));
}
