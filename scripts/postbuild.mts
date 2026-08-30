/**
 * Finishes the static build: writes sitemap.xml and produces a root 404.html.
 *
 * Runs after `ng build` (see the `build` script). It imports the same product
 * module the app uses, so the sitemap can't drift from the prerendered routes.
 * Node executes this file directly, stripping the TypeScript types.
 */
import { copyFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { getProducts } from '../src/app/core/products.ts';
import { site } from '../src/app/core/site.ts';

const baseUrl = (process.env['SITE_URL'] ?? site.url).replace(/\/$/, '');
const outDir = join(import.meta.dirname, '..', 'dist', 'canyon-web', 'browser');

const products = await getProducts();
const paths = [
  '/',
  '/about',
  '/products',
  ...products.map((product) => `/products/${product.slug}`),
];

const lastmod = new Date().toISOString();
const urls = paths
  .map(
    (path) =>
      `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
  )
  .join('\n');

await writeFile(
  join(outDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
  'utf8',
);
console.log(`postbuild: sitemap.xml (${paths.length} URLs, base ${baseUrl})`);

// Most static hosts serve /404.html for unmatched paths.
await copyFile(join(outDir, '404', 'index.html'), join(outDir, '404.html'));
console.log('postbuild: 404.html');
