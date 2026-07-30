-- Fix: protect_profile_role blocked service-role (backend/admin script) role
-- changes too, since auth.uid() is null outside a user JWT context and
-- is_admin() therefore evaluated false. RLS already restricts which rows a
-- normal client can reach here (only self or an admin), so auth.uid() is
-- guaranteed non-null for any request that isn't already a trusted
-- service-role context -- safe to let those through unconditionally.

create or replace function public.protect_profile_role()
returns trigger
language plpgsql
as $$
begin
  if new.role is distinct from old.role
     and auth.uid() is not null
     and not public.is_admin() then
    new.role = old.role;
  end if;
  return new;
end;
$$;
