import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CanyonLogo } from './canyon-logo';
import { footerNav, legalNav, site } from '../core/site';

@Component({
  selector: 'app-site-footer',
  imports: [CanyonLogo, RouterLink],
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  protected readonly site = site;
  protected readonly footerNav = footerNav;
  protected readonly legalNav = legalNav;
  // Evaluated during prerendering, so this is the year the site was built.
  protected readonly year = new Date().getFullYear();
}
