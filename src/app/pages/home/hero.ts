import { IMAGE_CONFIG, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Widths of the pre-generated files in public/images (hero-beach-{width}.webp).
 * A static host has no image CDN, so the loader maps each srcset width to the
 * smallest file at least that wide.
 */
const WIDTHS = [640, 1080, 1600, 2048, 2750];

function heroLoader({ src, width }: ImageLoaderConfig): string {
  const file = WIDTHS.find((w) => w >= (width ?? 1600)) ?? 2750;
  return `/images/${src}-${file}.webp`;
}

@Component({
  selector: 'app-home-hero',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './hero.html',
  providers: [
    { provide: IMAGE_LOADER, useValue: heroLoader },
    { provide: IMAGE_CONFIG, useValue: { breakpoints: WIDTHS } },
  ],
})
export class Hero {}
