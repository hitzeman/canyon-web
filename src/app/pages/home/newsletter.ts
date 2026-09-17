import { Component } from '@angular/core';

import { newsletter } from '../../core/site';

/**
 * A plain HTML form rather than Angular forms: it posts straight to the email
 * provider configured in site.ts, so it works before hydration and leaves
 * validation to the browser.
 */
@Component({
  selector: 'app-home-newsletter',
  templateUrl: './newsletter.html',
})
export class Newsletter {
  protected readonly newsletter = newsletter;
}
