-- Porch database. Paste this whole file into Supabase → SQL Editor → Run.
-- Anyone with the site link can join, so every table is open to the public key for now.

create table members (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 30),
  pfp text not null,
  created_at timestamptz not null default now()
);

create table posts (
  id bigint generated always as identity primary key,
  member_id uuid not null references members on delete cascade,
  body text not null check (char_length(body) between 1 and 280),
  created_at timestamptz not null default now()
);

-- Questions people have added. used_on is set when one goes out.
create table bank (
  id bigint generated always as identity primary key,
  member_id uuid not null references members on delete cascade,
  question text not null check (char_length(question) between 1 and 200),
  used_on date,
  created_at timestamptz not null default now()
);

-- One prompt per Monday and Thursday.
create table prompts (
  slot date primary key,
  question text not null,
  member_id uuid references members on delete set null,
  created_at timestamptz not null default now()
);

create table answers (
  id bigint generated always as identity primary key,
  slot date not null references prompts on delete cascade,
  member_id uuid not null references members on delete cascade,
  body text not null check (char_length(body) between 1 and 5000),
  created_at timestamptz not null default now(),
  unique (slot, member_id)
);

create table comments (
  id bigint generated always as identity primary key,
  kind text not null check (kind in ('post', 'answer')),
  target_id bigint not null,
  member_id uuid not null references members on delete cascade,
  body text not null check (char_length(body) between 1 and 500),
  created_at timestamptz not null default now()
);
create index on comments (kind, target_id);

-- Picks the prompt for a day exactly once: the oldest question in the bank,
-- or the default the site passes in when the bank is empty.
create or replace function issue_prompt(p_slot date, p_default text)
returns prompts language plpgsql security definer set search_path = public as $$
declare r prompts; b bank;
begin
  select * into r from prompts where slot = p_slot;
  if found then return r; end if;
  select * into b from bank where used_on is null order by created_at, id limit 1 for update skip locked;
  if found then
    insert into prompts (slot, question, member_id) values (p_slot, b.question, b.member_id)
      on conflict do nothing returning * into r;
    if r.slot is not null then update bank set used_on = p_slot where id = b.id; end if;
  else
    insert into prompts (slot, question) values (p_slot, p_default)
      on conflict do nothing returning * into r;
  end if;
  if r.slot is null then select * into r from prompts where slot = p_slot; end if;
  return r;
end $$;
grant execute on function issue_prompt(date, text) to anon;

alter table members enable row level security;
alter table posts enable row level security;
alter table bank enable row level security;
alter table prompts enable row level security;
alter table answers enable row level security;
alter table comments enable row level security;

create policy "read" on members for select using (true);
create policy "join" on members for insert with check (true);
create policy "read" on posts for select using (true);
create policy "write" on posts for insert with check (true);
create policy "read" on bank for select using (true);
create policy "add" on bank for insert with check (true);
create policy "remove unused" on bank for delete using (used_on is null);
create policy "read" on prompts for select using (true);
create policy "read" on answers for select using (true);
create policy "write" on answers for insert with check (true);
create policy "read" on comments for select using (true);
create policy "write" on comments for insert with check (true);
