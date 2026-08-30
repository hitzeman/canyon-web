import { RenderMode, ServerRoute } from '@angular/ssr';

import { getProducts } from './core/products';

export const serverRoutes: ServerRoute[] = [
  {
    // Tells the build which :slug values exist, so one HTML file is emitted per
    // product. Without this, a parameterised route can't be prerendered.
    path: 'products/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const products = await getProducts();
      return products.map((product) => ({ slug: product.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
