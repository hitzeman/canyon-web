import type { Metadata } from 'next';
import Link from 'next/link';

import { getProducts } from '@/lib/products';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Products',
  description: `The full ${site.name} range.`,
};

export default async function ProductsPage() {
  // Awaited while prerendering, so the emitted HTML is already populated.
  const products = await getProducts();

  return (
    <main id="main" tabIndex={-1} className="flex-1 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow mb-5">Shop</p>
        <h1 className="mb-6 font-display text-5xl leading-none text-ink uppercase md:text-6xl lg:text-7xl">
          Products
        </h1>
        <p className="mb-16 text-base leading-loose text-body">A short list, on purpose.</p>

        <ul className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
          {products.map((product) => (
            <li key={product.slug} className="bg-surface">
              <Link
                href={`/products/${product.slug}`}
                className="group flex h-full flex-col gap-4 p-10 transition-colors hover:bg-page"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-3xl leading-none text-ink uppercase transition-colors group-hover:text-accent-text">
                    {product.name}
                  </h2>
                  <span className="font-display text-2xl leading-none text-accent-large">
                    {product.price}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted">{product.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
