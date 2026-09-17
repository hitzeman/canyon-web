import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getProduct, getProducts } from '@/lib/products';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Tells the build which slugs exist, so one HTML file is emitted per product.
 * Without this a dynamic route can't be prerendered — and with `dynamicParams`
 * off, a slug that isn't in the list 404s instead of being rendered on demand.
 */
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.summary };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <main id="main" tabIndex={-1} className="flex-1 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Link href="/products" className="link-underline">
          <span aria-hidden="true">&larr;</span> All products
        </Link>

        <div className="mt-12 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
          <div>
            <p className="eyebrow mb-5">Shop</p>
            <h1 className="mb-6 font-display text-5xl leading-none text-ink uppercase md:text-6xl">
              {product.name}
            </h1>
            <p className="mb-8 font-display text-4xl leading-none text-accent-large">
              {product.price}
            </p>
            <p className="text-base leading-loose text-body">{product.description}</p>
          </div>

          <div>
            <h2 className="mb-5 text-xs font-bold tracking-widest text-quiet uppercase">Details</h2>
            <ul className="grid gap-px bg-line">
              {product.features.map((feature) => (
                <li key={feature} className="bg-surface px-6 py-5 text-sm text-body">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
