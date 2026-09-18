export interface ProductImage {
  /**
   * Base name of the pre-generated files in public/images/products — the image
   * loader appends a width. See src/app/core/product-images.ts.
   */
  src: string;
  alt: string;
}

export interface Product {
  slug: string;
  name: string;
  price: string;
  summary: string;
  description: string;
  features: string[];
  images: ProductImage[];
}

/**
 * The catalog. Deliberately a plain module with no Angular decorators: the
 * build-time sitemap script imports it directly, and `getPrerenderParams`
 * reads it to discover which product pages to prerender.
 *
 * Swapping it for a CMS or database later means making these functions do real
 * async work — the callers already `await` them.
 */
const PRODUCTS: Product[] = [
  {
    slug: 'desert-skull-tee',
    name: 'Desert Skull Tee',
    price: '$32',
    summary:
      'Black heavyweight tee — small chest logo on the front, full desert skull print on the back.',
    description:
      'Built for long roads, desert sunsets, and everyday wear. The Desert Skull Tee features our signature Canyon chest logo on the front with a full back graphic inspired by western grit, surf culture, and the open desert.',
    features: [
      'Premium black tee',
      'Soft, comfortable fit',
      'Small front Canyon logo',
      'Large back Desert Skull graphic',
      'Screen printed in Texas',
    ],
    images: [
      {
        src: 'desert-skull-back',
        alt: 'Back of the black Desert Skull Tee, printed with a longhorn skull above the words Clothing Company.',
      },
      {
        src: 'desert-skull-front',
        alt: 'Front of the black Desert Skull Tee, with a small Canyon logo on the left chest.',
      },
      {
        src: 'desert-skull-worn-1',
        alt: 'The tee worn at the beach, seen from behind with the full back print visible.',
      },
      {
        src: 'desert-skull-worn-2',
        alt: 'Close view of the back print on the worn tee.',
      },
      {
        src: 'desert-skull-worn-3',
        alt: 'Close view of the gold Canyon chest logo on the worn tee.',
      },
    ],
  },
];

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return PRODUCTS.find((product) => product.slug === slug);
}
