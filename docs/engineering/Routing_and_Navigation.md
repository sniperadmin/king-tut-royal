# Routing and Navigation Architecture

## 1. Routes
- /admin (Dashboard) [auth]
- /admin/login
- /admin/builder?page=:pageName [auth]
- /admin/media [auth]
- /admin/theme [auth]

## 2. Guards
- Requires auth meta; redirect to /admin/login if missing token
- Later: integrate Supabase auth and role checks

## 3. Navigation
- Sidebar with sections (Dashboard, Pages, Media, Theme, Settings)
- Topbar with page selector, preview, save/publish, account menu

## 4. Not Found & Errors
- Global error route or component; toast notifications

## 5. Future
- Nested routes for Page Builder subpanes
- Query params for preview modes and selected section
