-- Smart Bookmark Manager schema + RLS policies

create extension if not exists "pgcrypto";

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  title text not null,
  url text not null,
  created_at timestamptz not null default now()
);

grant usage on schema public to anon, authenticated;
grant select, insert, delete on public.bookmarks to authenticated;
revoke all on public.bookmarks from anon;

alter table public.bookmarks enable row level security;
alter table public.bookmarks force row level security;

-- Users can read only their own bookmarks.
create policy "Users can select own bookmarks"
on public.bookmarks
for select
to authenticated
using (auth.uid() = user_id);

-- Users can insert only rows that belong to themselves.
create policy "Users can insert own bookmarks"
on public.bookmarks
for insert
to authenticated
with check (auth.uid() = user_id);

-- Users can delete only their own bookmarks.
create policy "Users can delete own bookmarks"
on public.bookmarks
for delete
to authenticated
using (auth.uid() = user_id);

-- Optional but useful for faster dashboard loads.
create index if not exists idx_bookmarks_user_created
on public.bookmarks (user_id, created_at desc);

-- Realtime: include table in publication.
alter publication supabase_realtime add table public.bookmarks;
