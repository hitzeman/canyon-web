import { TestBed } from '@angular/core/testing';

import { Theme } from './theme';

describe('Theme', () => {
  const root = document.documentElement;

  afterEach(() => {
    root.classList.remove('dark');
    localStorage.clear();
  });

  it('reads the theme the page was painted with', () => {
    root.classList.add('dark');
    expect(TestBed.inject(Theme).isDark()).toBe(true);
  });

  it('toggles the class on <html> and remembers the choice', () => {
    const theme = TestBed.inject(Theme);
    expect(theme.isDark()).toBe(false);

    theme.toggle();
    expect(theme.isDark()).toBe(true);
    expect(root.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    theme.toggle();
    expect(theme.isDark()).toBe(false);
    expect(root.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
