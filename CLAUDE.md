# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

Next.js 16 (App Router) + React 19 + Tailwind v4 + shadcn/ui. The bundled Next docs live in `node_modules/next/dist/docs/` (`01-app`, `03-architecture`, …) — check them before using any Next API (e.g. route `params` is a `Promise` and must be awaited).

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — production build; this is also the type check (`tsc` errors fail the build)
- `npm run lint` — ESLint (flat config, `eslint-config-next`)

There is no test suite.

## What this is

Marketing site + product catalog for Baterías GMA (car batteries, Bogotá, Colombia). Sales close over WhatsApp; there is no cart or checkout. All UI copy, identifiers, comments and docs are in **Spanish** — keep it that way (`bateria`, `marca`, `referencia`, `precio`, `sede`…).

`ROADMAP.md` (phased plan: static catalog → database → online store) and `DIAGNOSTICO.md` (verified technical issues and how to check each) are the source of truth for what to work on and why. Read the relevant phase before larger changes.

## Architecture

**All catalog reads go through `src/lib/catalogo.ts`** (`listarMarcas`, `obtenerBateria`, `buscarBaterias`, `urlFicha`, …). Its functions are `async` so the source can become a database without touching pages. ESLint (`no-restricted-imports`) forbids importing `bateriaData`/`marcasData` anywhere else.

**Data is static TypeScript, not a database.** The catalog lives in `src/data/`:
- `marcasData.ts` — brands; `slug` is the URL segment, `activo: false` hides a brand everywhere. `otras` ("Otras marcas") is a group, not a brand: its batteries carry the real brand in `Bateria.fabricante`. Always display a product's brand with `marcaDe(bateria, marca)`, never `marca.name`.
- `bateriaData.ts` — every battery (`marcaId` → `Marca.id`, not slug). `precio` is intentionally required so a battery without a price fails the build; it is a raw number in COP, formatted only via `formatearPrecio()` in `src/lib/precio.ts`.
- `contactoData.ts` — sedes and the WhatsApp number (`WHATSAPP_COMERCIAL`); build links with `waMeUrl()` in `src/lib/utils.ts`.

`src/prisma/contract.prisma` is a **data contract for a future phase only** — Prisma is not installed and nothing reads it. Keep it in sync with the shape of `bateriaData.ts`, but don't wire it up or add `prisma.config.ts` (the build would break).

**Routes derive everything from the data files**, so adding a battery requires no other edits:
- `/baterias?q=&marca=&caja=&polaridad=&tecnologia=` — search/filter page, server-rendered from `searchParams` (GET `next/form`, works without JS). `noindex` whenever a filter is set. The header search box submits here.
- `/baterias/[marca]` — brand catalog (`components/bateria/catalogo-marca.tsx`); product cards are `components/bateria/tarjeta-bateria.tsx`, shared with search
- `/baterias/[marca]/[referencia]` — product page (`components/bateria/ficha-producto.tsx`), statically generated via `generateStaticParams`. Canonical URLs use the lowercase `referencia`; lookups are case-insensitive.
- `src/app/sitemap.ts` — built from the same data; product entries include an image only when a photo exists.
- Product URLs are built only by `urlFicha()`.

**Cart (no backend yet).** `src/lib/carrito.ts` is a `localStorage` store read with `useSyncExternalStore` (no Provider; server snapshot is always empty). It stores only `{ id, cantidad }` — never prices. `/carrito` (server page) passes current catalog data to `components/carrito/carrito-vista.tsx`, which sends the order via WhatsApp using `mensajePedido()` in `src/lib/pedido.ts`. Home delivery is **Bogotá only**; otherwise pickup at a sede. `precio` already includes delivery — never add or mention a separate shipping cost. Trading in the old battery discounts `DESCUENTO_USADA` (30.000) per unit, computed in `resumenPedido()`. Online payment, stock and orders are a later phase that needs the database.

**Images come from Cloudinary**, never from `public/`. `publicId` is a Cloudinary path like `Duncan/NS40R670`; URLs are built by the helpers in `src/lib/cloudinary.ts` (one per use: card, detail, thumbnail, logo, product). A battery may have no photo in two ways: no `publicId`, or its `publicId` listed in `SIN_FOTO` (asset 404s). Always go through `getFotoBateria()` (returns `null` when there is no photo) rather than checking either condition by hand. Requires `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env`.

`SITE_URL` in `src/lib/site.ts` is the single source for the public domain (metadata and sitemap).

**Legal (Colombia).** Company identity (`EMPRESA`: razón social, NIT, correo), `HORA_CORTE_ENTREGA` and `URL_SIC` live in `src/data/contactoData.ts`; `LEYENDA_PRECIO` in `src/lib/precio.ts`. Legal pages (`/terminos-y-condiciones`, `/politica-de-datos`, `/garantias-y-devoluciones`) use `components/legal/pagina-legal.tsx` and read those constants — never hardcode them. Ley 1480/2011 requires seller identity, SIC link and price-with-taxes visible; Ley 1581/2012 requires the unchecked, required data-consent checkbox in the cart. Don't add marketing uses of customer data without a separate consent.

## Conventions

- Path alias `@/*` → `src/*`. shadcn components go in `src/components/ui` (style `radix-nova`, `npx shadcn add …`).
- Asset filenames in `public/` must match references exactly in case — production runs on Linux, so `Logo.png` vs `/logo.png` works locally on Windows and 404s in production.
- Never invent product data (box size, polarity, CCA, etc.): optional fields stay empty when unknown, and metadata/descriptions only mention fields that exist. `precio` = (high list price from FF-BATERIAS.xlsx, i.e. without trading in the old battery, + 20.000) × 1.10, rounded to the nearest multiple of 5.000 — see the comment on the field.
- Comments explain *why* a decision was made (see `precio.ts`, `cloudinary.ts`); match that style when touching those areas.
