# Canyon Supply Co.

The Canyon Supply Co. website — a [Next.js](https://nextjs.org) app configured
for **static site generation (SSG)**. `npm run build` prerenders every route to
plain HTML/CSS/JS, so the site can be hosted anywhere that serves static files.
There is no Node server at runtime.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Script              | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                             |
| `npm run build`     | Static export — writes the whole site to `out/`        |
| `npm run preview`   | Serves `out/` locally, so you can check the built site |
| `npm run lint`      | ESLint                                                 |
| `npm run typecheck` | TypeScript, no emit                                    |

## How the SSG setup works

`next.config.ts` sets:

- **`output: "export"`** — the flag that turns the build into a static export.
  Every route is rendered at build time into `out/`.
- **`trailingSlash: true`** — emits `out/about/index.html` rather than
  `out/about.html`, so static hosts that don't rewrite extensionless URLs still
  serve the right file.
- **`images.unoptimized: true`** — the built-in image optimizer needs a server.
  Either leave images unoptimized, or point `next/image` at a
  [custom loader](https://nextjs.org/docs/app/guides/static-exports#image-optimization).

Because of `output: "export"`, a few Next.js features are unavailable:
request-time rendering, `POST` route handlers, middleware, cookies/headers, and
ISR. Everything must be resolvable at build time. See the
[static export guide](https://nextjs.org/docs/app/guides/static-exports) for the
full list.

### Dynamic routes

`src/app/products/[slug]/page.tsx` exports `generateStaticParams()`, which tells
Next.js which slugs exist so each product gets its own prerendered HTML file. Any
dynamic route added later needs the same treatment, or the export will fail.

### Data

`src/lib/products.ts` is a plain module standing in for a real catalog. Its
helpers are already `async`, so swapping it for a CMS or database means changing
that one file — the pages fetch at build time either way.

## Project structure

```
src/
  app/
    layout.tsx               # Shared shell: fonts, metadata, header/footer
    page.tsx                 # Home
    about/page.tsx
    products/page.tsx        # Catalog listing
    products/[slug]/page.tsx # One prerendered page per product
    not-found.tsx            # 404
    robots.ts, sitemap.ts    # Generated into out/ at build time
    globals.css              # Tailwind v4 entry + theme tokens
  components/                # Header, footer
  lib/
    site.ts                  # Site name, tagline, nav, contact
    products.ts              # Placeholder catalog
public/                      # Static assets, copied to out/ as-is
```

## Editing the basics

Site name, tagline, description, contact email, and the nav all live in
`src/lib/site.ts`. Colors and fonts are in `src/app/globals.css`.

Set `NEXT_PUBLIC_SITE_URL` at build time to the real domain so the canonical URLs
in the sitemap and metadata are correct:

```bash
NEXT_PUBLIC_SITE_URL=https://canyonsupply.co npm run build
```

## Deploying

`npm run build` produces `out/`. Upload that directory to any static host —
GitHub Pages, Netlify, Cloudflare Pages, Vercel, or S3 + CloudFront. Nothing else
is needed.
