import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { SiteFooter } from './layout/site-footer';
import { SiteHeader } from './layout/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, SiteFooter, SiteHeader],
  templateUrl: './app.html',
})
export class App {}
