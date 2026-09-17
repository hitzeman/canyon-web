import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Hero } from './hero';

describe('Hero', () => {
  it('loads the photo eagerly — it is the largest paint on the page', () => {
    const { container } = render(<Hero />);
    const img = container.querySelector('img')!;

    // Without `priority` next/image would mark it loading="lazy".
    expect(img).not.toHaveAttribute('loading');
    expect(img).toHaveAccessibleName(/beach/i);
  });

  it('tells the browser the photo renders wider than the viewport on tall screens', () => {
    const { container } = render(<Hero />);

    // object-cover crops to fill, so on a screen taller than the photo's aspect
    // ratio it is scaled past 100vw. Without this, phones get a blurry image.
    // Which file each width resolves to is imageLoader's job — see its tests.
    expect(container.querySelector('img')).toHaveAttribute(
      'sizes',
      '(max-aspect-ratio: 1412/1000) 142vh, 100vw',
    );
  });
});
