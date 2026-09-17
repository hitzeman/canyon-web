export interface PageContent {
  slug: string;
  /** The footer column the page is listed under, shown as the eyebrow. */
  section: string;
  title: string;
  description: string;
  body: string[];
}

/**
 * Simple content pages linked from the footer. The copy is placeholder until
 * the real text is written.
 *
 * Deliberately a plain module with no imports or decorators: app.routes.ts
 * generates one static route per page from this list, and the build-time
 * sitemap script imports it directly.
 */
export const PAGES: readonly PageContent[] = [
  {
    slug: 'size-guide',
    section: 'Shop',
    title: 'Size Guide',
    description: 'Measurements and fit for every shirt, size by size.',
    body: ['Full measurements for every size are coming soon.'],
  },
  {
    slug: 'made-in',
    section: 'Company',
    title: 'Made In',
    description: 'Where and how our shirts are made.',
    body: [
      'The full story of where our shirts are made — the blanks, the ink and the print shop — is coming soon.',
    ],
  },
  {
    slug: 'press',
    section: 'Company',
    title: 'Press',
    description: 'Press coverage and media resources.',
    body: ['Press coverage and media resources are coming soon.'],
  },
  {
    slug: 'shipping',
    section: 'Support',
    title: 'Shipping',
    description: 'Shipping rates, carriers and delivery times.',
    body: ['Shipping rates, carriers and delivery times are coming soon.'],
  },
  {
    slug: 'returns',
    section: 'Support',
    title: 'Returns',
    description: 'Returns and exchanges.',
    body: ['Details on returns and exchanges are coming soon.'],
  },
  {
    slug: 'privacy',
    section: 'Legal',
    title: 'Privacy Policy',
    description: 'How we handle your personal information.',
    body: ['Our privacy policy is coming soon.'],
  },
  {
    slug: 'terms',
    section: 'Legal',
    title: 'Terms of Service',
    description: 'The terms that apply when you use this site.',
    body: ['Our terms of service are coming soon.'],
  },
];
