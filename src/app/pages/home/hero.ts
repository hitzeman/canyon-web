import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * The hero photo is art-directed: a <picture> in the template swaps a 3:4 centre
 * crop in for the landscape original on portrait viewports, where object-cover
 * would otherwise crop a 1.41 photo so hard that phones fetched the 2750px file
 * to show 390px of it. NgOptimizedImage can't express that (it has no <picture>
 * support), so the template writes srcset/sizes by hand.
 *
 * Both sets are pre-generated in public/images — a static build has no image CDN.
 * The portrait files are a centre crop of hero-beach-2750.webp at its full 1948px
 * height (1461x1948, then 1096w and 731w), WebP quality 72.
 */
@Component({
  selector: 'app-home-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
})
export class Hero {}
