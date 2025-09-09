# Reusable Components, Sections, and Grid Strategy

## 1. Component Taxonomy
- Base UI (atoms): Button, Input, Label, Card, Modal, Tabs, Tooltip, Toast, Dropdown, Dialog, DataTable
- Layout primitives: Container, Grid, Stack (flex column), Inline (flex row), Section (spacing + background wrapper)
- Content blocks (molecules): Heading, Paragraph, Media, IconList, Testimonial, Feature, Stat, CTA, FormField
- Sections (organisms): Hero, Text, Gallery, Video, Features, CTA, Contact, Media Slider, Packages, Booking (defined in src/registry/sections.ts with zod schemas)
  - Newly added: Features, CTA, Contact

## 2. Grid System
- CSS Grid powered responsive system with named templates:
  - full: 1fr
  - two-col: 1fr 1fr
  - asym-30-70: 0.3fr 0.7fr
  - asym-70-30: 0.7fr 0.3fr
  - three-col: repeat(3, 1fr)
- Tailwind helpers: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10`
- Section wrapper enforces vertical rhythm via tokens: `py-section, md:py-section-lg`

## 3. Section Contract (Schema)
Each section implements:
```
{
  id: string,
  type: string,
  visible: boolean,
  layout: {
    columns: number,
    grid: 'full'|'two-col'|'asym-30-70'|'asym-70-30'|'three-col',
    background: { type: 'color'|'image'|'video'|'gradient', value: string, url?: string }
  },
  content: Record<string, any>,
  styling: Record<string, any>
}
```

## 4. UI Library Implementation Plan
- Promote existing `src/components/ui` primitives; add missing: Modal, Select, Switch, Tabs, Tooltip
- Add composables: `useDialog`, `useCommandPalette`, `useKeyboardShortcuts`
- Provide stories/examples per component in docs

## 5. Section Library Plan
- Each section is a Vue SFC in `src/components/sections/<Name>SectionDynamic.vue`
- Schema defined alongside component using zod
- Register in a central registry for the builder to discover
- Provide default templates seeded in DB (component_templates)

## 6. Editing UI Generation
- Auto-generate form controls in the Properties Panel from zod schema
- Support field types: string, number, boolean, enum, array, object
- Allow advanced editors: rich text, color picker, media picker, link picker

## 7. Performance & Reuse
- Lazy load sections via defineAsyncComponent (already used)
- Memoize heavy blocks, use Vue suspense for graceful loading
- Tailwind class composition via `class-variance-authority` and `tailwind-merge`

## 8. Testing
- Unit tests for schema validation and render snapshots
- Contract tests: ensure sections match the shared interface
