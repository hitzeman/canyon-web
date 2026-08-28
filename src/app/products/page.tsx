import type { Metadata } from "next";
import Link from "next/link";

import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description: "The full Canyon Supply Co. range.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-tight">Products</h1>
      <p className="mt-4 text-lg text-black/70 dark:text-white/70">
        A short list, on purpose.
      </p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {products.map((product) => (
          <li key={product.slug}>
            <Link
              href={`/products/${product.slug}`}
              className="block h-full rounded-2xl border border-black/10 p-6 transition-colors hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-medium">{product.name}</h2>
                <span className="text-sm font-medium">{product.price}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">
                {product.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
