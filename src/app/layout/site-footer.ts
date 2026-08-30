import { Component } from '@angular/core';

import { site } from '../core/site';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  protected readonly site = site;
  // Evaluated during prerendering, so this is the year the site was built.
  protected readonly year = new Date().getFullYear();
}
