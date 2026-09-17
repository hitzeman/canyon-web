import { Component } from '@angular/core';

/**
 * The wordmark, as inline SVG so it paints with the prerendered HTML (no logo
 * pop in the header) and picks up the theme through `currentColor`.
 *
 * Size it from the outside with a height class — `<app-canyon-logo class="h-9" />`.
 */
@Component({
  selector: 'app-canyon-logo',
  templateUrl: './canyon-logo.html',
  host: { class: 'inline-flex text-ink' },
})
export class CanyonLogo {}
