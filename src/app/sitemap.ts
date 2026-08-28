import type { MetadataRoute } from "next";

import { getProducts } from "@/lib/products";
import { site } from "@/lib/site";

// Required for metadata routes under `output: "export"`.
export const dynamic = "force-static";

// Written to out/sitemap.xml at build time.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  // Trailing slashes match `trailingSlash: true` in next.config.ts.
  const routes = [
    "/",
    "/about/",
    "/products/",
    ...products.map((product) => `/products/${product.slug}/`),
  ];

  return routes.map((route) => ({
    url: new URL(route, site.url).toString(),
    lastModified: new Date(),
  }));
}
