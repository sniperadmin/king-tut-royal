# Data Model, Roles, and Permissions

## 1. Entities
- users (Supabase auth)
- admin_profiles (role, display name)
- media_assets (existing)
- theme_config (existing)
- component_templates: id, name, category, default_props, schema
- page_layouts: page_name, layout_draft, layout_published, updated_by, updated_at
- layout_versions: id, page_name, layout, note, created_by, created_at

## 2. Roles & Permissions
- Admin: full access
- Editor: edit draft, media; cannot publish/theme
- Viewer: read-only

RLS policies sample:
- page_layouts: select for all authenticated; insert/update/delete for role in ('admin','editor'); publish endpoint checks 'admin'
- media_assets: select/insert for editor/admin; delete admin only

## 3. Validation
- zod schemas for section contracts and templates
- Edge functions validate request body and JWT role claims

## 4. Audit & Logging
- layout_versions on every publish
- audit_log table for important actions (publish, theme change, role change)

## 5. Multi-tenant (future)
- Add tenant_id to all tables and RLS on tenant scope
