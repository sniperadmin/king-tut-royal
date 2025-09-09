-- Migration: Page Builder Draft/Publish, Templates, Roles, and Versions
-- Run in Supabase SQL editor (in a transaction in production)

-- 1) Extend page_layouts with draft/published and metadata
ALTER TABLE page_layouts
  ADD COLUMN IF NOT EXISTS layout_draft JSONB NOT NULL DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS layout_published JSONB NOT NULL DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS meta JSONB NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS updated_by UUID;

-- Backfill: copy existing layout into layout_draft if empty
UPDATE page_layouts
SET layout_draft = CASE WHEN (layout_draft = '[]'::jsonb OR layout_draft IS NULL) THEN COALESCE(layout, '[]'::jsonb) ELSE layout_draft END,
    layout_published = CASE WHEN (layout_published = '[]'::jsonb OR layout_published IS NULL) THEN COALESCE(layout, '[]'::jsonb) ELSE layout_published END;

-- 2) component_templates enrich
ALTER TABLE component_templates
  ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'general',
  ADD COLUMN IF NOT EXISTS schema JSONB NOT NULL DEFAULT '{}'::jsonb;

-- 3) layout_versions for publish snapshots
CREATE TABLE IF NOT EXISTS layout_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name TEXT NOT NULL,
  layout JSONB NOT NULL DEFAULT '[]',
  note TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_layout_versions_page ON layout_versions(page_name);

-- 4) admin_profiles for roles
DO $$ BEGIN
  CREATE TYPE admin_role AS ENUM ('admin','editor','viewer');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS admin_profiles (
  user_id UUID PRIMARY KEY, -- references auth.users externally
  role admin_role NOT NULL DEFAULT 'admin',
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER update_admin_profiles_updated_at
  BEFORE UPDATE ON admin_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 5) RLS policies (development-safe defaults; tighten in prod)
ALTER TABLE layout_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Allow authenticated to read; admins/editors write (example placeholder policies)
DROP POLICY IF EXISTS "lv_read_all" ON layout_versions;
CREATE POLICY "lv_read_all" ON layout_versions FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "lv_write_admin_editor" ON layout_versions;
CREATE POLICY "lv_write_admin_editor" ON layout_versions FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "ap_read_self" ON admin_profiles;
CREATE POLICY "ap_read_self" ON admin_profiles FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "ap_write_self_admin" ON admin_profiles;
CREATE POLICY "ap_write_self_admin" ON admin_profiles FOR UPDATE USING (auth.uid() = user_id);

-- page_layouts: keep existing permissive policy for now; to be hardened later
