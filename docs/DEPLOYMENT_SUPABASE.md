# Supabase Deployment Guide

This guide uses Supabase CLI to link your project, run SQL migrations, set secrets, and deploy Edge Functions.

## Prerequisites
- Supabase CLI installed: https://supabase.com/docs/reference/cli
- Logged into Supabase account with access to your project
- Your project reference (ref): e.g., abcd1234

## 1) Login & Link
```
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

## 2) Run SQL Migrations
Apply SQL to your database. You can execute individual files or copy contents into the SQL editor.

Option A: Apply via psql (if configured) or supabase db commands (local dev). For a remote hosted project, run these in Supabase SQL editor:
- supabase-backend/admin-setup.sql
- supabase-backend/migrations/2025-09-05_page_builder_update.sql
- supabase-backend/migrations/2025-09-05_section_templates_view.sql

## 3) Configure Edge Function Secrets
Set the required environment variables (service role key must be set server-side only).
```
supabase secrets set SUPABASE_URL=YOUR_SUPABASE_URL
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

## 4) Deploy Edge Functions
Ensure functions are placed under `supabase/functions/*`.
```
supabase functions deploy get-page-layout
supabase functions deploy save-page-layout
supabase functions deploy publish-page-layout
supabase functions deploy get-section-templates
supabase functions deploy upload-media
```
If `upload-media` is still in `supabase-backend/upload-media.js`, move it to `supabase/functions/upload-media/index.ts` (or js) before deploying.

## 5) Test Functions
Replace YOUR_PROJECT with your project ref.
```
curl -s https://YOUR_PROJECT.supabase.co/functions/v1/get-page-layout | jq
curl -s -X POST https://YOUR_PROJECT.supabase.co/functions/v1/save-page-layout \
  -H "Content-Type: application/json" \
  -d '{"pageName":"homepage","sections":[]}' | jq
curl -s -X POST https://YOUR_PROJECT.supabase.co/functions/v1/publish-page-layout \
  -H "Content-Type: application/json" \
  -d '{"pageName":"homepage"}' | jq
```

## Notes
- Do not expose the service role key in frontend code. It is stored as a secret for Edge Functions only.
- Harden RLS and edge function JWT checks for roles (admin/editor) as a follow-up.
