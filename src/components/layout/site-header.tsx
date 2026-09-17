'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { CanyonLogo } from './canyon-logo';
import { MoonIcon, SunIcon } from './theme-icons';
import { type NavLink, linkHref, nav, site } from '@/lib/site';
import { useLocationHash } from '@/lib/use-location-hash';
import { useTheme } from '@/lib/use-theme';

const NAV_LINK_CLASS = 'text-xs font-semibold tracking-widest text-nav uppercase';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { isDark, toggle } = useTheme();
  const isCurrent = useIsCurrent();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Escape closes the menu and puts focus back where it came from.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const navLinks = (linkClass: string) =>
    nav.map((item) => (
      <Link
        key={item.label}
        href={linkHref(item)}
        aria-current={isCurrent(item) ? 'page' : undefined}
        onClick={closeMenu}
        className={linkClass}
      >
        {item.label}
      </Link>
    ));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-page">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="shrink-0" onClick={closeMenu}>
          <span className="sr-only">{site.name}</span>
          <CanyonLogo className="h-9 md:h-10" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
          {navLinks(`${NAV_LINK_CLASS} transition-colors hover:text-accent-text`)}

          <Link href="/products" className={`flex items-center gap-1.5 ${NAV_LINK_CLASS}`}>
            Cart
            <span
              aria-hidden="true"
              className="flex size-5 items-center justify-center rounded-full bg-coal text-[10px] font-bold text-white"
            >
              0
            </span>
            <span className="sr-only">(0 items)</span>
          </Link>

          <button
            type="button"
            aria-label="Dark mode"
            aria-pressed={isDark}
            onClick={toggle}
            className="flex size-8 items-center justify-center rounded-full border border-control-line bg-control text-ink transition-colors"
          >
            {/* Both icons render and CSS picks one, so the prerendered HTML is right before hydration. */}
            <MoonIcon className="dark:hidden" />
            <SunIcon className="hidden dark:block" />
          </button>
        </nav>

        <button
          ref={menuButton}
          type="button"
          aria-label="Menu"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span className="block h-0.5 w-5 bg-ink" />
          <span className="block h-0.5 w-5 bg-ink" />
          <span className="block h-0.5 w-5 bg-ink" />
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="flex flex-col gap-5 border-t border-line bg-page px-6 pt-2 pb-6 md:hidden"
      >
        <nav aria-label="Main" className="flex flex-col gap-5">
          {navLinks('text-sm font-semibold tracking-widest text-nav uppercase')}
          <Link
            href="/products"
            onClick={closeMenu}
            className="text-sm font-semibold tracking-widest text-nav uppercase"
          >
            Cart
          </Link>
        </nav>
        <button
          type="button"
          onClick={toggle}
          className="self-start text-xs font-semibold tracking-widest text-accent-text uppercase underline"
        >
          <span className="dark:hidden">Dark mode</span>
          <span className="hidden dark:inline">Light mode</span>
        </button>
      </div>
    </header>
  );
}

/**
 * Marks the link for the page being viewed. A link with a fragment is current
 * only when that fragment is the one in the URL, so Story lights up on /#story
 * but not on /.
 */
function useIsCurrent(): (link: NavLink) => boolean {
  const pathname = usePathname();
  const hash = useLocationHash();

  return (link: NavLink) => {
    if (!link.path) return false;
    if (link.fragment) return pathname === link.path && hash === `#${link.fragment}`;
    return pathname === link.path || pathname.startsWith(`${link.path}/`);
  };
}
