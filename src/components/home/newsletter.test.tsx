import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Newsletter } from './newsletter';
import { newsletter } from '@/lib/site';

describe('Newsletter', () => {
  it('renders a native form that stays disabled until a provider is configured', () => {
    const { container } = render(<Newsletter />);
    const input = screen.getByLabelText('Email address') as HTMLInputElement;

    expect(input.type).toBe('email');
    expect(input.name).toBe(newsletter.emailField);
    expect(input.required).toBe(true);
    expect(container.querySelector('form')).toHaveAttribute('method', 'post');
    expect(container.querySelector('fieldset')!.disabled).toBe(newsletter.action === null);
  });
});
