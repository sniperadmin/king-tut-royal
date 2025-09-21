-- =====================================================================
-- DROP EVERYTHING CREATED BY THE PACKAGES × PARTNERS SCHEMA
-- (keeps extensions; safe to run multiple times)
-- =====================================================================
begin;

-- -------------------------
-- Views (drop first)
-- -------------------------
drop view if exists public.partner_with_packages_view;
drop view if exists public.package_partners_view;
drop view if exists public.partners_view;
drop view if exists public.packages_view;

-- -------------------------
-- Triggers
-- -------------------------
drop trigger if exists trg_packages_slug on public.packages;

-- -------------------------
-- Functions (helpers/RPCs)
-- -------------------------
drop function if exists public.get_package(text);
drop function if exists public.upsert_package_from_json(jsonb);
drop function if exists public.attach_partners(uuid, jsonb);
drop function if exists public.upsert_partner_from_json(jsonb);
drop function if exists public.packages_set_slug();
drop function if exists public.parse_price_to_cents(text);
drop function if exists public.slugify(text);

-- -------------------------
-- Tables (children → parents)
-- -------------------------

-- Link table & role catalog
drop table if exists public.package_partner_links cascade;
drop table if exists public.partner_roles cascade;

-- Partner sub-entities
drop table if exists public.partner_media cascade;
drop table if exists public.partner_logos cascade;

-- Partners root
drop table if exists public.partners cascade;

-- Package sub-entities
drop table if exists public.itinerary_steps cascade;
drop table if exists public.itinerary_days cascade;
drop table if exists public.package_videos cascade;
drop table if exists public.package_images cascade;
drop table if exists public.package_highlights cascade;
drop table if exists public.booking_details cascade;

-- Packages root
drop table if exists public.packages cascade;

-- Icons catalog
drop table if exists public.icons cascade;

-- (Row Level Security policies are dropped automatically with their tables)

commit;


-- =====================================================================
-- FINAL SCHEMA: PACKAGES × PARTNERS (Supabase/Postgres)
-- =====================================================================
begin;

-- -------------------------
-- Extensions (safe to re-run)
-- -------------------------
create extension if not exists pgcrypto;   -- gen_random_uuid
create extension if not exists pg_trgm;

-- -------------------------
-- Utilities
-- -------------------------
create or replace function public.slugify(txt text) returns text
language sql immutable as $$
  select regexp_replace(lower(trim(txt)), '\s+', '-', 'g')
$$;

create or replace function public.parse_price_to_cents(p text)
returns integer language plpgsql immutable as $$
declare
  digits text;
begin
  digits := regexp_replace(p, '[^0-9]', '', 'g');
  if digits = '' then return null; end if;
  return (digits)::bigint * 100;
end;
$$;

-- =====================================================================
-- ICONS (flexible taxonomy; no enums)
-- =====================================================================
create table if not exists public.icons (
  id          bigserial primary key,
  key         text unique not null,     -- e.g., 'crown', 'star', 'pyramid_gold'
  label       text,
  asset_url   text,
  meta        jsonb,
  created_at  timestamptz not null default now()
);

