import Link from "next/link";

import { getProducts } from "@/lib/products";
import { site } from "@/lib/site";

// Server Component: this runs once during `next build` and the result is
// baked into out/index.html. Nothing here ships to the browser.
export default async function Home() {
  const products = await getProducts();
  const featured = products.slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-20">
      <section className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {site.tagline}
        </h1>
        <p className="mt-6 text-lg leading-8 text-black/70 dark:text-white/70">
          {site.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/products"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Shop the range
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition-colors hover:border-black/40 dark:border-white/20 dark:hover:border-white/50"
          >
            Our story
          </Link>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-sm font-medium uppercase tracking-widest text-black/50 dark:text-white/50">
          Featured
        </h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <li key={product.slug}>
              <Link
                href={`/products/${product.slug}`}
                className="block h-full rounded-2xl border border-black/10 p-6 transition-colors hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
              >
                <h3 className="font-medium">{product.name}</h3>
                <p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">
                  {product.summary}
                </p>
                <p className="mt-4 text-sm font-medium">{product.price}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
