# Remove Theme System + Trim Design System

**Date:** 2026-04-25
**Branch:** `redesign/plan-1-foundation`

## Goal

Remove the dark/light theme system entirely and conservatively trim the design system to just what's needed today. Keep the design system's structure intact so it can be extended later if needed.

## Motivation

The app shipped with a `light` / `dark` / `system` theme system (`ThemeService`, `<cdt-theme-toggle>`, `[data-theme='dark']` token overrides). It is no longer wanted. Removing it eliminates dead code, simplifies the bootstrap path, and lets the design system collapse to a single set of tokens.

The "trim" piece is intentionally conservative: the user does not want a wholesale audit of unused selectors. Removing only the theme-related blocks and any obvious duplicates encountered while editing is sufficient.

## Scope

### In scope

1. Delete the entire theme library and its consumers.
2. Remove the dark-mode token overrides and theme-transition styles.
3. Remove the now-empty "Preferences" section from the settings page.
4. Verify the app builds and renders without regressions.

### Explicitly out of scope

- Auditing every `_*.scss` file for unused selectors against templates.
- Restructuring the design system, renaming tokens, or trimming components/pages.
- Adding lint rules, documentation, or migration guides.

## Changes

### Files deleted

- `libs/core/theme/` — entire library directory, including:
  - `src/theme.service.ts`
  - `src/theme.service.spec.ts`
  - `src/provide-theme.ts`
  - `src/index.ts`
  - `src/test-setup.ts`
  - `project.json`, `tsconfig.json`, `tsconfig.lib.json`, `tsconfig.spec.json`, `vite.config.mts`
- `libs/ui/components/src/theme-toggle/theme-toggle.component.ts`
- `libs/ui/components/src/theme-toggle/theme-toggle.component.scss`

### Files edited

- **`tsconfig.base.json`** — remove the `"@realworld/core/theme": ["libs/core/theme/src/index.ts"]` path mapping.
- **`apps/conduit/src/app/app.config.ts`** — remove the `import { provideTheme } from '@realworld/core/theme'` line and the `provideTheme()` entry from the `providers` array.
- **`libs/ui/components/src/index.ts`** — remove the `export * from './theme-toggle/theme-toggle.component'` line.
- **`libs/settings/feature-settings/src/settings.component.html`** — delete the entire `<section class="settings-section">` block containing the **Preferences** heading and `<cdt-theme-toggle>` (lines 56–67 inclusive).
- **`apps/conduit/src/styles/layouts/_page-settings.scss`** — remove the three rules for `.settings-pref-row`, `.settings-pref-label`, `.settings-pref-sub` (lines 45–61). These classes appeared only in the deleted HTML section. Confirmed by grep across the repo.
- **`apps/conduit/src/styles/tokens/_colors.scss`** — remove the `[data-theme='dark'] { ... }` block (lines 27–51).
- **`apps/conduit/src/styles/tokens/_elevation.scss`** — remove the `[data-theme='dark'] { ... }` block (lines 12–15).
- **`apps/conduit/src/styles/base/_global.scss`** — remove the `.theme-transition`, `.theme-transition *`, `.theme-transition *::before`, `.theme-transition *::after` rule and its preceding comment block (lines 21–34).

### What stays

- The light-mode `:root { ... }` blocks in `_colors.scss`, `_elevation.scss`, `_spacing.scss`, `_typography.scss`, `_layout-vars.scss` — untouched.
- All component and layout `_*.scss` files — untouched, aside from any genuine duplicate blocks discovered while editing the files above.
- `apps/conduit/src/styles.scss` — untouched.
- All other `libs/core/*` libraries, ui components, and feature libraries — untouched.

## Verification

After changes:

1. **Build passes:** `nx build conduit` (or equivalent) succeeds with no TypeScript errors. Catches any missed `ThemeService` / `provideTheme` import.
2. **Tests pass:** `nx test` runs without regressions. The theme service spec is deleted along with its lib, so test count drops.
3. **App boots:** Run dev server, navigate to all main routes (home, login, register, article detail, editor, profile, settings).
4. **Settings page renders:** The Preferences section is gone; Profile and Account sections render normally; Save / Log out buttons still work.
5. **Visual spot-check:** Across home, article, profile, editor, auth, settings — confirm no visual regressions caused by the trimmed CSS (no unstyled elements, no broken layouts, no missing colors). The `<html>` element no longer has a `data-theme` attribute, and that should not affect rendering since only dark-theme overrides referenced it.
6. **Console clean:** No errors or warnings about missing modules, missing providers, or unresolved imports.

## Extension path

Adding theming back later is intentionally easy: re-introduce a `[data-theme='*']` block (or any other selector) in the relevant `tokens/*.scss` files, optionally re-add a service that toggles `data-theme` on `<html>`, and wire it into `app.config.ts`. Nothing in this change forecloses that path; it just deletes the current implementation.

## Risks

- **Dynamically-applied class names:** Conservative trim only deletes the `[data-theme='dark']` blocks and the `.theme-transition` helper, all of which are referenced by name from `ThemeService` (which is itself being deleted) — so this is low risk.
- **`.settings-pref-*` SCSS rules:** Verified by grep that these classes only appear in the settings template being edited and the `_page-settings.scss` file being edited.
- **Theme-toggle re-export:** If any other library imports `ThemeToggleComponent` directly from `@realworld/ui/components`, the build will fail. The plan calls for grep-verifying this before deletion (current grep shows it only appears in the settings template, which is also being edited).