-- =====================================================================
-- PACKAGES (root)
-- =====================================================================
create table if not exists public.packages (
  id                 uuid primary key default gen_random_uuid(),
  key                text unique,                    -- optional external key
  title              text not null unique,
  slug               text not null unique,
  image_url          text,
  icon_key           text references public.icons(key) on delete set null,
  is_popular         boolean not null default false,

  -- Pricing (normalized + original)
  price_text         text,
  price_amount_cents integer,
  price_currency     text check (price_currency is null or char_length(price_currency)=3),

  -- Duration
  duration_text      text,
  days               integer,
  nights             integer,

  -- Descriptive
  overview           text,
  accommodation      text,
  benefits           text,

  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists packages_is_popular_idx on public.packages(is_popular);
create index if not exists packages_created_at_idx on public.packages(created_at);

-- Slug & updated_at trigger
create or replace function public.packages_set_slug()
returns trigger language plpgsql as $$
begin
  if new.slug is null or new.slug = '' then
    new.slug := public.slugify(new.title);
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_packages_slug on public.packages;
create trigger trg_packages_slug
before insert or update of title on public.packages
for each row execute procedure public.packages_set_slug();

-- =====================================================================
-- PACKAGE SUB-ENTITIES (normalized)
-- =====================================================================
-- Booking (1:1)
create table if not exists public.booking_details (
  package_id     uuid primary key references public.packages(id) on delete cascade,
  company_name   text,
  address        text,
  website        text,
  email          text,
  whatsapp       text,
  price_text     text,
  price_amount_cents integer,
  price_currency text check (price_currency is null or char_length(price_currency)=3)
);

-- Highlights (1:N)
create table if not exists public.package_highlights (
  id          bigserial primary key,
  package_id  uuid not null references public.packages(id) on delete cascade,
  position    int not null,
  highlight   text not null
);
create index if not exists package_highlights_pkg_pos_idx on public.package_highlights(package_id, position);

-- Images (1:N)
create table if not exists public.package_images (
  id          bigserial primary key,
  package_id  uuid not null references public.packages(id) on delete cascade,
  position    int not null,
  image_url   text not null,
  alt_text    text
);
create index if not exists package_images_pkg_pos_idx on public.package_images(package_id, position);

-- Videos (1:N)
create table if not exists public.package_videos (
  id          bigserial primary key,
  package_id  uuid not null references public.packages(id) on delete cascade,
  position    int not null,
  video_id    int,
  url         text not null,
  title       text,
  muted       boolean not null default false
);
create index if not exists package_videos_pkg_pos_idx on public.package_videos(package_id, position);

-- Itinerary (days + steps)
create table if not exists public.itinerary_days (
  id          bigserial primary key,
  package_id  uuid not null references public.packages(id) on delete cascade,
  position    int not null,
  day_label   text not null
);
create unique index if not exists itinerary_days_pkg_pos_uidx on public.itinerary_days(package_id, position);

create table if not exists public.itinerary_steps (
  id               bigserial primary key,
  itinerary_day_id bigint not null references public.itinerary_days(id) on delete cascade,
  position         int not null,
  description      text not null
);
create index if not exists itinerary_steps_day_pos_idx on public.itinerary_steps(itinerary_day_id, position);

-- =====================================================================
-- PARTNERS (first-class, webapp-managed)
-- =====================================================================
create table if not exists public.partners (
  id           text primary key,             -- stable external id
  name         text not null,
  description  text,
  website      text,
  about        text,
  services     jsonb,                        -- string[] or richer later
  meta         jsonb,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Responsive logos
create table if not exists public.partner_logos (
  partner_id   text not null references public.partners(id) on delete cascade,
  size_key     text not null check (size_key in ('small','medium','large')),
  url          text not null,
  primary key (partner_id, size_key)
);

-- Mixed media (image/video) gallery
create table if not exists public.partner_media (
  id           bigserial primary key,
  partner_id   text not null references public.partners(id) on delete cascade,
  position     int not null,
  media_type   text not null check (media_type in ('image','video')),
  src          text not null,
  thumbnail    text,
  srcset       text,
  sizes        text
);
create index if not exists partner_media_partner_pos_idx on public.partner_media(partner_id, position);

-- =====================================================================
-- PARTNER ROLES + RICH PACKAGE↔PARTNER LINKS
-- =====================================================================
-- Roles (data, not enum) to keep it open-ended
create table if not exists public.partner_roles (
  key        text primary key,          -- e.g., 'hotel','transport','guide','sponsor','venue','dining','ticketing'
  label      text,
  created_at timestamptz default now()
);

-- Seed common roles (idempotent)
insert into public.partner_roles(key, label) values
  ('hotel','Hotel'), ('transport','Transport'), ('guide','Guide'),
  ('sponsor','Sponsor'), ('venue','Venue'), ('dining','Dining'),
  ('ticketing','Ticketing')
on conflict (key) do nothing;

-- Rich M:N link: allows zero/one/many partners per package with roles & validity
create table if not exists public.package_partner_links (
  id              bigserial primary key,
  package_id      uuid not null references public.packages(id) on delete cascade,
  partner_id      text not null references public.partners(id) on delete restrict,
  role_key        text references public.partner_roles(key) on delete set null,
  is_primary      boolean not null default false,
  position        int not null default 1,
  valid_from      date,
  valid_to        date,
  revenue_share_pct numeric(5,2),
  contract_ref    text,
  notes           text,
  meta            jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (package_id, partner_id, role_key)
);

create index if not exists ppl_pkg_idx on public.package_partner_links(package_id);
create index if not exists ppl_partner_idx on public.package_partner_links(partner_id);
create index if not exists ppl_role_idx on public.package_partner_links(role_key);
create index if not exists ppl_valid_range_idx on public.package_partner_links(valid_from, valid_to);

-- =====================================================================
-- RLS (public read; adjust writes via service role or custom policies)
-- =====================================================================
alter table public.icons                  enable row level security;
alter table public.packages               enable row level security;
alter table public.booking_details        enable row level security;
alter table public.package_highlights     enable row level security;
alter table public.package_images         enable row level security;
alter table public.package_videos         enable row level security;
alter table public.itinerary_days         enable row level security;
alter table public.itinerary_steps        enable row level security;
alter table public.partners               enable row level security;
alter table public.partner_logos          enable row level security;
alter table public.partner_media          enable row level security;
alter table public.partner_roles          enable row level security;
alter table public.package_partner_links  enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='icons' and policyname='read_all_public') then
    create policy "read_all_public" on public.icons for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='packages' and policyname='read_all_public') then
    create policy "read_all_public" on public.packages for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='booking_details' and policyname='read_all_public') then
    create policy "read_all_public" on public.booking_details for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='package_highlights' and policyname='read_all_public') then
    create policy "read_all_public" on public.package_highlights for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='package_images' and policyname='read_all_public') then
    create policy "read_all_public" on public.package_images for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='package_videos' and policyname='read_all_public') then
    create policy "read_all_public" on public.package_videos for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='itinerary_days' and policyname='read_all_public') then
    create policy "read_all_public" on public.itinerary_days for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='itinerary_steps' and policyname='read_all_public') then
    create policy "read_all_public" on public.itinerary_steps for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='partners' and policyname='read_all_public') then
    create policy "read_all_public" on public.partners for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='partner_logos' and policyname='read_all_public') then
    create policy "read_all_public" on public.partner_logos for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='partner_media' and policyname='read_all_public') then
    create policy "read_all_public" on public.partner_media for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='partner_roles' and policyname='read_all_public') then
    create policy "read_all_public" on public.partner_roles for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='package_partner_links' and policyname='read_all_public') then
    create policy "read_all_public" on public.package_partner_links for select using (true);
  end if;
