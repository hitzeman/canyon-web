import { ViewportScroller } from '@angular/common';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // Resolved route data arrives as component signal inputs.
      withComponentInputBinding(),
      // In-page links such as /#story scroll to, and focus, their target.
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    // The router scrolls with window.scrollTo, which ignores CSS scroll-padding,
    // so offset anchor targets by the height of the fixed header.
    provideAppInitializer(() => inject(ViewportScroller).setOffset([0, 64])),
    provideClientHydration(),
  ],
};
