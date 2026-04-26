# Remove Theme System + Trim Design System — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the dark/light theme system entirely (service, toggle, dark-mode token overrides, theme-transition styles, settings UI) and conservatively trim the design system, keeping its structure intact for future extension.

**Architecture:** Mostly-mechanical deletion. Tear out the `libs/core/theme/` library and its consumers in dependency order — UI consumer first (`<cdt-theme-toggle>` + settings template), then app wiring (`provideTheme` in `app.config.ts`), then the library itself, then the SCSS overrides (`[data-theme='dark']` blocks, `.theme-transition` helper). Each phase ends with a build to surface mistakes immediately. The light-mode `:root { ... }` token blocks stay untouched.

**Tech Stack:** Angular 21.2, Nx 22.6, TypeScript, SCSS, Vitest. Tooling commands: `npx nx run conduit:build`, `npx nx test core-theme` (only relevant before deletion), `npx nx run conduit:serve`.

---

## File Map

**Files deleted:**

- `libs/core/theme/` (entire directory: `project.json`, `tsconfig.json`, `tsconfig.lib.json`, `tsconfig.spec.json`, `vite.config.mts`, `src/index.ts`, `src/provide-theme.ts`, `src/theme.service.ts`, `src/theme.service.spec.ts`, `src/test-setup.ts`)
- `libs/ui/components/src/theme-toggle/theme-toggle.component.ts`
- `libs/ui/components/src/theme-toggle/theme-toggle.component.scss`
- `libs/ui/components/src/theme-toggle/` (directory itself, once empty)

**Files edited:**

- `tsconfig.base.json` — drop one path-mapping line.
- `apps/conduit/src/app/app.config.ts` — drop one import + one provider entry.
- `libs/ui/components/src/index.ts` — drop one re-export line.
- `libs/settings/feature-settings/src/settings.component.html` — delete the **Preferences** `<section>` (lines 56–67).
- `apps/conduit/src/styles/layouts/_page-settings.scss` — delete three rule blocks (lines 45–61).
- `apps/conduit/src/styles/tokens/_colors.scss` — delete the `[data-theme='dark']` block (lines 27–51).
- `apps/conduit/src/styles/tokens/_elevation.scss` — delete the `[data-theme='dark']` block (lines 12–15).
- `apps/conduit/src/styles/base/_global.scss` — delete the `.theme-transition` rule + comment (lines 21–34).

**Files explicitly untouched:** every other `.scss`, `.ts`, `.html` in the repo. Token `:root { ... }` blocks. Component/layout SCSS files not listed above.

---

## Pre-flight: branch sanity

- [ ] **Step 1: Confirm clean working tree on the right branch.**

Run:

```bash
git status
git rev-parse --abbrev-ref HEAD
```

Expected: working tree clean (or only the spec corrections from earlier are committed), branch is `redesign/plan-1-foundation`. If the tree is dirty with unrelated work, stop and ask the user.

---

## Task 1: Verify all theme references in the codebase before touching anything

**Why:** The plan assumes a known set of theme consumers. A grep up front catches anything the spec missed.

**Files:** none (read-only verification).

- [ ] **Step 1: Grep for every theme symbol the spec assumes.**

Run:

```bash
grep -rn "ThemeService\|provideTheme\|ThemePreference\|ResolvedTheme\|cdt-theme-toggle\|ThemeToggleComponent\|@realworld/core/theme\|data-theme\|theme-transition\|prefers-color-scheme" \
  /Users/Lignos/Personal_Projects/angular-ngrx-nx-realworld-example-app \
  --include="*.ts" --include="*.html" --include="*.css" --include="*.scss" --include="*.json" \
  2>/dev/null \
  | grep -v node_modules \
  | grep -v dist \
  | grep -v "\.nx/"
```

Expected output (a finite, enumerable list — match against this exactly):

