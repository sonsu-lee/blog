export interface Project {
  name: string;
  href: string;
  /** One line under the name. */
  description: string;
}

/**
 * Shown on the home page under Projects; the section is hidden while this is empty.
 *
 * { name: 'blog', href: 'https://github.com/<you>/blog', description: '이 블로그의 소스 코드.' }
 */
export const projects: Project[] = [];
