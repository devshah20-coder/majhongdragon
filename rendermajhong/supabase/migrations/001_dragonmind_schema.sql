create extension if not exists "pgcrypto";

create type public.user_role as enum ('user', 'admin', 'coach');
create type public.subscription_tier as enum ('free', 'premium');
create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'cancelled', 'expired');
create type public.content_status as enum ('draft', 'published', 'archived');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  role public.user_role not null default 'user',
  force_password_change boolean not null default false,
  banned_at timestamptz,
  ban_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  tier public.subscription_tier not null default 'free',
  status public.subscription_status not null default 'active',
  currency text not null default 'USD',
  amount_minor integer not null default 0,
  provider text,
  provider_customer_id text,
  provider_subscription_id text,
  trial_ends_at timestamptz,
  current_period_ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.variant_rules (
  id text primary key,
  name text not null,
  players integer not null default 4,
  rules jsonb not null default '{}'::jsonb,
  scoring jsonb not null default '{}'::jsonb,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.games (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  variant_id text references public.variant_rules(id),
  mode text not null,
  title text,
  state jsonb not null default '{}'::jsonb,
  replay jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.hand_analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  game_id uuid references public.games(id) on delete cascade,
  variant_id text references public.variant_rules(id),
  input jsonb not null,
  result jsonb not null,
  created_at timestamptz not null default now()
);

create table public.puzzles (
  id uuid primary key default gen_random_uuid(),
  variant_id text references public.variant_rules(id),
  difficulty text not null,
  prompt text not null,
  state jsonb not null,
  solution jsonb not null,
  publish_on date,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  track text not null,
  slug text unique not null,
  title text not null,
  body jsonb not null,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body jsonb not null,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.american_mahjong_cards (
  id uuid primary key default gen_random_uuid(),
  year integer unique not null,
  hands jsonb not null,
  status public.content_status not null default 'draft',
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_settings (
  id boolean primary key default true,
  company_name text not null default 'DragonMind Mahjong',
  support_email text,
  business_email text,
  discord_invite text,
  facebook text,
  instagram text,
  youtube text,
  x_twitter text,
  github text,
  business_address text,
  support_hours text,
  updated_at timestamptz not null default now(),
  constraint single_contact_row check (id)
);

create table public.site_pages (
  slug text primary key,
  title text not null,
  body jsonb not null,
  updated_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  starts_at timestamptz,
  ends_at timestamptz,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_table text,
  target_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.admin_bootstrap (
  username text primary key,
  initial_password text not null,
  force_password_change boolean not null default true,
  note text not null
);

insert into public.admin_bootstrap (username, initial_password, note)
values ('admin', 'Devshah@11', 'Create this Supabase Auth user during deployment, then mark force_password_change=true in profiles.')
on conflict (username) do nothing;

insert into public.contact_settings (id, support_email, business_email, support_hours)
values (true, 'support@dragonmindmahjong.com', 'business@dragonmindmahjong.com', 'Mon-Fri, 9 AM-6 PM')
on conflict (id) do nothing;

insert into public.variant_rules (id, name, players, rules, scoring) values
('riichi', 'Japanese Riichi Mahjong', 4, '{"riichi":true,"furiten":true,"dora":true}', '{"type":"han_fu"}'),
('sanma', 'Sanma', 3, '{"riichi":true,"north_dora":true}', '{"type":"han_fu"}'),
('hong_kong', 'Hong Kong Mahjong', 4, '{}', '{"type":"fan"}'),
('mcr', 'Chinese Official Mahjong', 4, '{}', '{"type":"mcr_fan"}'),
('taiwanese', 'Taiwanese Mahjong', 4, '{"hand_size":16}', '{"type":"taiwanese"}'),
('american', 'American Mahjong', 4, '{"annual_card":true}', '{"type":"card_points"}'),
('singapore', 'Singapore Mahjong', 4, '{"animals":true,"flowers":true}', '{"type":"fan"}'),
('malaysian', 'Malaysian Mahjong', 4, '{}', '{"type":"regional"}'),
('filipino', 'Filipino Mahjong', 4, '{}', '{"type":"regional"}'),
('korean', 'Korean Mahjong', 4, '{"common_no_bamboo":true}', '{"type":"regional"}'),
('sichuan', 'Sichuan Mahjong', 4, '{"exchange_three":true,"missing_suit":true}', '{"type":"regional"}'),
('classical_chinese', 'Classical Chinese Mahjong', 4, '{}', '{"type":"classical"}'),
('british', 'British Mahjong', 4, '{}', '{"type":"regional"}'),
('australian', 'Australian Mahjong', 4, '{}', '{"type":"regional"}'),
('tournament_custom', 'Tournament / Custom Rule Sets', 4, '{"custom":true}', '{"type":"custom"}')
on conflict (id) do nothing;

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.games enable row level security;
alter table public.hand_analyses enable row level security;
alter table public.variant_rules enable row level security;
alter table public.puzzles enable row level security;
alter table public.lessons enable row level security;
alter table public.blog_posts enable row level security;
alter table public.american_mahjong_cards enable row level security;
alter table public.contact_settings enable row level security;
alter table public.site_pages enable row level security;
alter table public.announcements enable row level security;
alter table public.audit_logs enable row level security;

create policy "users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "users own games" on public.games for all using (auth.uid() = user_id);
create policy "users own analyses" on public.hand_analyses for all using (auth.uid() = user_id);
create policy "users own subscriptions" on public.subscriptions for select using (auth.uid() = user_id);
create policy "public read enabled variants" on public.variant_rules for select using (enabled);
create policy "public read published puzzles" on public.puzzles for select using (status = 'published');
create policy "public read published lessons" on public.lessons for select using (status = 'published');
create policy "public read published posts" on public.blog_posts for select using (status = 'published');
create policy "public read contact" on public.contact_settings for select using (true);
create policy "public read site pages" on public.site_pages for select using (true);
create policy "public read announcements" on public.announcements for select using (status = 'published');

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin' and banned_at is null);
$$;

create policy "admins manage profiles" on public.profiles for all using (public.is_admin());
create policy "admins manage subscriptions" on public.subscriptions for all using (public.is_admin());
create policy "admins manage variants" on public.variant_rules for all using (public.is_admin());
create policy "admins manage puzzles" on public.puzzles for all using (public.is_admin());
create policy "admins manage lessons" on public.lessons for all using (public.is_admin());
create policy "admins manage blog" on public.blog_posts for all using (public.is_admin());
create policy "admins manage american cards" on public.american_mahjong_cards for all using (public.is_admin());
create policy "admins manage contact" on public.contact_settings for all using (public.is_admin());
create policy "admins manage site pages" on public.site_pages for all using (public.is_admin());
create policy "admins manage announcements" on public.announcements for all using (public.is_admin());
create policy "admins read audit logs" on public.audit_logs for select using (public.is_admin());
