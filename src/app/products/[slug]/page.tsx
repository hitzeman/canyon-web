import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProduct, getProducts } from "@/lib/products";

/**
 * Tells Next.js which `[slug]` values exist so each one is prerendered to its
 * own HTML file at build time. Without this, a dynamic route can't be included
 * in a static export.
 */
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return {};

  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-20">
      <Link
        href="/products"
        className="text-sm text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
      >
        &larr; All products
      </Link>

      <h1 className="mt-6 text-4xl font-semibold tracking-tight">
        {product.name}
      </h1>
      <p className="mt-2 text-lg font-medium">{product.price}</p>
      <p className="mt-6 text-lg leading-8 text-black/70 dark:text-white/70">
        {product.description}
      </p>

      <h2 className="mt-12 text-sm font-medium uppercase tracking-widest text-black/50 dark:text-white/50">
        Details
      </h2>
      <ul className="mt-4 space-y-2 text-black/70 dark:text-white/70">
        {product.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span aria-hidden className="text-black/30 dark:text-white/30">
              &bull;
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </main>
  );
}
