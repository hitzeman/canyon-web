import { Component, OnInit, inject, input } from '@angular/core';

import { PageMeta } from '../../core/page-meta';
import { PageContent } from '../../core/pages';
import { site } from '../../core/site';

/** Renders the simple footer pages (size guide, shipping, privacy, ...). */
@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.html',
})
export class ContentPage implements OnInit {
  /** Bound from the route's `page` resolver via `withComponentInputBinding`. */
  readonly page = input.required<PageContent>();

  protected readonly site = site;

  private readonly pageMeta = inject(PageMeta);

  ngOnInit(): void {
    const page = this.page();
    this.pageMeta.set(page.title, page.description);
  }
}
