export type Theme = 'light' | 'dark';

/** Where the reader's choice is remembered; BaseLayout's head script reads the same key. */
export const THEME_STORAGE_KEY = 'theme';

/** Browser UI color per theme (meta theme-color). Mirrors --sand-1 in tokens.css. */
export const THEME_COLORS: Record<Theme, string> = { light: '#fdfdfc', dark: '#111110' };

/** The theme on screen: the reader's choice, else the system setting. */
export function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === 'light' || chosen === 'dark') return chosen;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Switch themes instantly and remember the choice. Transitions pause for two
 * frames so links and rows don't animate their colors while everything else snaps.
 */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.setAttribute('data-theme-switching', '');
  root.dataset.theme = theme;
  for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
    meta.content = THEME_COLORS[theme];
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the choice then lasts for this page only.
  }
  requestAnimationFrame(() => requestAnimationFrame(() => root.removeAttribute('data-theme-switching')));
}
