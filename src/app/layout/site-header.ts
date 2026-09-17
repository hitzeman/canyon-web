import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';

import { CanyonLogo } from './canyon-logo';
import { nav, site } from '../core/site';
import { Theme } from '../core/theme';

@Component({
  selector: 'app-site-header',
  imports: [CanyonLogo, RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  host: { '(document:keydown.escape)': 'closeMenu(true)' },
})
export class SiteHeader {
  protected readonly site = site;
  protected readonly nav = nav;
  protected readonly theme = inject(Theme);
  protected readonly menuOpen = signal(false);

  /** Also matches fragments, so the Story link is current only on /#story. */
  protected readonly activeOptions: IsActiveMatchOptions = {
    paths: 'subset',
    queryParams: 'ignored',
    fragment: 'exact',
    matrixParams: 'ignored',
  };

  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  /** Closes the mobile menu; after Escape, focus goes back to the menu button. */
  protected closeMenu(restoreFocus = false): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    if (restoreFocus) this.menuButton().nativeElement.focus();
  }
}