end$$;

-- =====================================================================
-- JSON VIEWS (webapp-friendly)
-- =====================================================================

-- a) Packages → hydrated package JSON (without partners; see c for partners)
drop view if exists public.packages_view;
create view public.packages_view as
select
  p.id,
  p.slug,
  jsonb_build_object(
    'id', p.id,
    'key', p.key,
    'title', p.title,
    'slug', p.slug,
    'image', p.image_url,
    'icon', i.key,
    'iconLabel', i.label,
    'iconAsset', i.asset_url,
    'isPopular', p.is_popular,
    'price', p.price_text,
    'priceAmountCents', p.price_amount_cents,
    'priceCurrency', p.price_currency,
    'duration', p.duration_text,
    'days', p.days,
    'nights', p.nights,
    'highlights', coalesce(
      (select jsonb_agg(ph.highlight order by ph.position)
       from public.package_highlights ph
       where ph.package_id = p.id),
      '[]'::jsonb
    ),
    'videos', coalesce(
      (select jsonb_agg(jsonb_build_object(
          'id', v.video_id,
          'url', v.url,
          'title', v.title,
          'muted', v.muted
        ) order by v.position)
       from public.package_videos v
       where v.package_id = p.id),
      '[]'::jsonb
    ),
    'details', jsonb_build_object(
      'overview', p.overview,
      'accommodation', p.accommodation,
      'benefits', p.benefits,
      'booking', (
        select to_jsonb(b) - 'package_id'
        from public.booking_details b
        where b.package_id = p.id
      ),
      'images', coalesce(
        (select jsonb_agg(jsonb_build_object('url', pi.image_url, 'alt', pi.alt_text) order by pi.position)
         from public.package_images pi
         where pi.package_id = p.id),
        '[]'::jsonb
      ),
      'itinerary', coalesce(
        (select jsonb_agg(
           jsonb_build_object(
             'day', d.day_label,
             'description', (
               select jsonb_agg(s.description order by s.position)
               from public.itinerary_steps s
               where s.itinerary_day_id = d.id
             )
           )
         order by d.position)
         from public.itinerary_days d
         where d.package_id = p.id),
        '[]'::jsonb
      )
    ),
    'createdAt', p.created_at,
    'updatedAt', p.updated_at
  ) as package
