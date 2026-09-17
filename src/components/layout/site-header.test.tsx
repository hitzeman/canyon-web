import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SiteHeader } from './site-header';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

// jsdom can't follow a link; stop the anchors from trying so a click on one
// tests what it is meant to — that the menu closes — and nothing else.
const preventNavigation = (event: MouseEvent) => event.preventDefault();

beforeEach(() => document.addEventListener('click', preventNavigation));

afterEach(() => {
  document.removeEventListener('click', preventNavigation);
  document.documentElement.classList.remove('dark');
  localStorage.clear();
});

function setup() {
  render(<SiteHeader />);
  return {
    user: userEvent.setup(),
    menuButton: screen.getByRole('button', { name: 'Menu' }),
    menu: document.getElementById('mobile-menu')!,
  };
}

describe('SiteHeader', () => {
  it('opens the mobile menu and closes it when a link is followed', async () => {
    const { user, menuButton, menu } = setup();
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menu.hidden).toBe(true);

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(menu.hidden).toBe(false);

    await user.click(menu.querySelector('a')!);
    expect(menu.hidden).toBe(true);
  });

  it('closes on Escape and returns focus to the menu button', async () => {
    const { user, menuButton, menu } = setup();
    await user.click(menuButton);

    await user.keyboard('{Escape}');
    expect(menu.hidden).toBe(true);
    expect(document.activeElement).toBe(menuButton);
  });

  it('toggles the class on <html> and remembers the choice', async () => {
    const { user } = setup();
    const toggle = screen.getByRole('button', { name: 'Dark mode' });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await user.click(toggle);
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(toggle).toHaveAttribute('aria-pressed', 'true');

    await user.click(toggle);
    expect(document.documentElement).not.toHaveClass('dark');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
