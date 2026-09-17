'use client';

import { useCallback, useSyncExternalStore } from 'react';

import { THEME_STORAGE_KEY } from './theme';

/**
 * Light/dark theme, applied as the `dark` class on <html>.
 *
 * <html> is the source of truth rather than React state: the inline script in
 * the root layout sets the class before first paint, so this hook subscribes to
 * it instead of deciding the theme a second time. That also keeps every toggle
 * on the page in step with the others.
 *
 * The server snapshot is `false` because the prerendered HTML can't know the
 * visitor's choice; React re-reads the real value straight after hydration.
 */
export function useTheme(): { isDark: boolean; toggle: () => void } {
  const isDark = useSyncExternalStore(subscribeToThemeClass, isDarkNow, () => false);

  const toggle = useCallback(() => {
    const next = !isDarkNow();
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      // Storage can be blocked; the choice then lasts for this page view only.
    }
  }, []);

  return { isDark, toggle };
}

function isDarkNow(): boolean {
  return document.documentElement.classList.contains('dark');
}

function subscribeToThemeClass(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}
