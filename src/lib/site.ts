/**
 * Single source for the site's name, copy, contact details and navigation.
 * Change those here rather than in components.
 */
export const site = {
  name: 'Canyon Supply Co.',
  shortName: 'Canyon Supply',
  tagline: 'Built between worlds.',
  description:
    'Desert dust and salt water. We make shirts for the drive between the two — printed in small batches out of Mission Viejo, California.',
  email: 'hello@canyonsupply.co',
  // Used for absolute URLs in the generated sitemap and robots.txt. Override at
  // build time with the SITE_URL environment variable.
  url: 'https://canyonsupply.co',
} as const;

/**
 * The canonical origin, without a trailing slash. Read at build time, since
 * nothing runs at request time.
 */
export function siteUrl(): string {
  return (process.env['SITE_URL'] ?? site.url).replace(/\/$/, '');
}

/**
 * A navigation link. Links inside the app set `path` (plus `fragment` to target
 * a section on that page); links that leave the app set `href` instead.
 */
export interface NavLink {
  readonly label: string;
  readonly path?: string;
  readonly fragment?: string;
  readonly href?: string;
}

export interface NavGroup {
  readonly heading: string;
  readonly links: readonly NavLink[];
}

/** The `href` a `NavLink` points at, fragment included. */
export function linkHref(link: NavLink): string {
  return link.href ?? `${link.path ?? ''}${link.fragment ? `#${link.fragment}` : ''}`;
}

export const nav: readonly NavLink[] = [
  { label: 'Shop', path: '/products' },
  { label: 'Story', path: '/', fragment: 'story' },
  { label: 'About', path: '/about' },
];

export const footerNav: readonly NavGroup[] = [
  {
    heading: 'Shop',
    links: [
      { label: 'Drop 001', path: '/products' },
      { label: 'All Products', path: '/products' },
      { label: 'Size Guide', path: '/size-guide' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Our Story', path: '/', fragment: 'story' },
      { label: 'Made In', path: '/made-in' },
      { label: 'Press', path: '/press' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Shipping', path: '/shipping' },
      { label: 'Returns', path: '/returns' },
      { label: 'Contact', href: `mailto:${site.email}` },
    ],
  },
];

export const legalNav: readonly NavLink[] = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Service', path: '/terms' },
];

/**
 * Newsletter sign-up. There's no server, so the form posts straight to a hosted
 * email provider (Buttondown, Mailchimp, Kit, Formspree, ...). Set `action` to
 * the provider's form URL and `emailField` to the field name it expects;
 * `hidden` carries any extra fields it requires. While `action` is null the
 * form renders disabled.
 */
export const newsletter: {
  readonly action: string | null;
  readonly emailField: string;
  readonly hidden: readonly { readonly name: string; readonly value: string }[];
} = {
  action: null,
  emailField: 'email',
  hidden: [],
};
