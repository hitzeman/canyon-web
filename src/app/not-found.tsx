import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That trail does not go anywhere.',
};

/**
 * Rendered for unknown routes. The static build also writes it to `out/404.html`,
 * which is what static hosts serve for a URL that matches no file.
 */
export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 flex-col justify-center py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <p className="eyebrow mb-5">404</p>
        <h1 className="mb-6 font-display text-5xl leading-none text-ink uppercase md:text-6xl">
          Page not found
        </h1>
        <p className="mb-10 text-base leading-loose text-body">
          That trail doesn&apos;t go anywhere.
        </p>
        <Link href="/" className="btn-primary">
          Back home
        </Link>
      </div>
    </main>
  );
}
