import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

// Required for metadata routes under `output: "export"`.
export const dynamic = "force-static";

// Written to out/robots.txt at build time.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
