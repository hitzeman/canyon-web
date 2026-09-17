import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ContentPage, { generateMetadata, generateStaticParams } from './page';
import { PAGES } from '@/lib/pages';

const page = PAGES[0]!;

describe('content pages', () => {
  it('prerenders one page per entry', async () => {
    expect(await generateStaticParams()).toEqual(PAGES.map(({ slug }) => ({ slug })));
  });

  it('renders the page copy', async () => {
    render(await ContentPage({ params: Promise.resolve({ slug: page.slug }) }));

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(page.title);
    for (const paragraph of page.body) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
  });

  it('sets the title and description from the page', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: page.slug }) });

    expect(metadata.title).toBe(page.title);
    expect(metadata.description).toBe(page.description);
  });
});
