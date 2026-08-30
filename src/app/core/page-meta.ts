import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { site } from './site';

/**
 * Sets the document title and meta description for a page. This runs during
 * prerendering, so the tags land in the emitted HTML rather than being applied
 * on the client.
 */
@Injectable({ providedIn: 'root' })
export class PageMeta {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  set(pageTitle: string | null, description: string): void {
    this.title.setTitle(
      pageTitle ? `${pageTitle} — ${site.name}` : `${site.name} — ${site.tagline}`,
    );
    this.meta.updateTag({ name: 'description', content: description });
  }
}
