import type { Metadata } from 'next';
import ReactDOM from 'react-dom';

import './globals.css';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { site, siteUrl } from '@/lib/site';
import { themeScript } from '@/lib/theme';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    // Pages set a bare title ("About"); this appends the site name to it.
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

/**
 * The two font files the first screen needs, preloaded into <head>. The other
 * subsets load on demand, from the @font-face rules in globals.css.
 */
function preloadFonts() {
  for (const file of ['anton-latin.woff2', 'dm-sans-latin.woff2']) {
    ReactDOM.preload(`/fonts/${file}`, {
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    });
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  preloadFonts();

  return (
    // The theme script below rewrites the class list before hydration, which is
    // a deliberate server/client difference.
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* First thing in the body so the theme is applied before any content paints. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Every page gives its <main> id="main" tabindex="-1", so this lands there. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-60 focus:bg-coal focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
