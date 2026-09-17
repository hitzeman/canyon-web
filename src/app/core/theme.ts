import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, PLATFORM_ID, Service, inject, signal } from '@angular/core';

const STORAGE_KEY = 'theme';

/**
 * Light/dark theme, applied as the `dark` class on <html>. The prerendered HTML
 * can't know the visitor's theme, so the inline script in index.html sets that
 * class before first paint (saved choice, else the OS preference). This service
 * reads the theme from the page rather than deciding it, and handles toggling.
 */
@Service()
export class Theme {
  private readonly root = inject(DOCUMENT).documentElement;
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly dark = signal(this.isBrowser && this.root.classList.contains('dark'));
  readonly isDark = this.dark.asReadonly();

  toggle(): void {
    const dark = !this.dark();
    this.dark.set(dark);
    this.root.classList.toggle('dark', dark);
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    } catch {
      // Storage can be blocked; the choice then lasts for this page view only.
    }
  }
}