- All hits inside `libs/core/theme/src/` — these go away when the lib is deleted.
- Hits inside `libs/ui/components/src/theme-toggle/` — go away when the component is deleted.
- One hit in `libs/ui/components/src/index.ts` (the re-export).
- One hit in `libs/settings/feature-settings/src/settings.component.html` (the `<cdt-theme-toggle>` element).
- Two hits in `apps/conduit/src/app/app.config.ts` (import + call).
- One hit in `tsconfig.base.json` (path mapping).
- Hits inside `apps/conduit/src/styles/tokens/_colors.scss`, `apps/conduit/src/styles/tokens/_elevation.scss`, `apps/conduit/src/styles/base/_global.scss` (the dark-theme overrides + `.theme-transition` block).
- Possibly `apps/conduit/src/styles/base/_global.scss` and a `// Theme transition:` comment.
- The `.nx/workspace-data/file-map.json` is auto-generated — ignore it; it regenerates on the next nx run.

- [ ] **Step 2: If any hit appears OUTSIDE the list above, stop.**

Re-evaluate: that hit indicates a consumer the spec missed. Surface it to the user before proceeding rather than silently extending scope. If everything matches, continue.

- [ ] **Step 3: Grep for `.settings-pref` to confirm conservative trim is safe.**

Run:

```bash
grep -rn "settings-pref-row\|settings-pref-label\|settings-pref-sub" \
  /Users/Lignos/Personal_Projects/angular-ngrx-nx-realworld-example-app \
  --include="*.ts" --include="*.html" --include="*.css" --include="*.scss" \
  2>/dev/null \
  | grep -v node_modules \
  | grep -v dist
```

Expected: hits ONLY in `libs/settings/feature-settings/src/settings.component.html` (lines 60, 62, 63) and `apps/conduit/src/styles/layouts/_page-settings.scss` (lines 45, 52, 58). If anything else appears, stop and ask.

- [ ] **Step 4: No commit yet.**

This task is read-only.

---

## Task 2: Remove the `<cdt-theme-toggle>` usage from the settings template

**Why:** Removing the consumer first lets later steps delete the producer cleanly. We do template-only first, no SCSS yet, so the build keeps passing and we can verify the page still renders.

**Files:**

- Modify: `libs/settings/feature-settings/src/settings.component.html` (lines 56–67)

- [ ] **Step 1: Open the file and verify current shape.**

Read `libs/settings/feature-settings/src/settings.component.html`. Confirm the **Preferences** `<section>` is the third `<section class="settings-section">` block, and that it contains the heading `<h2>Preferences</h2>`, the description `<div class="settings-section-desc">Customize how Conduit feels.</div>`, the `<div class="settings-pref-row">…</div>` block, and `<cdt-theme-toggle></cdt-theme-toggle>`.

- [ ] **Step 2: Delete the entire Preferences section.**

Edit the file: remove the block from `<section class="settings-section">` containing `<h2>Preferences</h2>` through to its closing `</section>` — that is, the contiguous block at lines 56–67 inclusive (between the closing `</section>` of the Account section and the opening `<div class="settings-footer">`). Result should be:

```html
      <fieldset class="form-group required">
        <input
          formControlName="password"
          type="password"
          id="password"
          placeholder="New password (leave blank to keep current)"
          class="form-control"
        />
        <cdt-input-errors [control]="form.controls.password" />
      </fieldset>
    </section>

    <div class="settings-footer">
```

(No blank line gap larger than the existing one between Account and the footer.)

- [ ] **Step 3: Build to verify the template still compiles.**

Run:

```bash
npx nx run conduit:build --skip-nx-cache
```

Expected: build succeeds. The settings component still references `ThemeToggleComponent` in its imports if it does so — verify next.

- [ ] **Step 4: Check whether the settings component imports the theme-toggle.**

Run:

```bash
grep -n "ThemeToggleComponent\|theme-toggle" /Users/Lignos/Personal_Projects/angular-ngrx-nx-realworld-example-app/libs/settings/feature-settings/src/settings.component.ts
```

