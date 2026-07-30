-- Phase 1: profiles table, role enum, auto-provisioning trigger, RLS.

create type role_type as enum ('admin', 'seller', 'customer');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role role_type not null default 'customer',
  full_name text,
  phone text,
  whatsapp text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Generic "touch updated_at" trigger function, reused by later migrations.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

-- SECURITY DEFINER so RLS on `profiles` doesn't recurse when policies call this.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Auto-create a profile row when a new auth user signs up.
-- `role`/`full_name` come from options.data passed to supabase.auth.signUp().
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_role text := new.raw_user_meta_data ->> 'role';
begin
  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    case
      when requested_role in ('seller', 'customer') then requested_role::role_type
      else 'customer'::role_type
    end,
    new.raw_user_meta_data ->> 'full_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Prevent a non-admin from changing their own `role` via a client UPDATE.
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    new.role = old.role;
  end if;
  return new;
end;
$$;

create trigger profiles_protect_role
  before update on public.profiles
  for each row
  execute function public.protect_profile_role();

alter table public.profiles enable row level security;

-- Any authenticated user can read any profile (needed for listing owner
-- names/contact info, message sender names, etc.). Anonymous visitors cannot.
create policy "profiles_select_authenticated"
  on public.profiles for select
  to authenticated
  using (true);

-- Users can update their own row; admins can update any row.
-- Role-escalation is blocked separately by the protect_profile_role trigger.
create policy "profiles_update_own_or_admin"
  on public.profiles for update
  to authenticated
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

-- No insert/delete policies: rows are created only by handle_new_user()
-- (SECURITY DEFINER) and deleted only via auth.users cascade.
