# Canyon Supply Co.

The Canyon Supply Co. website — an [Angular](https://angular.dev) 22 app
configured for **static site generation (SSG)**. `npm run build` prerenders every
route to plain HTML/CSS/JS, so the site can be hosted anywhere that serves static
files. There is no Node server at runtime.

## Getting started

Requires Node `^22.22.3 || ^24.15.0 || >=26.0.0` (the Angular 22 CLI minimum).

```bash
npm install
npm start            # http://localhost:4200
```

## Scripts

| Script            | What it does                                                    |
| ----------------- | --------------------------------------------------------------- |
| `npm start`       | Dev server with hot reload                                      |
| `npm run build`   | Static build — prerenders the site to `dist/canyon-web/browser` |
| `npm run watch`   | Rebuild on change, development configuration                    |
| `npm run preview` | Serves the built site locally so you can check it               |
| `npm test`        | Unit tests (Vitest)                                             |

## How the SSG setup works

In `angular.json`, the build target sets **`outputMode: "static"`**. That makes
`ng build` prerender every route at build time and emit only static assets. The
scaffold's Express server (`src/server.ts`) and the `ssr.entry` option were
removed, since nothing runs at request time.

`src/app/app.routes.server.ts` declares how routes are rendered — everything is
`RenderMode.Prerender`.

Because the site is fully static, request-time features are unavailable: no
server-side rendering per request, no API routes, no middleware, no reading
cookies or headers. Everything must be resolvable at build time.

### Dynamic routes

`products/:slug` gets a `getPrerenderParams()` in `src/app/app.routes.server.ts`,
which returns the list of slugs so one HTML file is emitted per product. Any
dynamic route added later needs the same, or its pages won't be generated.

### Data flow

Page data comes from **route resolvers** in `src/app/app.routes.ts`. The router
resolves data before a component renders, which is what lets the prerenderer emit
fully populated HTML. Resolved values arrive as signal `input()`s, via
`withComponentInputBinding()` in `src/app/app.config.ts`.

`src/app/core/products.ts` is a plain module standing in for a real catalog. Its
functions are already `async`, so swapping it for a CMS or database means changing
that one file.

### Post-build step

`scripts/postbuild.mts` runs after `ng build` and writes `sitemap.xml` (from the
same product module the app uses, so it can't drift) plus a root `404.html` that
static hosts serve for unknown URLs. Node runs it directly, stripping the types.

## Project structure

```
src/
  app/
    app.ts / app.html        # Shell: header, router-outlet, footer
    app.config.ts            # Router, hydration, input binding
    app.routes.ts            # Routes + data resolvers
    app.routes.server.ts     # Prerender config, incl. getPrerenderParams
    core/
      site.ts                # Site name, tagline, nav, contact
      products.ts            # Placeholder catalog
      page-meta.ts           # Sets <title> and meta description per page
    layout/                  # Header, footer
    pages/                   # home, about, products, product-detail, not-found
  styles.css                 # Tailwind v4 entry, theme tokens, self-hosted font
  index.html
public/                      # Copied to the build output as-is (favicon, robots.txt, fonts)
scripts/postbuild.mts        # sitemap.xml + 404.html
```

## Editing the basics

Site name, tagline, description, contact email, and the nav all live in
`src/app/core/site.ts`. Colors and fonts are in `src/styles.css`.

Set `SITE_URL` at build time so the sitemap uses the real domain:

```bash
SITE_URL=https://canyonsupply.co npm run build
```

`public/robots.txt` has the sitemap URL hardcoded — update it if the domain changes.

## Deploying

`npm run build` produces `dist/canyon-web/browser`. Upload that directory to any
static host — GitHub Pages, Netlify, Cloudflare Pages, Vercel, or S3 + CloudFront.
Nothing else is needed.
