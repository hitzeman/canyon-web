import { Component, inject } from '@angular/core';

import { PageMeta } from '../../core/page-meta';
import { site } from '../../core/site';
import { Features } from './features';
import { Hero } from './hero';
import { Newsletter } from './newsletter';
import { Story } from './story';

@Component({
  selector: 'app-home',
  imports: [Features, Hero, Newsletter, Story],
  templateUrl: './home.html',
})
export class Home {
  constructor() {
    inject(PageMeta).set(null, site.description);
  }
}
