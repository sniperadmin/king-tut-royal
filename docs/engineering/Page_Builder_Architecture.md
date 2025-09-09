# Page Builder Architecture Plan

## 1. High-level Architecture
- Admin app (Vue 3 + Vite) with Page Builder UI
- Supabase as backend (Postgres, RLS, storage, edge functions)
- Data model: pages, sections, component templates, media, themes
- Runtime renderer: `DynamicRenderer.vue` loads sections dynamically

## 2. Block/Section Schema
A shared TypeScript interface (already used in `usePageBuilder.ts`) governs blocks. Back it with zod for runtime validation.

```ts
interface Section {
  id: string
  type: string
  visible: boolean
  layout: {
    columns: number
    grid: string
    background: { type: 'color' | 'image' | 'video' | 'gradient'; value: string; url?: string }
  }
  content: Record<string, any>
  styling: Record<string, any>
}
```

## 3. Registry
- `src/registry/sections.ts`: map of `type` → async component import + zod schema + default template
- The builder queries the registry to list available sections
- The runtime renderer uses the same registry to render

## 4. Persistence
- Table `page_layouts(page_name text primary key, layout_draft jsonb, layout_published jsonb, meta jsonb, status text, is_published bool)`
- Table `component_templates(id uuid, name text, category text, default_props jsonb, schema jsonb)` and compatibility view `section_templates`
- Table `layout_versions` for publish snapshots; `admin_profiles` for roles
- Edge functions for get/save/publish layout with validation

## 10. Publish UI (Admin)
- Toolbar buttons: Save (draft), Publish (copy draft → published)
- Publish calls edge function publish-page-layout
- Builder loads `layout_draft`; public site renders `layout_published`

## 11. Registry Expansion
- Added sections: features, cta, contact to src/registry/sections.ts
- Use defaults() for safe merging when builder props are partial

## 5. Editor UX
- Drag-and-drop (vue-draggable-plus) on Canvas
- Properties panel generated from schema
- Inline toolbar: edit, duplicate, delete, visibility
- Keyboard shortcuts: Cmd/Ctrl+S save, Del remove, arrows to move

## 6. Preview & Publish
- Draft layout stored as `layout_draft`; publish copies to `layout_published`
- Public site reads `layout_published`; Admin sees draft in preview
- Versioning: `layout_versions` table for snapshots and rollback

## 7. Security
- RLS: only admin role can modify page layouts and component templates
- Edge functions verify JWT and roles before write
- Audit log table for changes

## 8. Performance
- Lazy load sections, cache via Vue Query
- Minimize JSON payloads; normalize media metadata
- Debounced autosave with optimistic UI

## 9. Migration Plan
- Introduce registry and zod schemas incrementally
- Adapt PageBuilder.vue to generate form from schema
- Create edge functions to wrap DB reads/writes with validation
