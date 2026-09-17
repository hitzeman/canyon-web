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

  it('serves the hero from the pre-generated widths', async () => {
    const img = (await render()).querySelector('img')!;
    expect(img.getAttribute('src')).toBe('/images/hero-beach-1600.webp');
    expect(img.getAttribute('srcset')).toContain('/images/hero-beach-640.webp 640w');
    expect(img.getAttribute('srcset')).toContain('/images/hero-beach-2750.webp 2750w');
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