from public.packages p
left join public.icons i on p.icon_key = i.key;

comment on view public.packages_view is
'Package JSON (no partners). Use package_partners_view for partner badges/links.';

-- b) Partner card JSON (logos + media)
drop view if exists public.partners_view;
create view public.partners_view as
select
  p.id,
  jsonb_build_object(
    'id', p.id,
    'name', p.name,
    'description', p.description,
    'website', p.website,
    'about', p.about,
    'services', coalesce(p.services, '[]'::jsonb),
    'logo', jsonb_build_object(
      'small',  (select l.url from public.partner_logos l where l.partner_id=p.id and l.size_key='small'),
      'medium', (select l.url from public.partner_logos l where l.partner_id=p.id and l.size_key='medium'),
      'large',  (select l.url from public.partner_logos l where l.partner_id=p.id and l.size_key='large')
    ),
    'media', coalesce(
      (select jsonb_agg(jsonb_build_object(
          'type', m.media_type,
          'src', m.src,
          'thumbnail', m.thumbnail,
          'srcSet', m.srcset,
          'sizes', m.sizes
        ) order by m.position)
       from public.partner_media m
       where m.partner_id = p.id),
      '[]'::jsonb
    )
  ) as partner
from public.partners p;

-- c) Package → partners (grouped by role; supports zero partners)
drop view if exists public.package_partners_view;
create view public.package_partners_view as
select
  pk.id,
  jsonb_build_object(
    'packageId', pk.id,
    'title', pk.title,
    'slug', pk.slug,
    'partners',
    jsonb_strip_nulls(
      jsonb_build_object(
        -- non-null roles grouped into an object
        'byRole',
        nullif((
          select jsonb_object_agg(rk, payload)
          from (
            select ppl.role_key as rk,
                   jsonb_agg(jsonb_build_object(
                     'id', pr.id,
                     'name', pr.name,
                     'website', pr.website,
                     'isPrimary', ppl.is_primary,
                     'position', ppl.position,
                     'validFrom', ppl.valid_from,
                     'validTo', ppl.valid_to,
                     'revenueSharePct', ppl.revenue_share_pct,
                     'contractRef', ppl.contract_ref,
                     'notes', ppl.notes,
                     'meta', ppl.meta,
                     'logo', jsonb_build_object(
                       'small',  (select l.url from public.partner_logos l where l.partner_id=pr.id and l.size_key='small'),
                       'medium', (select l.url from public.partner_logos l where l.partner_id=pr.id and l.size_key='medium'),
                       'large',  (select l.url from public.partner_logos l where l.partner_id=pr.id and l.size_key='large')
                     )
                   )
                   order by ppl.is_primary desc, ppl.position, pr.name) as payload
            from public.package_partner_links ppl
            join public.partners pr on pr.id = ppl.partner_id
            where ppl.package_id = pk.id
              and ppl.role_key is not null
            group by ppl.role_key
          ) t
        ), '{}'::jsonb),

        -- role-less partners in a separate array
        'unassigned',
        nullif((
          select jsonb_agg(jsonb_build_object(
                   'id', pr.id,
                   'name', pr.name,
                   'website', pr.website,
                   'isPrimary', ppl.is_primary,
                   'position', ppl.position,
                   'validFrom', ppl.valid_from,
                   'validTo', ppl.valid_to,
                   'revenueSharePct', ppl.revenue_share_pct,
                   'contractRef', ppl.contract_ref,
                   'notes', ppl.notes,
                   'meta', ppl.meta,
                   'logo', jsonb_build_object(
                     'small',  (select l.url from public.partner_logos l where l.partner_id=pr.id and l.size_key='small'),
                     'medium', (select l.url from public.partner_logos l where l.partner_id=pr.id and l.size_key='medium'),
                     'large',  (select l.url from public.partner_logos l where l.partner_id=pr.id and l.size_key='large')
                   )
                 )
                 order by ppl.is_primary desc, ppl.position, pr.name)
          from public.package_partner_links ppl
          join public.partners pr on pr.id = ppl.partner_id
          where ppl.package_id = pk.id
            and ppl.role_key is null
        ), '[]'::jsonb)
      )
    )
  ) as package
