import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PAGES, getPage } from '@/lib/pages';
import { site } from '@/lib/site';

interface ContentPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * One prerendered page per entry in PAGES — the simple content pages linked from
 * the footer (size guide, shipping, privacy, ...). Static segments such as
 * /about and /products take precedence over this dynamic one, and with
 * `dynamicParams` off no other slug reaches it.
 */
export async function generateStaticParams() {
  return PAGES.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ContentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  return (
    <main id="main" tabIndex={-1} className="flex-1 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">{page.section}</p>
          <h1 className="mb-8 font-display text-5xl leading-none text-ink uppercase md:text-6xl">
            {page.title}
          </h1>
          <div className="space-y-4 text-base leading-loose text-body">
            {page.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              Questions in the meantime? Email{' '}
              <a href={`mailto:${site.email}`} className="inline-link">
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
