-- candidates: CV submissions / applicants
create table if not exists candidates (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  job_id uuid references jobs(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  linkedin_url text,
  cv_text text,
  stage text not null default 'new' check (stage in ('new', 'screening', 'interview', 'offer', 'hired', 'rejected')),
  ai_score integer check (ai_score >= 0 and ai_score <= 100),
  notes text,
  created_at timestamptz default now()
);

alter table candidates enable row level security;

create policy "Users can manage own candidates"
  on candidates for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- Index for performance
create index if not exists candidates_owner_id_idx on candidates(owner_id);
create index if not exists candidates_job_id_idx on candidates(job_id);
create index if not exists candidates_stage_idx on candidates(stage);
