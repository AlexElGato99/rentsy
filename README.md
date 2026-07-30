# Rentsy

Real-estate/rooms rental marketplace. Next.js (App Router) + Supabase (Postgres, Auth, Storage, Realtime).

Three account roles:
- **admin** — platform owner, moderates users/listings
- **seller** — lists properties for rent (free signup)
- **customer** — browses listings, favorites, messages sellers, leaves reviews

Contact-only rental model (no in-app booking/payments); listings auto-publish on creation.

See `.claude/plans` or ask your assistant for the full architecture blueprint (schema, RLS policies, route structure, phased build order).

## Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com/dashboard) (or run one locally with the Supabase CLI).
2. Copy `.env.local.example` to `.env.local` and fill in your project's URL, anon key, and service-role key (Project Settings → API). `.env.local` is gitignored — never commit real keys.
3. Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

4. Apply schema migrations from `supabase/migrations/` to your project (via the Supabase SQL editor, or `supabase db push` if using the CLI).
5. After the `profiles` table exists, sign up once through the app, then bootstrap your first admin from the Supabase SQL editor:

```sql
update profiles set role = 'admin' where id = '<your-auth-user-uuid>';
```

There is no self-service admin signup by design — all further admins are promoted from the admin dashboard.

6. Regenerate types after any schema change:

```bash
npx supabase gen types typescript --project-id <project-ref> > types/supabase.ts
```

## Stack

Next.js (TypeScript, App Router) · Supabase (Postgres/Auth/Storage/Realtime) · Tailwind + shadcn/ui (Radix) · react-hook-form + zod · TanStack Query (messaging/favorites only) · Server Actions for all writes.
