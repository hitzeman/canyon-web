import type { MetadataRoute } from 'next';

import { PAGES } from '@/lib/pages';
import { getProducts } from '@/lib/products';
import { siteUrl } from '@/lib/site';

// There is no server to regenerate these, so they are emitted once at build time.
export const dynamic = 'force-static';

/**
 * Written to `out/sitemap.xml` at build time. It reads the same data modules the
 * pages do, so it can't drift from what was actually prerendered.
 *
 * Set SITE_URL at build time to get the real domain into the URLs.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteUrl();
  const products = await getProducts();
  const lastModified = new Date();

  const paths = [
    '/',
    '/about',
    '/products',
    ...products.map((product) => `/products/${product.slug}`),
    ...PAGES.map((page) => `/${page.slug}`),
  ];

  return paths.map((path) => ({ url: `${baseUrl}${path}`, lastModified }));
}