Expected: zero matches (settings imports `cdt-theme-toggle` only via the template's selector, which Angular resolves through `@realworld/ui/components`). If matches DO appear, remove the import line and the corresponding entry from the component's `imports: [...]` array, then re-run the build. (Read the file first to see current `imports` array; do not invent a structure.)

- [ ] **Step 5: Commit.**

```bash
git add libs/settings/feature-settings/src/settings.component.html \
        libs/settings/feature-settings/src/settings.component.ts
git commit -m "$(cat <<'EOF'
feat(settings): remove Preferences section with theme toggle

The dark theme is being removed; Appearance was the only entry in
Preferences, so the whole section goes.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

(If Step 4 found nothing to change in `settings.component.ts`, the `git add` of that file is a no-op — leave it in the command.)

---

## Task 3: Remove the `.settings-pref-*` styles from `_page-settings.scss`

**Why:** With the HTML gone, these three rule blocks have nothing to style. Grep in Task 1 Step 3 confirmed they have no other consumers.

**Files:**

- Modify: `apps/conduit/src/styles/layouts/_page-settings.scss` (lines 45–61)

- [ ] **Step 1: Read the file.**

Verify lines 45–61 contain exactly:

```scss
.settings-page .settings-pref-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--sp-16);
}

.settings-page .settings-pref-label {
  font-weight: 600;
  color: var(--ink-900);
  font-size: var(--fs-14);
}

.settings-page .settings-pref-sub {
  font-size: var(--fs-12);
  color: var(--ink-400);
}
```

- [ ] **Step 2: Delete those three rule blocks.**

Use Edit to remove the three blocks together. After removal, the file goes directly from the `.settings-section-desc` rule (ending around line 43) to the `.settings-footer` rule (which becomes the next block). Leave a single blank line between the two rules (matching the file's existing style).

- [ ] **Step 3: Build to verify SCSS compiles.**

Run:

```bash
npx nx run conduit:build --skip-nx-cache
```

Expected: build succeeds.

- [ ] **Step 4: Commit.**

```bash
git add apps/conduit/src/styles/layouts/_page-settings.scss
git commit -m "$(cat <<'EOF'
style(settings): drop unused .settings-pref-* rules

Their consumer (the Preferences section in settings.component.html)
was removed in the previous commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Remove `<cdt-theme-toggle>` re-export from the UI component barrel

**Why:** The component is no longer used. Removing the re-export from `index.ts` lets us delete the component file in the next task without touching this file again.

**Files:**

- Modify: `libs/ui/components/src/index.ts`

- [ ] **Step 1: Read the file.**

Confirm the line `export * from './theme-toggle/theme-toggle.component';` exists.

- [ ] **Step 2: Remove that one line.**

Use Edit to delete the line. Surrounding lines (`export * from './tag-chip/tag-chip.component';` above, `export * from './reading-time/reading-time';` below) stay.

- [ ] **Step 3: Build.**

Run:

```bash
npx nx run conduit:build --skip-nx-cache
```

Expected: build succeeds. (If any other file imported `ThemeToggleComponent` from `@realworld/ui/components`, the build fails here. Task 1 Step 1 should have caught that — if it does fail, identify the consumer and bring it to the user before continuing.)

- [ ] **Step 4: Commit.**

```bash
git add libs/ui/components/src/index.ts
git commit -m "$(cat <<'EOF'
refactor(ui): drop ThemeToggleComponent from barrel exports

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Delete the `<cdt-theme-toggle>` component files

**Why:** The component now has no consumers and no exports. Safe to remove.

**Files:**

- Delete: `libs/ui/components/src/theme-toggle/theme-toggle.component.ts`
- Delete: `libs/ui/components/src/theme-toggle/theme-toggle.component.scss`
- Delete: `libs/ui/components/src/theme-toggle/` (the now-empty directory)

- [ ] **Step 1: Delete the files and the directory.**

Run:

```bash
rm /Users/Lignos/Personal_Projects/angular-ngrx-nx-realworld-example-app/libs/ui/components/src/theme-toggle/theme-toggle.component.ts
rm /Users/Lignos/Personal_Projects/angular-ngrx-nx-realworld-example-app/libs/ui/components/src/theme-toggle/theme-toggle.component.scss
rmdir /Users/Lignos/Personal_Projects/angular-ngrx-nx-realworld-example-app/libs/ui/components/src/theme-toggle
```

Expected: all three commands succeed. If `rmdir` complains the directory isn't empty, list contents (`ls`) and stop — there's an unexpected file.

- [ ] **Step 2: Build.**

Run:

```bash
npx nx run conduit:build --skip-nx-cache
```

Expected: build succeeds.

- [ ] **Step 3: Commit.**

```bash
git add -A libs/ui/components/src/theme-toggle
git commit -m "$(cat <<'EOF'
chore(ui): delete ThemeToggleComponent

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Remove `provideTheme()` from app config