from public.packages pk;


-- d) Partner → active packages (date-windowed)
drop view if exists public.partner_with_packages_view;
create view public.partner_with_packages_view as
select
  pr.id,
  jsonb_build_object(
    'partnerId', pr.id,
    'name', pr.name,
    'activePackages',
    coalesce(
      (
        select jsonb_agg(jsonb_build_object(
                 'id', pk.id,
                 'title', pk.title,
                 'slug', pk.slug,
                 'image', pk.image_url,
                 'price', pk.price_text,
                 'role', ppl.role_key,
                 'isPrimary', ppl.is_primary,
                 'validFrom', ppl.valid_from,
                 'validTo', ppl.valid_to
               )
               order by ppl.is_primary desc, ppl.position, pk.title)
        from public.package_partner_links ppl
        join public.packages pk on pk.id = ppl.package_id
        where ppl.partner_id = pr.id
          and (ppl.valid_from is null or ppl.valid_from <= current_date)
          and (ppl.valid_to   is null or ppl.valid_to   >= current_date)
      ),
      '[]'::jsonb
    )
  ) as partner
from public.partners pr;

-- =====================================================================
-- RPC HELPERS
-- =====================================================================

-- Upsert a single partner payload (mirrors TS shape)
create or replace function public.upsert_partner_from_json(p jsonb)
returns text
language plpgsql as $$
declare
  v_id text := p->>'id';
