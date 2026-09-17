export interface Product {
  slug: string;
  name: string;
  price: string;
  summary: string;
  description: string;
  features: string[];
}

/**
 * Placeholder catalog. The accessors are already `async`, so swapping this for a
 * CMS or a database later means rewriting only this file: the callers (page
 * components, `generateStaticParams`, the sitemap) all `await` them, and all of
 * them run at build time.
 */
const PRODUCTS: Product[] = [
  {
    slug: 'rimrock-daypack',
    name: 'Rimrock Daypack',
    price: '$148',
    summary: 'A 22L everyday pack that survives the trailhead and the commute.',
    description:
      'Cut from recycled 420D ripstop with a roll-top closure and a padded sleeve that fits a 15" laptop. Light enough to forget you\'re wearing it, tough enough to drag through a slot canyon.',
    features: [
      '22L capacity, 780g',
      'Recycled 420D ripstop with DWR finish',
      'Padded 15" laptop sleeve',
      'Lifetime repair guarantee',
    ],
  },
  {
    slug: 'mesa-insulated-bottle',
    name: 'Mesa Insulated Bottle',
    price: '$42',
    summary: '32oz of double-walled steel that keeps coffee hot past noon.',
    description:
      'Vacuum-insulated 18/8 stainless steel with a powder-coated grip and a leakproof lid that opens one-handed. Holds heat for 12 hours, ice for 24.',
    features: [
      '32oz / 946ml',
      '18/8 stainless steel, BPA-free',
      '12h hot / 24h cold',
      'Dishwasher safe',
    ],
  },
  {
    slug: 'switchback-fleece',
    name: 'Switchback Fleece',
    price: '$120',
    summary: 'A grid fleece midlayer that breathes on the climb and holds on the ridge.',
    description:
      'Polartec grid backing moves moisture fast without turning into a sponge. Trim through the body so it layers under a shell, long enough in the sleeve to stay put.',
    features: [
      'Polartec Power Grid',
      'Thumb loops and a zippered chest pocket',
      'Trim layering fit',
      'Made in Portugal',
    ],
  },
  {
    slug: 'hollow-creek-camp-mug',
    name: 'Hollow Creek Camp Mug',
    price: '$28',
    summary: 'Enamel over steel, sized for a proper cup of coffee.',
    description:
      "12oz of speckled enamelware with a rolled rim that won't burn your lip. Stacks flat, takes a beating, and picks up scratches you'll be sentimental about.",
    features: [
      '12oz / 355ml',
      'Enamel-coated carbon steel',
      'Campfire and stovetop safe',
      'Stackable',
    ],
  },
];

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return PRODUCTS.find((product) => product.slug === slug);
}
