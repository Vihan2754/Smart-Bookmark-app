-- Run this in Supabase SQL Editor if users can see bookmarks that are not theirs.
-- It removes old permissive policies and re-creates strict per-user policies.

alter table if exists public.bookmarks enable row level security;
alter table if exists public.bookmarks force row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, delete on public.bookmarks to authenticated;
revoke all on public.bookmarks from anon;

-- Drop possibly permissive or old policies.
drop policy if exists "Enable read access for all users" on public.bookmarks;
drop policy if exists "Enable insert for authenticated users only" on public.bookmarks;
drop policy if exists "Enable delete for users based on user_id" on public.bookmarks;
drop policy if exists "Users can select own bookmarks" on public.bookmarks;
drop policy if exists "Users can insert own bookmarks" on public.bookmarks;
drop policy if exists "Users can delete own bookmarks" on public.bookmarks;

-- Recreate strict policies.
create policy "Users can select own bookmarks"
on public.bookmarks
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
on public.bookmarks
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
on public.bookmarks
for delete
to authenticated
using (auth.uid() = user_id);

-- Ensure table is published for realtime updates.
alter publication supabase_realtime add table public.bookmarks;
