import { ImageLoaderConfig } from '@angular/common';

/**
 * Widths of the pre-generated files in public/images/products
 * (`{src}-{width}.webp`, each 4:3). A static build has no image CDN, so the
 * loader maps each srcset width to the smallest file at least that wide.
 */
export const PRODUCT_IMAGE_WIDTHS = [400, 800, 1200];

export function productImageLoader({ src, width }: ImageLoaderConfig): string {
  const file = PRODUCT_IMAGE_WIDTHS.find((w) => w >= (width ?? 800)) ?? 1200;
  return `/images/products/${src}-${file}.webp`;
}
