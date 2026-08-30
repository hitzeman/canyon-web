import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PageMeta } from '../../core/page-meta';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
})
export class NotFound {
  constructor() {
    inject(PageMeta).set('Page not found', 'That trail does not go anywhere.');
  }
}
