import type { NextConfig } from 'next';

import { IMAGE_WIDTHS } from './src/lib/images';

const nextConfig: NextConfig = {
  /**
   * Every route is prerendered to plain HTML at build time and written to
   * `out/`. There is no server at runtime, which rules out request-time
   * rendering, route handlers, middleware, cookies and headers — see README.md.
   */
  output: 'export',

  images: {
    /**
     * A static host has no image optimizer, so `next/image` gets a custom loader
     * (src/lib/image-loader.ts) that maps each srcset width onto one of the
     * files pre-generated in public/images.
     */
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    deviceSizes: [...IMAGE_WIDTHS],
  },
};

export default nextConfig;
