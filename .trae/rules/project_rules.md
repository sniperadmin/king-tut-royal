# Luxury Travel Exclusive Project Guidelines

## 🏥 Project Overview
- **Architecture**: Vite.js frontend with a custom backend.
- **Focus**: High-end travel services with personalized itineraries and exclusive offers.
- **Platform**: King Tut Package (Egypt in Style brand).

## 🔄 Project Awareness & Context
- **Always read `.trae/rules/project_rules.md`** at the start of a conversation to understand the project's architecture, goals, style, and constraints.
- **Update this document** when introducing new workflows, tools, or conventions.

## 🧱 Code Structure & Modularity
- **Files should be ≤700 lines**. Split larger files into modules or helper files (e.g., `src/utils/`, `src/services/`).
- **Organization**:
  - `/src` (Vite.js + TypeScript): Main application code.
  - `/public` (Static assets): Images, icons, and other static resources.
- Use **relative imports** within packages, but prefer **absolute imports** for deep nesting (e.g., `from src.components import Header`).
- **Vue SFC Template Practice**:
  - Always place all template-related code inside the main `<template>` tag.
  - Never use multiple or nested root template tags.
  - Template code must reside exclusively inside `<template>` tags to avoid render conflicts.

## 🧪 Testing & Reliability
- **Backend**: Use appropriate testing frameworks for backend logic.
- **Frontend**: Use Vitest for unit testing.
- **Update tests** when logic changes, especially for critical features.
- **Unit testing**: Vitest + Vue Test Utils.

## 📚 Documentation & Explainability
- Update `README.md` for **frontend/backend** with:
  - Setup instructions (e.g., `yarn install` for frontend).
  - New feature summaries and dependencies.
- **Comment code** with:
  - `# Reason: <why this logic exists>` for complex decisions.
- **CHANGELOG.md**: Document breaking changes.

## 📦 Dependency Management & Technology Stack
- **Frontend**: Use `yarn` for package management.
  - **Core Stack**: Vite.js, TypeScript, Tailwind CSS.
- **Deprecation Policy**:
  - Flag deprecated dependencies in `README.md`.
- **No heavy chart libraries** unless justified.
- **Document deprecated replacements**.

## 🔒 Security
- **Security**: Use environment variables for API keys.
- **Error Handling**:
  - Return user-friendly error messages.
  - Log detailed errors with structured logging for backend.

## ✅ Verification Protocol
- **Post-Implementation Checklist**:
  - Test all core user flows.
  - Validate performance metrics.
- **Lighthouse score ≥ 90**.
- **Tests green in CI**.

## ⚡ Web Performance Metrics
- **Bundle Size**: Optimize for performance.
- **Load Time**: Ensure fast loading times.
- **Tree-shake dependencies**.
- **Code-split heavy routes**.

## 🌟 Accessibility Standards (WCAG 2.1 AA)
- **ARIA Labels**: Use `aria-live` for dynamic content.
- **Keyboard Nav**: Test with accessibility tools.
- **Gold-on-black contrast** checked.
- **ARIA labels on icons**.

## 🌐 SEO Optimization
- **Dynamic Meta Tags**: Use appropriate SEO strategies.
- **Structured Data**: Implement structured data for better search visibility.
- **JSON-LD** for organization/products.
- **OG images** per subbrand.

## 🎨 Design System
- **Tailwind first** approach for UI custom components.
- **Brand tokens**:
  - `--gold: #C8A24A;`
  - `--brown: #5a3f40;`
- **clamp() typography**, responsive layout.

## 🔧 Type-Safety
- `import type { ... }` for type imports.
- **Strict DTOs** for forms & APIs.
- **No `any` types**; remove dead code on touch.

## 🧹 Pre-Commit Standards
- **Typecheck clean**.
- **Lint clean** (ESLint + Prettier).
- **No floating promises** → `await` or `.catch`.
- **One default export per file**.
- **i18n keys deduplicated**.

## 🔍 Common Errors to Avoid
- **Floating promises** → always handle with `await` or `.catch`.
- **Inconsistent type imports** → use `import type` consistently.
- **Unused async** keywords → remove when not needed.
- **Duplicate keys** in objects/arrays.

## 🧠 AI Development Behavior
- **Only ask blocking questions** when necessary.
- **Verify Nuxt vs other stacks** before scaffolding.
- **Prefer Nuxt native fetch** over axios.

---