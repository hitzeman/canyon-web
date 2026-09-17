import type { ReactNode } from 'react';

interface Feature {
  title: string;
  description: string;
  /** Highlighted closing line. */
  tagline?: string;
  icon: ReactNode;
}

const ICON_PROPS = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
} as const;

const FEATURES: Feature[] = [
  {
    title: 'Small Batch',
    description: 'Screen printed 40 at a time.',
    tagline: "When it's gone, it's gone.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Heavyweight Blanks',
    description: '6.5oz cotton. Built for the canyon roads and the beach.',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    title: 'Ships in 2 Days',
    description: 'Packed by hand in California. On your doorstep fast.',
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section aria-labelledby="features-heading" className="border-b border-line bg-surface">
      <h2 id="features-heading" className="sr-only">
        Why our shirts
      </h2>
      <div className="mx-auto grid max-w-7xl grid-cols-1 px-6 py-12 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col gap-3 py-8 md:px-10 md:py-0 md:first:pl-0 md:last:pr-0"
          >
            <span aria-hidden="true" className="text-accent">
              {feature.icon}
            </span>
            <h3 className="text-sm font-bold tracking-widest text-ink uppercase">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              {feature.description}{' '}
              {feature.tagline && <span className="text-accent-text">{feature.tagline}</span>}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
