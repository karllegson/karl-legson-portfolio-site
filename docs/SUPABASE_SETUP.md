# Supabase setup for this site

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. **New project** → pick org, name, database password, region.
3. Wait for the project to be ready.

## 2. Get your keys

In the Supabase dashboard: **Project Settings** → **API**.

- **Project URL** → use as `VITE_SUPABASE_URL`
- **anon public** key → use as `VITE_SUPABASE_ANON_KEY`

## 3. Add env vars locally

In the project root, create or edit `.env`:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Restart the dev server after changing `.env`.

## 4. Create the contact submissions table

In Supabase: **SQL Editor** → **New query**, paste and run:

```sql
-- Table for contact form submissions (and any future data you want to store)
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Allow anonymous inserts (so the contact form can save from the browser).
-- Only the anon key can insert; no one can read/update/delete without auth.
alter table public.contact_submissions enable row level security (rls);

create policy "Allow anonymous insert"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- Optional: allow only authenticated users to read (e.g. you log in to Supabase dashboard or your own app)
create policy "Allow authenticated read"
  on public.contact_submissions
  for select
  to authenticated
  using (true);
```

After this, the contact form will save each submission to Supabase when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set. EmailJS (if configured) still sends the email; Supabase is an extra backup/store.

## 5. Create the Kristel quiz runs table

In Supabase: **SQL Editor** → **New query**, paste and run:

```sql
create table if not exists public.kristel_runs (
  id uuid primary key default gen_random_uuid(),
  device_id text not null,
  score int not null,
  total int not null,
  answers jsonb not null, -- array of selected option indices
  created_at timestamptz default now()
);

alter table public.kristel_runs enable row level security (rls);

-- Allow anonymous insert (client-side). Reads require auth by default.
create policy "Allow anon insert"
  on public.kristel_runs
  for insert
  to anon
  with check (true);
```

After this, quiz completions on `/kristel` will save a row when Supabase is configured.

## 5. Viewing submissions

- In Supabase: **Table Editor** → `contact_submissions`.
- Or use the SQL Editor: `select * from public.contact_submissions order by created_at desc;`

## Disabling Supabase

Remove or leave empty `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`. The app will run without Supabase; the contact form will only use EmailJS (if configured).
