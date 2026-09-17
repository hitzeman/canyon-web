/**
 * Widths of the responsive files pre-generated in `public/images`, named
 * `<name>-<width>.webp`. next.config.ts uses this as `images.deviceSizes` so
 * `next/image` only ever asks for a width a file exists for, and the custom
 * loader maps that request onto the file.
 */
export const IMAGE_WIDTHS = [640, 1080, 1600, 2048, 2750] as const;
