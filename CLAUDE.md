# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start            # dev server on :4200
npm run build        # static prerender -> dist/canyon-web/browser
npm run preview      # serve the built output
npm test             # unit tests (Vitest), --watch=false in CI
```

Requires Node `^22.22.3 || ^24.15.0 || >=26.0.0` — the Angular 22 CLI refuses to run below that.

Verification is `test` + `build`. `build` is the real gate: prerender failures (see below) only surface there, and the build type-checks templates and TypeScript as it goes. There is no separate lint or typecheck step. `npx prettier --write` handles formatting; config is in `.prettierrc`.

Set `SITE_URL` at build time for correct absolute URLs in the generated sitemap:

```bash
SITE_URL=https://canyonsupply.co npm run build
```

`public/robots.txt` hardcodes the sitemap URL — update it there if the domain changes.

## Architecture

Angular 22 standalone + zoneless, Tailwind v4, TypeScript strict. The defining constraint is `outputMode: "static"` in `angular.json`: **every route is prerendered at build time and there is no server at runtime.**

What that rules out, repo-wide: request-time rendering, API endpoints, middleware, reading cookies or headers, and anything else resolvable only per request. Anything a page needs must be resolvable during `ng build`. The scaffold's Express server (`src/server.ts`) and the build's `ssr.entry` option were deliberately removed — do not reintroduce them without moving off static output.

Consequences to respect when adding code:

- **New dynamic routes must add a `getPrerenderParams()` entry** in `src/app/app.routes.server.ts` (see `products/:slug`), or their pages are silently never generated. Check the "Prerendered N static routes" count after a build.
- **Page data belongs in a route resolver**, not in a component fetch. The router resolves before the component renders, which is what lets the prerenderer emit populated HTML. A component that loads its own data asynchronously will prerender empty.
- **`src/app/core/products.ts` must stay free of Angular decorators.** `scripts/postbuild.mts` imports it directly under Node (which strips types but not decorators) to build the sitemap.

### Data layer

`src/app/core/products.ts` is a plain in-memory module whose accessors (`getProducts`, `getProduct`) are already `async`. That shape is deliberate: replacing the placeholder catalog with a CMS or database means rewriting only that file, since the data is fetched at build time either way.

Resolvers live in `src/app/app.routes.ts` and their results reach components as signal `input()`s via `withComponentInputBinding()` in `src/app/app.config.ts` — resolver key name must match the component input name. The `products/:slug` resolver returns a `RedirectCommand` to `/404` for unknown slugs, which only matters for client-side navigation to stale URLs.

`src/app/core/site.ts` is the single source for site name, tagline, description, contact email, canonical URL, and the header nav. Change copy and navigation there, not in components.

### Layout and styling

`src/app/app.ts` owns the shell — `SiteHeader`, `<router-outlet />`, `SiteFooter`. Pages render only their `<main>`; `app-root` is the flex column that pins the footer, so keep `flex-1` on page `<main>` elements.

Titles and meta descriptions come from the `PageMeta` service (`src/app/core/page-meta.ts`), called in each page's constructor — or `ngOnInit` where the value depends on a resolved input, as in `product-detail`. Routes deliberately do not use the router's `title` property, so all pages set metadata the same way.

Tailwind v4 is configured entirely in `src/styles.css` via `@import 'tailwindcss'` and `@theme inline` — there is no `tailwind.config.js`; PostCSS wiring is in `.postcssrc.json`. Theme tokens (`--background`, `--foreground`, font vars) are CSS custom properties with a `prefers-color-scheme` dark override, which is why components pair every color with a `dark:` variant.

Geist is self-hosted from `public/fonts` with `@font-face` in `src/styles.css`, so the site makes no third-party request at runtime. Adding weights or subsets means adding files there.

### Post-build

`scripts/postbuild.mts` runs after `ng build` and writes `sitemap.xml` (from the same product module the app uses, so it cannot drift from the prerendered routes) plus a root `404.html` copied from the prerendered `/404` route. Node runs the file directly and strips the types; `"type": "module"` in package.json is what keeps that quiet.

## Angular conventions

This project follows current Angular guidance. Notably:

- Standalone components only; never set `standalone: true` (the default since v20) or `changeDetection: OnPush` (the default since v22).
- Use `input()` / `output()` functions, not decorators. Use `computed()` for derived state and signals for state generally.
- Use the `host` object in the component decorator, not `@HostBinding` / `@HostListener`.
- Native control flow (`@if`, `@for`, `@switch`) in templates, not `*ngIf` / `*ngFor`. `@for` needs a `track`.
- Lazy-load route components with `loadComponent`.
- Prefer type inference where obvious; avoid `any`, use `unknown` when uncertain.
- Use `NgOptimizedImage` for static images (it does not work for inline base64).
- Keep components small; keep templates free of complex logic.

Accessibility is a requirement, not a nice-to-have: pass AXE checks and WCAG AA minimums, including focus management, color contrast, and ARIA attributes.
