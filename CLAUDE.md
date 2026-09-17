# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # dev server on :3000
npm run build        # static export -> out/
npm run preview      # serve the built output
npm test             # unit tests (Vitest + Testing Library), single run
npm run lint         # ESLint (eslint-config-next)
```

Requires Node `>=20.9.0`.

Verification is `test` + `lint` + `build`. `build` is the real gate: prerender
failures (see below) only surface there, and it type-checks the whole project as
it goes, so there is no separate typecheck step. `npx prettier --write` handles
formatting; config is in `.prettierrc`.

Set `SITE_URL` at build time for correct absolute URLs in the generated sitemap
and robots.txt:

```bash
SITE_URL=https://canyonsupply.co npm run build
```

## Architecture

Next.js 16 App Router, React 19, Tailwind v4, TypeScript strict. The defining
constraint is `output: 'export'` in `next.config.ts`: **every route is prerendered
at build time and there is no server at runtime.**

What that rules out, repo-wide: per-request rendering, route handlers that read
the request, proxy, cookies and headers, server actions, ISR, `redirects` and
`rewrites` in `next.config.ts`, and anything else resolvable only per request.
Anything a page needs must be resolvable during `next build`. Attempting one of
them fails the build rather than degrading quietly.

Consequences to respect when adding code:

- **New dynamic routes must export `generateStaticParams()`** plus
  `dynamicParams = false` (see `app/products/[slug]` and `app/[slug]`), or their
  pages are never generated. Check the route table printed after a build.
- **Page data belongs in the async Server Component**, awaited there. A Client
  Component that fetches its own data prerenders empty. Keep `'use client'` to
  the leaves that genuinely need it — right now that is only `SiteHeader`.
- **`app/sitemap.ts` and `app/robots.ts` need `export const dynamic = 'force-static'`**,
  or the export step refuses them.

### Routes

`app/[slug]` is a catch-all for the footer content pages, generated from
`lib/pages.ts`. Static segments (`/about`, `/products`) win over it, so adding a
static route is safe. `app/not-found.tsx` is also what the build writes to
`out/404.html`.

### Data layer

`src/lib/products.ts` and `src/lib/pages.ts` are plain in-memory modules. The
product accessors (`getProducts`, `getProduct`) are already `async` — that shape
is deliberate: replacing the placeholder catalog with a CMS or database means
rewriting only that file, since the data is fetched at build time either way.

`src/lib/site.ts` is the single source for site name, tagline, description,
contact email, canonical URL, and the header and footer nav. Change copy and
navigation there, not in components.

Titles and descriptions come from the Metadata API — a `metadata` export, or
`generateMetadata()` where the value depends on the params. The root layout sets
the `%s — Canyon Supply Co.` title template, so pages export a bare title.

### Layout and styling

`app/layout.tsx` owns the shell — skip link, `SiteHeader`, the page, `SiteFooter`.
Pages render only their `<main>`; `body` is the flex column that pins the footer,
so keep `flex-1` on page `<main>` elements, and `id="main" tabIndex={-1}` so the
skip link lands there.

Tailwind v4 is configured entirely in `src/app/globals.css` via
`@import 'tailwindcss'` and `@theme inline` — there is no `tailwind.config.js`;
PostCSS wiring is in `postcss.config.mjs`. Theme tokens (`--page`, `--ink`, font
vars) are CSS custom properties redefined under `.dark`, which is why components
use semantic classes (`bg-page`, `text-ink`) and rarely need a `dark:` variant.

Dark mode is the `dark` class on `<html>`, set before first paint by the inline
script in the root layout and toggled by `useTheme()`. `<html>` is the source of
truth; the hook subscribes to it rather than holding its own copy.

Anton and DM Sans are self-hosted from `public/fonts`, so the site makes no
third-party request at runtime. Adding weights or subsets means adding files
there and `@font-face` rules to `globals.css`.

### Images

`next/image` uses the custom loader in `src/lib/image-loader.ts`, because a static
host has no image optimizer. Sources are referenced without an extension
(`/images/hero-beach`) and resolve to the pre-generated
`public/images/<name>-<width>.webp` files; `IMAGE_WIDTHS` in `src/lib/images.ts`
feeds `images.deviceSizes` so the srcset only asks for widths that exist.

## Conventions

- Server Components by default; add `'use client'` only where interactivity or a
  browser API requires it, and as far down the tree as possible.
- `next/link` for internal navigation, `<a>` for `mailto:` and external links.
- Prefer deriving state over storing it; reach for `useSyncExternalStore` when
  the real source of truth lives outside React (the `dark` class, the URL hash)
  rather than mirroring it into state from an effect.
- Named exports for components; default exports only where the framework
  requires them (`page.tsx`, `layout.tsx`, `not-found.tsx`, the loader).
- Prefer type inference where obvious; avoid `any`, use `unknown` when uncertain.
- Keep components small; keep JSX free of complex logic.
- Tests live next to what they test as `*.test.ts(x)`.

Accessibility is a requirement, not a nice-to-have: pass AXE checks and WCAG AA
minimums, including focus management, color contrast, and ARIA attributes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
