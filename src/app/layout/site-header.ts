import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { nav, site } from '../core/site';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
})
export class SiteHeader {
  protected readonly site = site;
  protected readonly nav = nav;
}
