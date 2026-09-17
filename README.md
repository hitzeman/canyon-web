# Canyon Supply Co.

The Canyon Supply Co. website — a [Next.js](https://nextjs.org) 16 App Router app
(React 19) configured for **static site generation**. `npm run build` prerenders
every route to plain HTML/CSS/JS in `out/`, so the site can be hosted anywhere
that serves static files. There is no Node server at runtime.

## Getting started

Requires Node `>=20.9.0`.

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Script               | What it does                                       |
| -------------------- | -------------------------------------------------- |
| `npm run dev`        | Dev server with hot reload                         |
| `npm run build`      | Static build — prerenders the whole site to `out/` |
| `npm run preview`    | Serves the built site locally so you can check it  |
| `npm test`           | Unit tests (Vitest + Testing Library)              |
| `npm run test:watch` | The same, in watch mode                            |
| `npm run lint`       | ESLint, with `eslint-config-next`                  |
| `npm run format`     | Prettier                                           |

## How the static setup works

`next.config.ts` sets **`output: 'export'`**. That makes `next build` prerender
every route at build time and write the result to `out/` as static assets —
including `sitemap.xml`, `robots.txt` and the `404.html` that static hosts serve
for unknown URLs.

Because the site is fully static, request-time features are unavailable: no
per-request rendering, no route handlers, no proxy, no cookies or headers, no
server actions, no redirects or rewrites from `next.config.ts`. Everything a page
shows has to be resolvable during `next build`.

### Dynamic routes

Both dynamic segments supply `generateStaticParams()` and set
`dynamicParams = false`:

- `app/products/[slug]` — one page per product.
- `app/[slug]` — one page per entry in `lib/pages.ts` (the simple content pages
  linked from the footer). Static segments such as `/about` and `/products` take
  precedence over it.

Any dynamic route added later needs the same, or its pages are never generated.
Check the route table `next build` prints at the end.

### Data flow

Pages are async Server Components that `await` their data directly, so it is
fetched while the page is being prerendered and lands in the emitted HTML. Only
the header is a Client Component — the mobile menu and the theme toggle are the
site's only interactive parts.

`lib/products.ts` is a plain module standing in for a real catalog. Its accessors
are already `async`, so swapping it for a CMS or a database means changing that
one file.

### Images

A static host has no image optimizer, so `next/image` uses the custom loader in
`lib/image-loader.ts`. It maps each width in the srcset onto one of the files
pre-generated in `public/images` (`hero-beach-1600.webp` and friends), and
`images.deviceSizes` in `next.config.ts` limits the srcset to widths those files
exist for. Adding a responsive image means adding the files and referencing them
without an extension: `<Image src="/images/my-photo" ... />`.

### Fonts

Anton and DM Sans are self-hosted from `public/fonts` with `@font-face` rules in
`app/globals.css`, so the site makes no third-party request at runtime. The two
files the first screen needs are preloaded from the root layout. Adding weights
or subsets means adding files there.

### Theme

Light/dark follows the `dark` class on `<html>`. The prerendered HTML can't know
the visitor's choice, so a small inline script at the top of `<body>` applies it
(saved choice, else the OS preference) before anything paints; `useTheme()` reads
that class back rather than deciding it again.

## Project structure

```
src/
  app/
    layout.tsx               # Shell: header, page, footer; metadata; theme script
    page.tsx                 # Home
    about/ products/         # Static routes
    products/[slug]/         # One page per product
    [slug]/                  # One page per footer content page
    not-found.tsx            # Also written to out/404.html
    sitemap.ts robots.ts     # Generated at build time
    globals.css              # Tailwind v4 entry, theme tokens, self-hosted fonts
  components/
    layout/                  # Header, footer, wordmark
    home/                    # Hero, features, story, newsletter
  lib/
    site.ts                  # Site name, tagline, nav, contact
    products.ts pages.ts     # Placeholder content
    image-loader.ts          # next/image loader for the pre-generated widths
    use-theme.ts             # Light/dark toggle
public/                      # Served as-is (favicons, fonts, images)
```

## Editing the basics

Site name, tagline, description, contact email and the nav all live in
`src/lib/site.ts`. Colors and fonts are in `src/app/globals.css`.

Set `SITE_URL` at build time so the sitemap and `robots.txt` use the real domain:

```bash
SITE_URL=https://canyonsupply.co npm run build
```

The newsletter form posts straight to a hosted email provider. Until
`newsletter.action` in `src/lib/site.ts` is set to a provider URL, the form
renders disabled.

## Deploying

`npm run build` produces `out/`. Upload that directory to any static host —
GitHub Pages, Netlify, Cloudflare Pages, Vercel, or S3 + CloudFront. Nothing else
is needed.