**Why:** The provider is the last live consumer of `@realworld/core/theme`. Removing it clears the path to deleting the library itself.

**Files:**

- Modify: `apps/conduit/src/app/app.config.ts`

- [ ] **Step 1: Read the file.**

Confirm line 7 is `import { provideTheme } from '@realworld/core/theme';` and line 13 is `    provideTheme(),`.

- [ ] **Step 2: Remove the import and the provider call.**

Edit: delete line 7 entirely. Delete the `provideTheme(),` line from the `providers` array.

After the edit, the top imports look like:

```ts
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { AuthGuard } from '@realworld/auth/data-access';
import { errorHandlingInterceptor } from '@realworld/core/error-handler';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { API_URL } from '@realworld/core/http-client';
import { environment } from '../environments/environment';
```

And the `providers` array begins:

```ts
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
```

- [ ] **Step 3: Build.**

Run:

```bash
npx nx run conduit:build --skip-nx-cache
```

Expected: build succeeds.

- [ ] **Step 4: Commit.**

```bash
git add apps/conduit/src/app/app.config.ts
git commit -m "$(cat <<'EOF'
feat(app): drop provideTheme() from bootstrap

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Remove the `@realworld/core/theme` path mapping

**Why:** With no consumers left, the TypeScript path mapping is dead. Removing it before deleting the library means the next task is a clean directory removal.

**Files:**

- Modify: `tsconfig.base.json`

- [ ] **Step 1: Read the file and locate the line.**

Find the line:

```json
      "@realworld/core/theme": ["libs/core/theme/src/index.ts"],
```

(Around line 33 according to earlier grep.)

- [ ] **Step 2: Remove that one line.**

Edit the file to delete it. Make sure surrounding entries still parse — JSON is comma-sensitive. Verify the file by running:

```bash
node -e "JSON.parse(require('fs').readFileSync('/Users/Lignos/Personal_Projects/angular-ngrx-nx-realworld-example-app/tsconfig.base.json','utf8'))"
```

Expected: no error.

- [ ] **Step 3: Build.**

Run:

```bash
npx nx run conduit:build --skip-nx-cache
```

Expected: build succeeds.

- [ ] **Step 4: Commit.**

```bash
git add tsconfig.base.json
git commit -m "$(cat <<'EOF'
chore(tsconfig): drop @realworld/core/theme path mapping

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Delete the `libs/core/theme/` library

**Why:** No consumers, no path mapping, no provider — the library is unreachable. Final removal.

**Files:**

- Delete: `libs/core/theme/` (entire directory)

- [ ] **Step 1: Sanity-check there are no remaining references.**

Run:

```bash
grep -rn "@realworld/core/theme\|core-theme\|libs/core/theme" \
  /Users/Lignos/Personal_Projects/angular-ngrx-nx-realworld-example-app \
  --include="*.ts" --include="*.json" --include="*.html" --include="*.scss" \
  2>/dev/null \
  | grep -v node_modules \
  | grep -v dist \
  | grep -v "\.nx/" \
  | grep -v "libs/core/theme/"
```

Expected: zero results. (The `grep -v "libs/core/theme/"` excludes the library's own files, which we're about to delete.) If anything else appears, stop and investigate.

- [ ] **Step 2: Delete the directory.**

Run:

```bash
rm -rf /Users/Lignos/Personal_Projects/angular-ngrx-nx-realworld-example-app/libs/core/theme
```

Expected: silent success.

- [ ] **Step 3: Reset Nx cache so the workspace data regenerates.**

Run:

```bash
npx nx reset
```

Expected: completes without error. This clears the `.nx/workspace-data/` files that referenced `core-theme`.

- [ ] **Step 4: Build.**

Run:

```bash
npx nx run conduit:build --skip-nx-cache
```

Expected: build succeeds.

- [ ] **Step 5: Commit.**

