create extension if not exists "pgcrypto";

create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  roll_no text unique not null,
  name text not null,
  descriptor jsonb not null,
  created_at timestamptz default now()
);

create table if not exists attendance (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  date date not null,
  marked_at timestamptz default now(),
  unique (student_id, date)
);

-- RLS on, no public policies: only the server (service role key) can access data
alter table students enable row level security;
alter table attendance enable row level security;
