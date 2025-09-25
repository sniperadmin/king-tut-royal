
---

## 📄 Tailored AI Global Rules

# AI Global Rules – 1001 Privilege Club Project

## 🎯 Project Overview
- Platform: King Tut Package.
- Stack: Nuxt 3 + Vuetify + Supabase.
- Focus: Travel package for Egypt in Style brand.

## 🔄 Project Awareness
- Always consult this rules doc before coding.
- VIP data: enforce RLS, no public logs.
- Use Composition API, not Options API.
- Git root ops; CI runs typecheck, lint, tests.

## 🧱 Code Structure
- Files ≤ 500 lines.

## 📝 Vue SFC Template Practice
- **Always place all template-related code inside the main `<template>` tag when working with Vue SFC files.**
- Never leave template HTML outside the primary `<template>` section to ensure predictable behavior and avoid render conflicts.
- **Very Important Reminder:** For every Vue Single File Component (`.vue`), template code and UI markup _must_ reside _exclusively_ inside the main `<template>` tags. Do **not** put anything template-related anywhere else—doing so breaks Nuxt/Vue rendering and maintainability. Double-check all new or edited components for this before marking as done.
- **Reminder: When creating or editing Vue SFCs, always place all code related to Vue templates strictly within the `<template>` opening and closing tags. Any code outside will not be rendered and may cause runtime issues.**
- Do not use multiple or nested root template tags. This keeps the code maintainable, predictable, and compatible with Nuxt best practices.
- Folders:
  - `app/pages/` → routes
  - `app/components/` → UI
  - `app/composables/` → Supabase logic
  - `server/api/` → Nitro routes
- Use composables for Supabase access.

## 🧪 Testing
- Unit: Vitest + Vue Test Utils.

## 📚 Documentation
- `README.md`: setup, migrations, flags.
- `CHANGELOG.md`: breaking changes.
- Comment rationale with `// Reason: ...`.

## 🧠 AI Behavior
- Only ask blocking questions.
- Verify Nuxt vs other stacks before scaffolding.
- Prefer Nuxt native fetch over axios.

## ⚖️ Code Quality
- ESLint + Prettier (Nuxt preset).
- TypeScript strict.
- No `any`; remove dead code on touch.
- Lockfile committed.

## 📦 Dependencies
- Core: Nuxt 3, Vuetify, Supabase, qrcode.
- No heavy chart libs unless justified.
- Document deprecated replacements.

## 🔒 Supabase Security
- Env vars for keys.
- RLS enforced, tested.
- Audit trail for admin actions.
- Rate limit apply/verify endpoints.

## 🚫 Error Handling
- Show toasts/snackbars to users.
- Hide PII; log tech details server-side.

## ✅ Verification
- Core flows pass.
- Lighthouse ≥ 90.
- Tests green in CI.

## ⚡ Performance
- Tree-shake Vuetify.
- Lazyload via `nuxt-image`.
- Code-split heavy routes.

## 🌟 Accessibility
- Keyboard nav supported.
- ARIA labels on icons.
- Gold-on-black contrast checked.

## 🌐 SEO
- `useSeoMeta` on all pages.
- JSON-LD for org/products.
- OG images per subbrand.

## 🎨 Design System
- Vuetify first.
- Brand tokens:
  - `--gold: #C8A24A;`
  - `--brown: #5a3f40;`
- clamp() typography, responsive layout.

## 📐 Reuse
- Vuetify components

## 🔧 Type-Safety
- `import type { ... }` for types.
- Strict DTOs for forms & APIs.

## 🧹 Pre-Commit
- Typecheck clean.
- Lint clean.
- No floating promises.
- One default export per file.
- i18n keys deduped.

## 🔍 Common Errors
- Floating promises → `await` or `.catch`.
- Type imports consistent.
- Remove unused async.
- Fix duplicate keys.
--

## 📄 AI Global Rules — Supabase/Nuxt Addendum

# Addendum: Nuxt × Supabase Module Guardrails

## Auth & SSR
- Keep `useSsrCookies: false` so server services can read sessions.

## Clients & Services
- Client-side data: `useSupabaseClient()` + `useSupabaseUser()` / `useSupabaseSession()`.
- Server-side under RLS: `serverSupabaseClient(event)`.
- Bypass RLS only in trusted code: `serverSupabaseServiceRole(event)`; never expose service key to the browser.

## Types
- Generate DB types into `types/database.types.ts`; pass as generic to clients:
  - `const supabase = await serverSupabaseClient<Database>(event)`

## Security
- Service role usage is restricted to server runtime only (Nitro/Edge/Functions).
- Validate inputs on all server routes; rate-limit `/api/apply` and `/api/verify-card`.

## DX
- Prefer `$fetch` to call internal APIs from the client.
- Never roll your own Supabase client; always use the module composables/services.

## Docs Canon
- Follow @nuxtjs/supabase docs for:
  - Install + env (`SUPABASE_URL`, `SUPABASE_KEY`)
  - Composables & services API surface

---

## Theme Tokens
Theme tokens are identified in `./vuetify.config.ts`

---

## Generate TypeScript DB Types (recommended)

Live DB:
```bash
supabase gen types --lang=typescript --project-id <YOUR_PROJECT_ID> > types/database.types.ts
Local dev:
supabase gen types --lang=typescript --local > types/database.types.ts
```

## Client Composables (Vue)
Use `useSupabaseClient()` for all client queries and auth flows.
Use `useSupabaseUser() / useSupabaseSession()` for reactive `user/session` state.
```vue
<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const signInWithEmail = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email, options: { emailRedirectTo: `${location.origin}/confirm` }
  })
  if (error) throw error
}
</script>
```
## Server Services (role-aware logic)
Use `serverSupabaseClient(event)` for `SSR-safe` queries under user RLS.
Use `serverSupabaseServiceRole(event)` only in trusted server endpoints (Nitro/Edge) when you must bypass RLS (e.g., admin approvals).
```ts
// server/api/member/me.get.ts
export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event)
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('id', (await serverSupabaseUser(event))?.id)
    .single()
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  return data
})
```
## Route Role-gating (middleware, optional but useful)
Auth redirect is handled by module’s `redirectOptions`.
Add a role check for `/admin/**`.
```ts
// middleware/admin-only.global.ts
export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return
  const user = useSupabaseUser()
  if (!user.value) return // supabase redirect will kick in
  const { data } = await $fetch('/api/member/me') // includes role
  if (data?.role !== 'partner_admin' && data?.role !== 'super_admin') {
    return navigateTo('/dashboard')
  }
})
```

## realtime (preferred):
Enable Realtime in Supabase for specific tables (e.g., membership_applications) and subscribe from components to auto-refresh admin queues.
```ts
const client = useSupabaseClient()
onMounted(() => {
  client.channel('apps')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'membership_applications' },
      () => refreshApplications()
    ).subscribe()
})

```
