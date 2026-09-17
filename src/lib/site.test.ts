import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { PAGES } from './pages';
import { getProducts } from './products';
import { footerNav, legalNav, nav } from './site';

/** Every route the app directory declares, with the dynamic ones expanded. */
async function prerenderedPaths(): Promise<string[]> {
  const products = await getProducts();
  return collectRoutes(join(process.cwd(), 'src/app')).flatMap((route) => {
    if (route === '/[slug]') return PAGES.map((page) => `/${page.slug}`);
    if (route === '/products/[slug]') return products.map((p) => `/products/${p.slug}`);
    return [route];
  });
}

function collectRoutes(dir: string, prefix = ''): string[] {
  const routes: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name === 'page.tsx') routes.push(prefix || '/');
    else if (entry.isDirectory())
      routes.push(...collectRoutes(join(dir, entry.name), `${prefix}/${entry.name}`));
  }
  return routes;
}

describe('site navigation', () => {
  const links = [...nav, ...footerNav.flatMap((group) => group.links), ...legalNav];

  it('gives every link a destination', () => {
    for (const link of links) {
      expect(link.path ?? link.href, link.label).toBeTruthy();
    }
  });

  it('links only to routes that get prerendered', async () => {
    const paths = await prerenderedPaths();
    for (const link of links.filter((link) => link.path !== undefined)) {
      expect(paths, link.label).toContain(link.path);
    }
  });
});
