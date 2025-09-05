# Tailwind Theming & Design Tokens Plan

## 1. Token Sources
- CSS variables in `:root` and `.dark` (already present in src/index.css)
- Use Tailwind theme extension to map to token names
- Define semantic tokens: `--color-bg`, `--color-fg`, `--color-primary`, `--radius`, spacing scale

## 2. Theme Provider Strategy
- `ThemeProvider` controls root class `light|dark|system`
- Expose `setTheme` via provide/inject to controls in UI
- Persist preference in localStorage
- Optional: user-level theme saved in DB for admin profiles

## 3. Tailwind Setup
- Keep `darkMode: ['class']`
- Extend colors with token-backed hsl(var(--...)) entries (already done)
- Add utilities:
  - `py-section`: uses spacing token e.g., `var(--section-padding)` with Tailwind plugin or fixed classes
  - `container` with 2xl width already set

## 4. Design Tokens
- Colors: background, foreground, primary, secondary, accent, border, input, ring, gold gradient start/end
- Typography: font families, sizes, weights (map to Tailwind text sizes where possible)
- Spacing: base unit (4/8 px system), section spacing
- Radius: `--radius` mapped to `rounded-*`
- Shadows: elevations tokens for cards, modals

## 5. Theme Presets
- Define preset objects (Light Luxury, Dark Luxury)
- Save to DB (theme_config table) and sync via `useThemeConfig` composable
- Apply by writing CSS variables onto :root dynamically when theme changes

## 6. Multi-brand Support (future)
- Namespaced CSS variables per brand, or CSS cascade layers for brand overridables
- Store per-site theme in DB keyed by site/tenant

## 7. Tooling
- Add a docs page with token preview
- Add snapshot tests to guard token regressions

## 8. Implementation alignment (done)
- ThemeProvider wired with system/light/dark and localStorage
- Tailwind config maps CSS variables to theme colors
- Index CSS defines tokens for both light and dark
