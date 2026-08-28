import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static Site Generation: `next build` prerenders every route to plain
  // HTML/CSS/JS in `out/`, deployable to any static host (GitHub Pages,
  // Netlify, S3/CloudFront, Vercel, ...). No Node server at runtime.
  output: "export",

  // Emit `/about/index.html` instead of `/about.html` so static hosts that
  // don't rewrite extensionless URLs still serve the right file.
  trailingSlash: true,

  images: {
    // The default image optimizer needs a server. For a static export either
    // leave images unoptimized (below) or supply a custom loader:
    // https://nextjs.org/docs/app/guides/static-exports#image-optimization
    unoptimized: true,
  },
};

export default nextConfig;
