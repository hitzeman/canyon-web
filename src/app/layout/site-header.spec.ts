import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SiteHeader } from './site-header';

@Component({ template: '' })
class Blank {}

describe('SiteHeader', () => {
  async function setup() {
    TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([{ path: '**', component: Blank }]),
      ],
    });
    const fixture = TestBed.createComponent(SiteHeader);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      button: el.querySelector<HTMLButtonElement>('button[aria-controls="mobile-menu"]')!,
      menu: el.querySelector<HTMLElement>('#mobile-menu')!,
    };
  }

  it('opens the mobile menu and closes it when a link is followed', async () => {
    const { fixture, button, menu } = await setup();
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(menu.hidden).toBe(true);

    button.click();
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(menu.hidden).toBe(false);

    menu.querySelector('a')!.click();
    await fixture.whenStable();
    expect(menu.hidden).toBe(true);
  });

  it('closes on Escape and returns focus to the menu button', async () => {
    const { fixture, button, menu } = await setup();
    button.click();
    await fixture.whenStable();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();
    expect(menu.hidden).toBe(true);
    expect(document.activeElement).toBe(button);
  });
});
