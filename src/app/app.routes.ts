import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router, Routes } from '@angular/router';

import { Product, getProduct, getProducts } from './core/products';

/**
 * Resolves the product for `/products/:slug`. Unknown slugs can't happen in the
 * prerendered output, but a client-side navigation to a stale URL can hit this,
 * so send those to the 404 page rather than rendering an empty shell.
 */
const productResolver: ResolveFn<Product | RedirectCommand> = async (route) => {
  const product = await getProduct(route.paramMap.get('slug') ?? '');
  return product ?? new RedirectCommand(inject(Router).parseUrl('/404'));
};

/**
 * Data comes from route resolvers so the router has it before a component
 * renders — which is what lets the prerenderer emit fully populated HTML.
 * Resolved values reach the components as signal inputs, via
 * `withComponentInputBinding()` in app.config.ts.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    resolve: { products: () => getProducts() },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products').then((m) => m.Products),
    resolve: { products: () => getProducts() },
  },
  {
    // One prerendered page per slug — see app.routes.server.ts.
    path: 'products/:slug',
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
    resolve: { product: productResolver },
  },
  {
    // A concrete path so the build emits a real page, which the postbuild step
    // copies to 404.html for static hosts to serve on unknown URLs.
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
