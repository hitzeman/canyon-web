import type { Metadata } from 'next';

import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `How ${site.name} got started and what we build.`,
};

export default function AboutPage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">About</p>
          <h1 className="mb-8 font-display text-5xl leading-none text-ink uppercase md:text-6xl lg:text-7xl">
            About us
          </h1>
          <div className="space-y-4 text-base leading-loose text-body">
            <p>
              {site.name} started the way these things usually do: a handful of friends, a long
              weekend, and a pack that fell apart two miles from the car.
            </p>
            <p>
              We build a small number of things and we build them to last. Every product gets used
              hard by the people who designed it before it ever goes on the site, and anything that
              doesn&apos;t come back in one piece doesn&apos;t ship.
            </p>
            <p>
              Questions, repairs, or just want to tell us where you took your gear?{' '}
              <a href={`mailto:${site.email}`} className="inline-link">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
