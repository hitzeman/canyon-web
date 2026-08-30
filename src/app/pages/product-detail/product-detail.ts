import { Component, OnInit, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PageMeta } from '../../core/page-meta';
import { Product } from '../../core/products';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.html',
})
export class ProductDetail implements OnInit {
  /** Bound from the route's `product` resolver via `withComponentInputBinding`. */
  readonly product = input.required<Product>();

  private readonly pageMeta = inject(PageMeta);

  ngOnInit(): void {
    // Inputs are populated by now, and this still runs before the page is
    // serialised during prerendering.
    const product = this.product();
    this.pageMeta.set(product.name, product.summary);
  }
}
