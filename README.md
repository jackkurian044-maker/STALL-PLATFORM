# STall

**That's All.**

A neighbourhood-first local business discovery platform — website, API,
and mobile app in one monorepo. This is a separate build from the
Firebase/React Stall App (stallapp.cutncutestudio.in); the two run in
parallel for now.

## Tech stack

- **Website** — Next.js 15 (App Router), Tailwind v4
- **API** — NestJS + Prisma
- **Database** — SQLite for local dev (schema is Postgres/PostGIS-ready — see below)
- **Mobile** — Flutter (untested — see `apps/mobile/README.md`)

## Quick start

```bash
npm install

# 1. Set up the database (creates dev.db + tables + demo data)
npm run db:migrate
npm run db:seed

# 2. Run the API (http://localhost:4000)
npm run api

# 3. In another terminal, run the website (http://localhost:3000)
npm run website
```

The website falls back to bundled demo data if the API isn't running,
so `npm run website` alone will still render something — but reviews,
live search, and real data need the API up too.

## Moving to Postgres/PostGIS later

1. In `packages/database/prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Update `DATABASE_URL` in `packages/database/.env` and `apps/api/.env`
   to your Postgres connection string (Supabase/Neon/Render all work).
3. Run `npm run db:migrate` again.
4. For real geo-radius search at scale, add PostGIS and swap the
   haversine calculation in `apps/api/src/business/business.service.ts`
   for a `ST_DWithin` query — the haversine approach works fine for a
   single city's worth of listings but doesn't use a spatial index.

## Structure

```
apps/
  website/    Next.js site — Home, Explore/search, Business detail, for-business
  api/        NestJS API — businesses, categories, reviews
  mobile/     Flutter app — see apps/mobile/README.md
packages/
  database/   Shared Prisma schema, client, and seed script
docs/
  PRODUCT_BIBLE.md, ARCHITECTURE.md, ROADMAP.md, MVP.md, DESIGN_SYSTEM.md, BRAND_BOOK.md
```

## Brand

Navy `#0f1a24` · Gold `#f3b73d` · Cream `#fdf9ef` · Ink `#17222c`
Display font: Fraunces · Body font: Work Sans

## Known limitations (read before deploying)

- **Merchant onboarding is a UI placeholder** (`/for-business`) — it's
  not wired to `POST /businesses` yet, since that needs merchant auth
  first (currently unimplemented; `User.role` exists in the schema but
  there's no login flow).
- **No image upload** — businesses show an emoji cover. `BusinessImage`
  exists in the schema; wire up storage (S3/Cloudinary/Firebase Storage)
  when ready.
- **Flutter app is untested** — written without a Flutter SDK available
  in the build environment. Run `flutter pub get && flutter run` and
  expect to fix minor version-drift issues.
- **Search is substring matching**, not full-text/fuzzy search. Fine at
  demo scale; consider Postgres `pg_trgm` or a search service (Algolia,
  Typesense) once the business count grows.
