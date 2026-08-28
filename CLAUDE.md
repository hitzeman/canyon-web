# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # dev server on :3000
npm run build        # static export -> out/
npm run preview      # serve the built out/ directory
npm run lint         # eslint (flat config, no path arg needed)
npm run typecheck    # tsc --noEmit
```

There is no test framework in this project. Verification is `lint` + `typecheck` + `build` — `build` is the real gate, since export failures (see below) only surface there.

`typecheck` depends on types generated into `.next/dev/types/` by `next dev` or `next build`. On a clean checkout, run `npm run build` once before `npm run typecheck` or the route-prop globals will be missing.

Set `NEXT_PUBLIC_SITE_URL` at build time for correct absolute URLs in metadata, sitemap, and robots:

```bash
NEXT_PUBLIC_SITE_URL=https://canyonsupply.co npm run build
```

## Architecture

Next.js 16 App Router, React 19, Tailwind v4, TypeScript strict. The defining constraint is `output: "export"` in `next.config.ts`: **every route is prerendered at build time and there is no server at runtime.**

What that rules out, repo-wide: request-time rendering, dynamic route segments without `generateStaticParams`, `POST`/mutating route handlers, middleware, `cookies()`/`headers()`, ISR, and the built-in image optimizer (hence `images.unoptimized: true`). Anything a page needs must be resolvable during `next build`. `trailingSlash: true` means URLs and generated links carry a trailing slash — keep sitemap entries and any hand-written paths consistent with that.

Consequences to respect when adding code:

- **New dynamic routes must export `generateStaticParams()`** (see `src/app/products/[slug]/page.tsx`) or the export fails.
- **Metadata routes need `export const dynamic = "force-static"`** — both `src/app/robots.ts` and `src/app/sitemap.ts` do this; it is required under `output: "export"`.
- **Client-side interactivity requires an explicit `"use client"` component.** Every component in `src/` today is a server component that runs only at build time.

### Data layer

`src/lib/products.ts` is a plain in-memory module whose accessors (`getProducts`, `getProduct`) are already `async`, and every page `await`s them. That shape is deliberate: replacing the placeholder catalog with a CMS or database means rewriting only that file, since the pages fetch at build time either way.

`src/lib/site.ts` is the single source for site name, tagline, description, contact email, canonical URL, and the header nav. Change copy and navigation there, not in components.

### Layout and styling

`src/app/layout.tsx` owns the shell — Geist fonts, `metadataBase`, the title template (`%s — {site.name}`), and `SiteHeader`/`SiteFooter`. Pages render only their `<main>`; the flex column in the layout is what pins the footer, so keep `flex-1` on page `<main>` elements.

Tailwind v4 is configured entirely in `src/app/globals.css` via `@import "tailwindcss"` and `@theme inline` — there is no `tailwind.config.js`. Theme tokens (`--background`, `--foreground`, font vars) are CSS custom properties with a `prefers-color-scheme` dark override, which is why components pair every color with a `dark:` variant.

### Next.js 16 conventions used here

- Page and layout props use the generated globals `PageProps<"/products/[slug]">` and `LayoutProps<"/">`, not hand-written prop types.
- `params` is a Promise and must be awaited: `const { slug } = await params;`.
- `@/*` maps to `./src/*`.