```bash
git add -A libs/core/theme
git commit -m "$(cat <<'EOF'
chore(core/theme): delete theme library

The dark/light theme system is being removed. Service, provider,
and tests are no longer used by anything; the library is gone.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Remove `[data-theme='dark']` overrides from token files

**Why:** Now that no code sets `data-theme`, these CSS blocks are dead. They're also the bulk of the "redundant CSS" the user wants gone.

**Files:**

- Modify: `apps/conduit/src/styles/tokens/_colors.scss` (lines 27–51)
- Modify: `apps/conduit/src/styles/tokens/_elevation.scss` (lines 12–15)

- [ ] **Step 1: Read `_colors.scss` and verify shape.**

Confirm lines 27–51 are the `[data-theme='dark'] { ... }` block, and lines 1–25 are the `:root { ... }` block (which stays).

- [ ] **Step 2: Delete the dark block from `_colors.scss`.**

Edit the file to remove lines 27–51 inclusive (the `[data-theme='dark'] { ... }` block, including the blank line that separates it from `:root`). After the edit the file ends with the closing `}` of `:root`.

Final shape:

```scss
:root {
  --ink-900: #2a1a0e;
  --ink-700: #4a3a2e;
  --ink-500: #6b5847;
  --ink-400: #8b7560;
  --ink-300: #b8a690;

  --brand-600: #a84f2b;
  --brand-500: #c2613a;
  --brand-400: #d9825b;
  --brand-100: #fae8dc;

  --paper: #fffcf7;
  --paper-raised: #ffffff;
  --paper-sunken: #fff7f0;
  --paper-translucent: rgba(255, 252, 247, 0.82);

  --border: #f1e1d0;
  --border-strong: #e4cfb8;

  --danger: #9e3a3a;
  --success: #4a6b3f;

  --focus-ring: rgba(217, 130, 91, 0.4);
}
```

- [ ] **Step 3: Read `_elevation.scss` and verify shape.**

Confirm lines 12–15 are:

```scss
[data-theme='dark'] {
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.4);
}
```

(And there's a blank line at line 11 separating it from `:root`.)

- [ ] **Step 4: Delete the dark block from `_elevation.scss`.**

Edit the file to remove lines 11–15 inclusive (the blank separator line plus the `[data-theme='dark']` block). Final shape:

```scss
:root {
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-pill: 999px;

  --shadow-sm: 0 2px 8px rgba(42, 26, 14, 0.06);
  --shadow-md: 0 8px 24px rgba(42, 26, 14, 0.1);
}
```

- [ ] **Step 5: Build.**

Run:

```bash
npx nx run conduit:build --skip-nx-cache
```

Expected: build succeeds.

- [ ] **Step 6: Commit.**

```bash
git add apps/conduit/src/styles/tokens/_colors.scss apps/conduit/src/styles/tokens/_elevation.scss
git commit -m "$(cat <<'EOF'
style(tokens): drop [data-theme='dark'] overrides

No code sets data-theme anymore; these blocks are dead. Light-mode
:root tokens stay intact for future theme extension.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Remove the `.theme-transition` helper from global styles

**Why:** Last theme-related artifact. The class was applied by `ThemeService.enableTransitions()` (already deleted) to animate token swaps; with no swaps, no need for the helper.

**Files:**

- Modify: `apps/conduit/src/styles/base/_global.scss` (lines 21–34)

- [ ] **Step 1: Read the file.**

Confirm lines 21–34 are the comment + `.theme-transition` rule:

```scss
// Theme transition: only added after first paint by ThemeService,
// to avoid flashing the wrong theme on initial load. Uses !important to
// override any component-scoped transition rules so theme changes animate
// consistently.
.theme-transition,
.theme-transition *,
.theme-transition *::before,
.theme-transition *::after {
  transition:
    background-color 300ms ease,
    color 300ms ease,
    border-color 300ms ease,
    box-shadow 300ms ease !important;
}
```

- [ ] **Step 2: Delete lines 20–34.**

Edit the file to remove the blank line at 20, the four-line comment block, and the `.theme-transition,…` rule. After the edit the file ends with the closing `}` of the `app-root > cdt-footer` rule on line 19.

Final file shape:

```scss
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

app-root {
  display: flex;
  flex-direction: column;
  flex: 1;
}

app-root > *:not(cdt-footer) {
  flex-shrink: 0;
}

app-root > cdt-footer {
  margin-top: auto;
}
```

- [ ] **Step 3: Build.**

Run:

```bash
npx nx run conduit:build --skip-nx-cache
```

