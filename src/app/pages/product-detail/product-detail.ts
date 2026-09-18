import { IMAGE_CONFIG, IMAGE_LOADER, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, OnInit, inject, input, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PageMeta } from '../../core/page-meta';
import { PRODUCT_IMAGE_WIDTHS, productImageLoader } from '../../core/product-images';
import { Product } from '../../core/products';

@Component({
  selector: 'app-product-detail',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './product-detail.html',
  providers: [
    { provide: IMAGE_LOADER, useValue: productImageLoader },
    { provide: IMAGE_CONFIG, useValue: { breakpoints: PRODUCT_IMAGE_WIDTHS } },
  ],
})
export class ProductDetail implements OnInit {
  /** Bound from the route's `product` resolver via `withComponentInputBinding`. */
  readonly product = input.required<Product>();

  /** Which gallery image is in view; drives the dots. */
  protected readonly activeImage = signal(0);

  private readonly track = viewChild.required<ElementRef<HTMLDivElement>>('track');
  private readonly pageMeta = inject(PageMeta);

  ngOnInit(): void {
    // Inputs are populated by now, and this still runs before the page is
    // serialised during prerendering.
    const product = this.product();
    this.pageMeta.set(product.name, product.summary);
  }

  /** The scroll position is the source of truth, so swiping and the dots agree. */
  protected onTrackScroll(): void {
    const el = this.track().nativeElement;
    if (!el.clientWidth) return;
    this.activeImage.set(Math.round(el.scrollLeft / el.clientWidth));
  }

  protected showImage(index: number): void {
    const el = this.track().nativeElement;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: index * el.clientWidth, behavior: reduced ? 'auto' : 'smooth' });
  }
}
