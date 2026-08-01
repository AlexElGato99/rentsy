-- Add rent-vs-sale listing type, currency, and country to listings.
-- Existing rows default to rent / MAD (Morocco is the primary market);
-- country is left nullable since existing listings don't have one yet.

create type listing_type_enum as enum ('rent', 'sale');

alter table public.listings
  add column listing_type listing_type_enum not null default 'rent',
  add column currency text not null default 'MAD',
  add column country text;

create index listings_listing_type_idx on public.listings (listing_type);
create index listings_country_idx on public.listings (country);
