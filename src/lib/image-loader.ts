import { IMAGE_WIDTHS } from './images';

/**
 * `images.loader` for the static build: there is no image optimizer at runtime,
 * so each width `next/image` asks for is served by the smallest pre-generated
 * file at least that wide (see public/images).
 *
 * Sources are passed extensionless — `/images/hero-beach` resolves to
 * `/images/hero-beach-1600.webp`. Anything with an extension is already a real
 * file and is served as-is.
 */
export default function imageLoader({ src, width }: { src: string; width: number }): string {
  if (/\.[a-z0-9]+$/i.test(src)) return src;
  const file = IMAGE_WIDTHS.find((candidate) => candidate >= width) ?? IMAGE_WIDTHS.at(-1);
  return `${src}-${file}.webp`;
}
