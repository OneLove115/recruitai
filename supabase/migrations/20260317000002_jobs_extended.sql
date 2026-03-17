-- Add extended fields to jobs table
alter table jobs
  add column if not exists requirements text,
  add column if not exists salary_min integer,
  add column if not exists salary_max integer,
  add column if not exists hidden_criteria jsonb default '[]'::jsonb;
