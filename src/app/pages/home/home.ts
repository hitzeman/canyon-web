import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PageMeta } from '../../core/page-meta';
import { Product } from '../../core/products';
import { site } from '../../core/site';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class Home {
  /** Bound from the route's `products` resolver via `withComponentInputBinding`. */
  readonly products = input.required<Product[]>();

  protected readonly site = site;

  constructor() {
    inject(PageMeta).set(null, site.description);
  }
}
