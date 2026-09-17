import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Story } from './story';

describe('Story', () => {
  it('is the #story target the Story links point at, and can take focus', () => {
    const { container } = render(<Story />);
    expect(container.querySelector('#story')).toHaveAttribute('tabindex', '-1');
  });
});
