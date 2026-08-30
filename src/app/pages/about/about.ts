import { Component, inject } from '@angular/core';

import { PageMeta } from '../../core/page-meta';
import { site } from '../../core/site';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
})
export class About {
  protected readonly site = site;

  constructor() {
    inject(PageMeta).set('About', `How ${site.name} got started and what we build.`);
  }
}
