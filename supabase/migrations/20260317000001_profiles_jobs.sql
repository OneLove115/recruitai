-- supabase/migrations/20260317000001_profiles_jobs.sql

-- profiles: one row per authenticated user (tenant)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  company_name text not null,
  industry text,
  team_size text check (team_size in ('solo', '2-5', '6-20', '20+')),
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can manage own profile"
  on profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- jobs: one row per job posting
create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  location text,
  remote boolean default false,
  employment_type text check (employment_type in ('full-time', 'part-time', 'contract', 'internship')),
  description text,
  status text default 'active' check (status in ('active', 'paused', 'closed')),
  created_at timestamptz default now()
);

alter table jobs enable row level security;

create policy "Users can manage own jobs"
  on jobs for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);
