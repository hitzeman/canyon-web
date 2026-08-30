import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PageMeta } from '../../core/page-meta';
import { Product } from '../../core/products';
import { site } from '../../core/site';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.html',
})
export class Products {
  readonly products = input.required<Product[]>();

  constructor() {
    inject(PageMeta).set('Products', `The full ${site.name} range.`);
  }
}
