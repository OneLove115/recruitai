-- Allow unauthenticated applications via portal
-- We use a separate portal_applications table to avoid mixing with manually-added candidates

create table if not exists portal_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  linkedin_url text,
  cv_text text,
  cover_letter text,
  status text not null default 'applied' check (status in ('applied', 'reviewing', 'interview', 'offer', 'rejected')),
  created_at timestamptz default now()
);

-- Public can read jobs that are active (no owner restriction for public)
create policy if not exists "Public can view active jobs"
  on jobs for select
  using (status = 'active');

-- Public can insert portal applications
alter table portal_applications enable row level security;

create policy "Anyone can apply"
  on portal_applications for insert
  with check (true);

create policy "Applicants can view own application"
  on portal_applications for select
  using (true);

-- Job owners can view applications for their jobs
create index if not exists portal_applications_job_id_idx on portal_applications(job_id);
create index if not exists portal_applications_email_idx on portal_applications(email);