begin
  if v_id is null or v_id = '' then
    raise exception 'partner.id is required';
  end if;

  insert into public.partners (id, name, description, website, about, services, meta)
  values (
    v_id,
    p->>'name',
    p->>'description',
    p->>'website',
    p->>'about',
    case when p ? 'services' then p->'services' else '[]'::jsonb end,
    p->'meta'
  )
  on conflict (id) do update set
    name        = excluded.name,
    description = excluded.description,
    website     = excluded.website,
    about       = excluded.about,
    services    = excluded.services,
    meta        = excluded.meta,
    updated_at  = now();

  -- Logos
  delete from public.partner_logos where partner_id = v_id;
  insert into public.partner_logos (partner_id, size_key, url)
  select v_id, k, v
  from jsonb_each_text(coalesce(p->'logo','{}'::jsonb)) as t(k, v)
  where k in ('small','medium','large');

  -- Media
  delete from public.partner_media where partner_id = v_id;
  insert into public.partner_media (partner_id, position, media_type, src, thumbnail, srcset, sizes)
  select v_id, ord::int,
         m->>'type',
         m->>'src',
         m->>'thumbnail',
         m->>'srcSet',
         m->>'sizes'
  from jsonb_array_elements(coalesce(p->'media','[]'::jsonb)) with ordinality as t(m, ord);

  return v_id;
end;
$$;

-- Attach/replace partners for a given package (idempotent)
create or replace function public.attach_partners(pkg_id uuid, partners jsonb)
returns void
language plpgsql as $$
begin
  delete from public.package_partner_links where package_id = pkg_id;

  insert into public.package_partner_links
    (package_id, partner_id, role_key, is_primary, position, valid_from, valid_to, revenue_share_pct, contract_ref, notes, meta)
  select
    pkg_id,
    p->>'id',
    nullif(p->>'role',''),
    coalesce( (p->>'isPrimary')::boolean, false ),
    coalesce( nullif(p->>'position','')::int, 1 ),
    (p->>'validFrom')::date,
    (p->>'validTo')::date,
    nullif(p->>'revenueSharePct','')::numeric,
    p->>'contractRef',
    p->>'notes',
    coalesce(p->'meta','{}'::jsonb)
  from jsonb_array_elements(coalesce(partners,'[]'::jsonb)) as t(p)
  where p ? 'id';
end;
$$;

