import type { MetadataRoute } from 'next';

import { siteUrl } from '@/lib/site';

// There is no server to regenerate these, so they are emitted once at build time.
export const dynamic = 'force-static';

/** Written to `out/robots.txt` at build time, pointing at the generated sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
