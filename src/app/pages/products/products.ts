import { IMAGE_CONFIG, IMAGE_LOADER, NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PageMeta } from '../../core/page-meta';
import { PRODUCT_IMAGE_WIDTHS, productImageLoader } from '../../core/product-images';
import { Product } from '../../core/products';
import { site } from '../../core/site';

@Component({
  selector: 'app-products',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './products.html',
  providers: [
    { provide: IMAGE_LOADER, useValue: productImageLoader },
    { provide: IMAGE_CONFIG, useValue: { breakpoints: PRODUCT_IMAGE_WIDTHS } },
  ],
})
export class Products {
  readonly products = input.required<Product[]>();

  constructor() {
    inject(PageMeta).set('Products', `The full ${site.name} range.`);
  }
}
