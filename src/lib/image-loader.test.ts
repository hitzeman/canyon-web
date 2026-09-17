import { describe, expect, it } from 'vitest';

import imageLoader from './image-loader';

describe('imageLoader', () => {
  it('serves the smallest pre-generated file at least as wide as the request', () => {
    expect(imageLoader({ src: '/images/hero-beach', width: 640 })).toBe(
      '/images/hero-beach-640.webp',
    );
    expect(imageLoader({ src: '/images/hero-beach', width: 700 })).toBe(
      '/images/hero-beach-1080.webp',
    );
  });

  it('falls back to the widest file when the request is larger than any of them', () => {
    expect(imageLoader({ src: '/images/hero-beach', width: 4000 })).toBe(
      '/images/hero-beach-2750.webp',
    );
  });

  it('leaves a source that already names a file alone', () => {
    expect(imageLoader({ src: '/images/flat.png', width: 640 })).toBe('/images/flat.png');
  });
});
