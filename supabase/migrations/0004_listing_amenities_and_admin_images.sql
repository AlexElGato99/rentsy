-- Add an amenities list to listings, and let admins attach images to any
-- listing (not just their own) for moderation/support purposes.

alter table public.listings
  add column amenities text[] not null default '{}';

drop policy "listing_images_insert_own" on public.listing_images;

create policy "listing_images_insert_own_or_admin"
  on public.listing_images for insert
  to authenticated
  with check (
    exists (
      select 1 from public.listings l
      where l.id = listing_id and (l.owner_id = auth.uid() or public.is_admin())
    )
  );

drop policy "listing_images_storage_insert_own" on storage.objects;

create policy "listing_images_storage_insert_own_or_admin"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'listing-images'
    and exists (
      select 1 from public.listings l
      where l.id::text = (storage.foldername(name))[1]
        and (l.owner_id = auth.uid() or public.is_admin())
    )
  );
