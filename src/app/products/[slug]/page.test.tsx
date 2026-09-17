import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProductPage, { generateMetadata, generateStaticParams } from './page';
import { getProducts } from '@/lib/products';

describe('product detail', () => {
  it('prerenders one page per product', async () => {
    const products = await getProducts();
    expect(await generateStaticParams()).toEqual(products.map(({ slug }) => ({ slug })));
  });

  it('renders the product and its details', async () => {
    const [product] = await getProducts();
    render(await ProductPage({ params: Promise.resolve({ slug: product!.slug }) }));

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(product!.name);
    expect(screen.getByText(product!.price)).toBeInTheDocument();
    for (const feature of product!.features) {
      expect(screen.getByText(feature)).toBeInTheDocument();
    }
  });

  it('sets the title and description from the product', async () => {
    const [product] = await getProducts();
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: product!.slug }) });

    expect(metadata.title).toBe(product!.name);
    expect(metadata.description).toBe(product!.summary);
  });
});