-- Upsert a package from JSON (includes partner linking; FIXED itinerary insertion)
create or replace function public.upsert_package_from_json(pkg jsonb)
returns uuid
language plpgsql as $$
declare
  v_id uuid;
  v_title text := pkg->>'title';
  v_icon_key text := coalesce(pkg->>'icon', pkg#>>'{icon,key}');
  v_price_text text := pkg->>'price';
  v_currency text := nullif(pkg->>'priceCurrency','');
  v_duration text := pkg->>'duration';
begin
  if v_title is null or length(trim(v_title))=0 then
    raise exception 'title is required';
  end if;

  -- Ensure icon exists (if provided)
  if v_icon_key is not null and v_icon_key <> '' then
    insert into public.icons(key, label) values (v_icon_key, initcap(replace(v_icon_key,'_',' ')))
    on conflict(key) do nothing;
  end if;

  -- Upsert package
  insert into public.packages (
    key, title, slug, image_url, icon_key, is_popular,
    price_text, price_amount_cents, price_currency,
    duration_text, days, nights,
    overview, accommodation, benefits
  ) values (
    pkg->>'key',
    v_title,
    coalesce(pkg->>'slug', public.slugify(v_title)),
    pkg->>'image',
    nullif(v_icon_key,''),
    coalesce((pkg->>'isPopular')::boolean, false),
    v_price_text,
    public.parse_price_to_cents(v_price_text),
    v_currency,
    v_duration,
    nullif((pkg->>'days'),'')::int,
    nullif((pkg->>'nights'),'')::int,
    pkg#>>'{details,overview}',
    pkg#>>'{details,accommodation}',
    pkg#>>'{details,benefits}'
  )
  on conflict (title) do update set
    image_url          = excluded.image_url,
    icon_key           = excluded.icon_key,
    is_popular         = excluded.is_popular,
    price_text         = excluded.price_text,
    price_amount_cents = excluded.price_amount_cents,
    price_currency     = excluded.price_currency,
    duration_text      = excluded.duration_text,
    days               = excluded.days,
    nights             = excluded.nights,
    overview           = excluded.overview,
    accommodation      = excluded.accommodation,
    benefits           = excluded.benefits,
    updated_at         = now()
  returning id into v_id;

  -- Booking
  insert into public.booking_details (
    package_id, company_name, address, website, email, whatsapp,
    price_text, price_amount_cents, price_currency
  )
  values (
    v_id,
    pkg#>>'{details,booking,companyName}',
    pkg#>>'{details,booking,address}',
    pkg#>>'{details,booking,website}',
    pkg#>>'{details,booking,email}',
    pkg#>>'{details,booking,whatsapp}',
    pkg#>>'{details,booking,price}',
    public.parse_price_to_cents(pkg#>>'{details,booking,price}'),
    nullif(pkg#>>'{details,booking,currency}','')
  )
  on conflict (package_id) do update set
    company_name = excluded.company_name,
    address      = excluded.address,
    website      = excluded.website,
    email        = excluded.email,
    whatsapp     = excluded.whatsapp,
    price_text   = excluded.price_text,
    price_amount_cents = excluded.price_amount_cents,
    price_currency     = excluded.price_currency;

  -- Highlights
  delete from public.package_highlights where package_id = v_id;
  insert into public.package_highlights (package_id, position, highlight)
  select v_id, ord::int, val
  from jsonb_array_elements_text(coalesce(pkg->'highlights','[]'::jsonb)) with ordinality as t(val, ord);

  -- Images (supports array of strings or [url, alt])
  delete from public.package_images where package_id = v_id;
  insert into public.package_images (package_id, position, image_url, alt_text)
  select v_id, ord::int, i->>0, i->>1
  from (
    select case
             when jsonb_typeof(elem) = 'string' then jsonb_build_array(elem, null)
             else elem
           end as i, ord
    from jsonb_array_elements(coalesce(pkg#>'{details,images}','[]'::jsonb)) with ordinality as t(elem, ord)
  ) s;

  -- Videos
  delete from public.package_videos where package_id = v_id;
  insert into public.package_videos (package_id, position, video_id, url, title, muted)
  select v_id, ord::int,
         nullif(v->>'id','')::int,
         v->>'url',
         v->>'title',
         coalesce((v->>'muted')::boolean, false)
  from jsonb_array_elements(coalesce(pkg->'videos','[]'::jsonb)) with ordinality as t(v, ord)
  where v ? 'url';

  -- Itinerary (days + steps)  -- FIXED: use CTE to populate temp table
  delete from public.itinerary_steps using public.itinerary_days d
    where d.package_id = v_id and public.itinerary_steps.itinerary_day_id = d.id;
  delete from public.itinerary_days where package_id = v_id;

  drop table if exists _days;
  create temporary table _days(id bigint, pos int) on commit drop;

  with ins as (
    insert into public.itinerary_days (package_id, position, day_label)
    select v_id, ord::int, coalesce(i->>'day', 'Day '||ord::text)
    from jsonb_array_elements(coalesce(pkg#>'{details,itinerary}','[]'::jsonb)) with ordinality as t(i, ord)
    returning id, position
  )
  insert into _days(id, pos)
  select id, position from ins;

  insert into public.itinerary_steps (itinerary_day_id, position, description)
  select d.id,
         s.ord::int,
         s.val
  from _days d
  join (
    select row_number() over () as day_row, i
    from jsonb_array_elements(coalesce(pkg#>'{details,itinerary}','[]'::jsonb)) i
  ) src on src.day_row = d.pos
  cross join lateral jsonb_array_elements_text(coalesce(src.i->'description','[]'::jsonb)) with ordinality as s(val, ord);

  -- Partners linkage (optional)
  perform public.attach_partners(v_id, pkg->'partners');

  return v_id;
end;
$$;

-- Convenience getter by slug or id
create or replace function public.get_package(slug_or_id text)
returns jsonb
language sql stable as $$
  select package
  from public.packages_view
  where slug = slug_or_id
     or id::text = slug_or_id
  limit 1
$$;

commit;
