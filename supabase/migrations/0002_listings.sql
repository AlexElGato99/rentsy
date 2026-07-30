-- Phase 2: listings + listing_images, indexes, RLS.

create type property_type_enum as enum (
  'apartment', 'house', 'studio', 'villa', 'room', 'office', 'land', 'other'
);

create type listing_status as enum ('published', 'unpublished', 'archived');

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  description text,
  property_type property_type_enum not null,
  price numeric(12, 2) not null,
  bedrooms smallint,
  bathrooms smallint,
  rooms smallint,
  city text not null,
  neighborhood text,
  address text,
  latitude double precision,
  longitude double precision,
  contact_phone text,
  contact_whatsapp text,
  contact_email text,
  status listing_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger listings_set_updated_at
  before update on public.listings
  for each row
  execute function public.set_updated_at();

create table public.listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings (id) on delete cascade,
  storage_path text not null,
  position smallint not null default 0,
  created_at timestamptz not null default now()
);

create index listings_city_idx on public.listings (city);
create index listings_neighborhood_idx on public.listings (neighborhood);
create index listings_property_type_idx on public.listings (property_type);
create index listings_status_idx on public.listings (status);
create index listings_price_idx on public.listings (price);
create index listings_owner_id_idx on public.listings (owner_id);
create index listings_status_city_idx on public.listings (status, city);
create index listings_search_idx on public.listings
  using gin (to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(description, '')));

create index listing_images_listing_id_idx on public.listing_images (listing_id);

alter table public.listings enable row level security;
alter table public.listing_images enable row level security;

-- Published listings are public; owners always see their own; admins see all.
create policy "listings_select"
  on public.listings for select
  using (
    status = 'published'
    or owner_id = auth.uid()
    or public.is_admin()
  );

-- Only sellers can create listings, and only under their own account.
create policy "listings_insert_own_seller"
  on public.listings for insert
  to authenticated
  with check (
    owner_id = auth.uid()
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'seller'
    )
  );

create policy "listings_update_own_or_admin"
  on public.listings for update
  to authenticated
  using (owner_id = auth.uid() or public.is_admin())
  with check (owner_id = auth.uid() or public.is_admin());

create policy "listings_delete_own_or_admin"
  on public.listings for delete
  to authenticated
  using (owner_id = auth.uid() or public.is_admin());

-- Images inherit their listing's visibility/ownership.
create policy "listing_images_select"
  on public.listing_images for select
  using (
    exists (
      select 1 from public.listings l
      where l.id = listing_id
        and (l.status = 'published' or l.owner_id = auth.uid() or public.is_admin())
    )
  );

create policy "listing_images_insert_own"
  on public.listing_images for insert
  to authenticated
  with check (
    exists (
      select 1 from public.listings l
      where l.id = listing_id and l.owner_id = auth.uid()
    )
  );

create policy "listing_images_update_own_or_admin"
  on public.listing_images for update
  to authenticated
  using (
    exists (
      select 1 from public.listings l
      where l.id = listing_id and (l.owner_id = auth.uid() or public.is_admin())
    )
  );

create policy "listing_images_delete_own_or_admin"
  on public.listing_images for delete
  to authenticated
  using (
    exists (
      select 1 from public.listings l
      where l.id = listing_id and (l.owner_id = auth.uid() or public.is_admin())
    )
  );

-- Storage: public bucket for listing photos, folder-scoped to the listing id
-- so ownership can be checked from the path (listing_id/uuid.ext).
insert into storage.buckets (id, name, public)
values ('listing-images', 'listing-images', true)
on conflict (id) do nothing;

create policy "listing_images_storage_select"
  on storage.objects for select
  using (bucket_id = 'listing-images');

create policy "listing_images_storage_insert_own"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'listing-images'
    and exists (
      select 1 from public.listings l
      where l.id::text = (storage.foldername(name))[1]
        and l.owner_id = auth.uid()
    )
  );

create policy "listing_images_storage_delete_own_or_admin"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'listing-images'
    and exists (
      select 1 from public.listings l
      where l.id::text = (storage.foldername(name))[1]
        and (l.owner_id = auth.uid() or public.is_admin())
    )
  );
