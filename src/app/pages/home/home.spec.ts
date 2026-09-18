import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { newsletter } from '../../core/site';
import { Home } from './home';

describe('Home', () => {
  async function render() {
    TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    });
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('has the #story section that the Story links point to', async () => {
    const el = await render();
    expect(el.querySelector('#story')?.getAttribute('tabindex')).toBe('-1');
  });

  it('art-directs the hero: a portrait crop below 3:4, the landscape set above', async () => {
    const el = await render();
    const [portrait, landscape] = el.querySelectorAll('picture source');
    // The template aligns the width columns, so compare on collapsed whitespace.
    const srcset = (e: Element) => e.getAttribute('srcset')!.replace(/\s+/g, ' ').trim();

    expect(portrait.getAttribute('media')).toBe('(max-aspect-ratio: 3/4)');
    expect(srcset(portrait)).toContain('/images/hero-beach-portrait-731.webp 731w');
    expect(srcset(portrait)).toContain('/images/hero-beach-portrait-1461.webp 1461w');
    // The crop is 3:4, so below that ratio cover always scales it to the box height.
    expect(portrait.getAttribute('sizes')).toBe('75vh');

    expect(landscape.getAttribute('media')).toBeNull();
    expect(srcset(landscape)).toContain('/images/hero-beach-640.webp 640w');
    expect(srcset(landscape)).toContain('/images/hero-beach-2750.webp 2750w');

    // The fallback <img> is the LCP element, so it must not be lazy.
    const img = el.querySelector('picture img')!;
    expect(img.getAttribute('src')).toBe('/images/hero-beach-1600.webp');
    expect(img.getAttribute('fetchpriority')).toBe('high');
    expect(img.getAttribute('loading')).not.toBe('lazy');
    expect(img.getAttribute('alt')).toBeTruthy();
  });

  it('renders a native newsletter form that stays disabled until a provider is set', async () => {
    const el = await render();
    const input = el.querySelector<HTMLInputElement>('input[type="email"]')!;
    expect(input.name).toBe(newsletter.emailField);
    expect(input.required).toBe(true);
    expect(el.querySelector(`label[for="${input.id}"]`)).not.toBeNull();
    expect(el.querySelector('form')?.getAttribute('method')).toBe('post');
    expect(el.querySelector('fieldset')?.disabled).toBe(newsletter.action === null);
  });
});