Expected: build succeeds.

- [ ] **Step 4: Commit.**

```bash
git add apps/conduit/src/styles/base/_global.scss
git commit -m "$(cat <<'EOF'
style(global): drop .theme-transition helper

ThemeService.enableTransitions() (which applied this class) is gone;
the class has no remaining application sites.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Final repo-wide verification

**Why:** Catch any regression the per-task builds missed: stray references, lint regressions, broken e2e ids, console errors at runtime.

**Files:** none (verification only).

- [ ] **Step 1: Confirm no theme references remain anywhere.**

Run:

```bash
grep -rn "ThemeService\|provideTheme\|ThemePreference\|ResolvedTheme\|cdt-theme-toggle\|ThemeToggleComponent\|@realworld/core/theme\|core-theme\|data-theme\|theme-transition" \
  /Users/Lignos/Personal_Projects/angular-ngrx-nx-realworld-example-app \
  --include="*.ts" --include="*.html" --include="*.css" --include="*.scss" --include="*.json" \
  2>/dev/null \
  | grep -v node_modules \
  | grep -v dist \
  | grep -v "\.nx/" \
  | grep -v "docs/superpowers/"
```

Expected: zero hits. (Docs are excluded — the spec and earlier plan/spec docs legitimately mention the names.) If hits appear, investigate before continuing.

- [ ] **Step 2: Production build.**

Run:

```bash
npm run build
```

(This expands to `npx nx run conduit:build --configuration=production`.)
Expected: build succeeds, no errors.

- [ ] **Step 3: Lint.**

Run:

```bash
npm run lint
```

Expected: passes. If any lint error references something we changed, fix it. Otherwise the failure is unrelated to this work — flag to the user before committing further.

- [ ] **Step 4: Run affected tests.**

Run:

```bash
npm test
```

Expected: passes. The `core-theme` project no longer exists, so its spec is gone — overall test count drops.

- [ ] **Step 5: Boot the dev server and visually verify.**

Run (in a separate terminal or background):

```bash
npm start
```

Wait for the server to come up (default `http://localhost:4200`). Then in a browser, visit:

1. `/home` — feed renders normally; tag chips, article cards, navbar, footer all look unchanged.
2. `/login` and `/register` — auth split-hero layout renders.
3. `/article/<some slug>` — pick any article from the home feed and open it. Title, body, comments, share button render.
4. `/profile/<some username>` — profile hero + tabs render.
5. `/editor` (must be logged in) — editor two-pane layout renders.
6. `/settings` (must be logged in) — Profile + Account sections render. **The Preferences section is gone.** Save and Log out buttons render in the footer.
7. Open DevTools console on each page — no errors, no warnings about missing modules or providers.
8. Inspect `<html>` in DevTools — confirm no `data-theme` attribute.

If any visual regression appears (broken layout, missing colors, unstyled element), stop and identify the cause before claiming the task complete. The conservative trim should not have caused any.

- [ ] **Step 6: Run e2e (optional but recommended).**

Run:

```bash
npm run e2e
```

Expected: passes. If the test runner times out or has unrelated flakes, note that to the user but do not block on it; the production build, unit tests, and visual verification are the load-bearing checks.

- [ ] **Step 7: No commit.**

This task is verification-only. If everything passed, the work is done. Summarize the result to the user: total commits added, files removed, lines of CSS removed.

---

## Self-review notes

- **Spec coverage:** Every file in the spec's "deleted" and "edited" lists maps to a task. Verification steps mirror the spec's verification list (build, tests, app boot, settings render, visual spot-check, console clean).
- **Order of operations:** Consumers before producers (template → re-export → component file → app provider → path mapping → library). Prevents broken intermediate builds.
- **Why per-task builds:** Each Nx build is fast on this codebase and catches a typo or missed reference at the task that introduced it, not three tasks later.
- **Conservative scope honored:** No task touches a `_*.scss` file other than the four explicitly named ones. No task renames or restructures anything.
- **Type/symbol consistency:** No new types or methods introduced. All references use the names already in the codebase (`ThemeService`, `ThemeToggleComponent`, `provideTheme`, `[data-theme='dark']`, `.theme-transition`, `.settings-pref-row/label/sub`).
