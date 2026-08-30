export const site = {
  name: 'Canyon Supply Co.',
  shortName: 'Canyon Supply',
  tagline: 'Gear built for the long way round.',
  description:
    "Canyon Supply Co. makes durable, no-nonsense outdoor gear for people who'd rather be outside.",
  email: 'hello@canyonsupply.co',
  // Used for absolute URLs in the generated sitemap. Override at build time
  // with the SITE_URL environment variable.
  url: 'https://canyonsupply.co',
} as const;

export const nav = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/about', label: 'About' },
] as const;
