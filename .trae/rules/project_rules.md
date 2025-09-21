# Luxury Travel Exclusive Project Guidelines

## 🏥 Project Overview
- **Luxury Travel Exclusive**: A platform for exclusive travel experiences with a focus on luxury and personalization.
- **Architecture**: Vite.js frontend with a custom backend.
- **Focus**: High-end travel services with personalized itineraries and exclusive offers.

## 🔄 Project Awareness & Context
- **Always read `.trae/rules/project_rules.md`** at the start of a conversation to understand the project's architecture, goals, style, and constraints.
- **Update this document** when introducing new workflows, tools, or conventions.

## 🧱 Code Structure & Modularity
- **Files should be ≤700 lines**. Split larger files into modules or helper files (e.g., `src/utils/`, `src/services/`).
- **Organization**:
  - `/src` (Vite.js + TypeScript): Main application code.
  - `/public` (Static assets): Images, icons, and other static resources.
- Use **relative imports** within packages, but prefer **absolute imports** for deep nesting (e.g., `from src.components import Header`).

## 🧪 Testing & Reliability
- **Backend**: Use appropriate testing frameworks for backend logic.
- **Frontend**: Use Vitest for unit testing.
- **Update tests** when logic changes, especially for critical features.

## 📚 Documentation & Explainability
- Update `README.md` for **frontend/backend** with:
  - Setup instructions (e.g., `yarn install` for frontend).
  - New feature summaries and dependencies.
- **Comment code** with:
  - `# Reason: <why this logic exists>` for complex decisions.

## 📦 Dependency Management & Technology Stack
- **Frontend**: Use `yarn` for package management.
  - **Core Stack**: Vite.js, TypeScript, Tailwind CSS.
- **Deprecation Policy**:
  - Flag deprecated dependencies in `README.md`.

## 🔒 Security
- **Security**: Use environment variables for API keys.
- **Error Handling**:
  - Return user-friendly error messages.
  - Log detailed errors with structured logging for backend.

## ✅ Verification Protocol
- **Post-Implementation Checklist**:
  - Test all core user flows.
  - Validate performance metrics.

## ⚡ Web Performance Metrics
- **Bundle Size**: Optimize for performance.
- **Load Time**: Ensure fast loading times.

## 🌟 Accessibility Standards (WCAG 2.1 AA)
- **ARIA Labels**: Use `aria-live` for dynamic content.
- **Keyboard Nav**: Test with accessibility tools.

## 🌐 SEO Optimization
- **Dynamic Meta Tags**: Use appropriate SEO strategies.
- **Structured Data**: Implement structured data for better search visibility.