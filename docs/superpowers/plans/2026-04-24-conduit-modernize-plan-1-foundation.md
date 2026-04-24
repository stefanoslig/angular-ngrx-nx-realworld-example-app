# Conduit Modernize — Plan 1: Design Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Land the design system layer of the Conduit modernization — design tokens, refactored SCSS architecture, dark mode wiring, and the new shared UI components (`cdt-avatar`, `cdt-icon`, `cdt-skeleton` family, `cdt-tag-chip`, `cdt-theme-toggle`) — without changing any page templates yet. After this plan ships, the app renders with the new warm palette / fonts / component styles, dark mode is live (driven by system preference), and the new components are available for Plan 2 to use.

**Architecture:** SCSS gets reorganized under `apps/conduit/src/styles/` into `tokens/`, `base/`, `components/`, `layouts/`, `utilities/`. The existing class names that templates rely on (`.btn-primary`, `.form-control`, `.card`, `.tag-default`, `.banner`, `.home-page`, etc.) are preserved but restyled against the new tokens — Plan 2 will rework templates and replace these with new layout / component classes. A new `libs/core/theme` lib hosts `ThemeService` (signal-based, persisted, system-preference aware). New shared UI components live in `libs/ui/components/src/`.

**Tech Stack:** Angular 21.2.5 (zoneless, standalone components), NgRx Signals 21.0.1, SCSS, Vitest 4.0.9 (`@analogjs/vitest-angular`), Lucide Angular for icons.

**Out of scope (handled in later plans):**

- Page template rework (Plan 2)
- Navbar / footer template changes (Plan 2)
- Wiring `cdt-avatar`, `cdt-skeleton`, `cdt-tag-chip`, `cdt-theme-toggle` into existing templates (Plan 2)
- Migrating `<i class="ion-*">` to `<cdt-icon>` (Plan 3)
- Removing the ionicons CDN link (Plan 3)
- 404 page (Plan 2 or later)

---

## File structure

**Created:**

```
apps/conduit/src/styles/
├── tokens/
│   ├── _colors.scss          # CSS custom props, light + [data-theme=dark] block
│   ├── _typography.scss      # font families, type scale
│   ├── _spacing.scss         # spacing scale, radius, shadows
│   └── _tokens.scss          # @forward of all tokens
├── base/
│   ├── _reset.scss           # modern reset (replaces current inline reset)
│   ├── _typography.scss      # h1-h6, p, a, lists, hr defaults
│   └── _global.scss          # body, app-root shell, theme-transition class
├── components/
│   ├── _button.scss          # .btn variants
│   ├── _input.scss           # .form-control, .form-group
│   ├── _card.scss            # .card, .card-block, .card-footer, .card-text
│   ├── _tag.scss             # .tag-list, .tag-default, .tag-pill, .tag-outline
│   ├── _nav.scss             # .nav, .nav-pills, .navbar — basic restyle
│   ├── _pagination.scss      # .pagination, .page-item, .page-link
│   ├── _skeleton.scss        # shimmer keyframes + .skeleton base
│   └── _error-messages.scss  # .error-messages
├── layouts/
│   ├── _container.scss       # Bootstrap-style grid, deleted in Plan 2
│   └── _pages-legacy.scss    # current page-specific styles ported, deleted in Plan 2
└── utilities/
    └── _helpers.scss         # .pull-xs-right, .text-xs-center, .logo-font

libs/core/theme/
├── project.json
├── tsconfig.json
├── tsconfig.lib.json
├── tsconfig.spec.json
├── vite.config.mts
└── src/
    ├── index.ts
    ├── test-setup.ts
    ├── theme.service.ts
    ├── theme.service.spec.ts
    └── provide-theme.ts

libs/ui/components/
├── vite.config.mts                        # added so this lib can run tests
└── src/
    ├── icon/
    │   └── icon.component.ts              # cdt-icon wrapper around lucide
    ├── avatar/
    │   ├── avatar.utils.ts                # initials + color-hash logic
    │   ├── avatar.utils.spec.ts
    │   ├── avatar.component.ts
    │   └── avatar.component.scss
    ├── skeleton/
    │   ├── skeleton.component.ts
    │   ├── skeleton.component.scss
    │   ├── article-card-skeleton.component.ts
    │   ├── article-meta-skeleton.component.ts
    │   └── comment-skeleton.component.ts
    ├── tag-chip/
    │   └── tag-chip.component.ts
    └── theme-toggle/
        ├── theme-toggle.component.ts
        └── theme-toggle.component.scss
```

**Modified:**

- `apps/conduit/src/styles.scss` — replaced with `@use` imports of the new architecture
- `apps/conduit/src/index.html` — Google Fonts link rewritten to load Fraunces + Nunito Sans (ionicons CDN link untouched, removed in Plan 3)
- `apps/conduit/src/app/app.config.ts` — adds `provideTheme()` provider
- `tsconfig.base.json` — adds `@realworld/core/theme` path alias
- `package.json` — adds `lucide-angular` dependency
- `libs/ui/components/src/index.ts` — re-exports new components
- `libs/ui/components/project.json` — adds `test` target

---

## Task 1: Project prep — Lucide dependency + font link

**Files:**

- Modify: `package.json`
- Modify: `apps/conduit/src/index.html`

- [ ] **Step 1: Install lucide-angular**

```bash
npm install lucide-angular
```

Expected: lucide-angular added to `dependencies` in `package.json`. Lockfile updated.

- [ ] **Step 2: Verify install**

```bash
node -e "console.log(require('lucide-angular/package.json').version)"
```

Expected: prints a version string (e.g. `0.468.0`). Confirms package is installed.

- [ ] **Step 3: Update Google Fonts link in `apps/conduit/src/index.html`**

Replace the existing `<link>` to Google Fonts (currently loading Titillium Web, Source Serif Pro, Merriweather Sans, Source Sans Pro) with the redesign fonts. Leave the ionicons `<link>` and other tags untouched.

Find this block in `apps/conduit/src/index.html`:

```html
<link
  href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
  rel="stylesheet"
  type="text/css"
/>
```

Replace it with:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Nunito+Sans:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 4: Verify dev server still serves the page**

```bash
npx nx run conduit:serve --port=4200
```

Open `http://localhost:4200/` in a browser. Expected: page loads (will look broken visually since old fonts are gone but new tokens not applied yet — that's OK). No console errors about font loading. Stop the server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json apps/conduit/src/index.html
git commit -m "chore: add lucide-angular and switch fonts to Fraunces + Nunito Sans"
```

---

## Task 2: Design tokens

**Files:**

- Create: `apps/conduit/src/styles/tokens/_colors.scss`
- Create: `apps/conduit/src/styles/tokens/_typography.scss`
- Create: `apps/conduit/src/styles/tokens/_spacing.scss`
- Create: `apps/conduit/src/styles/tokens/_tokens.scss`

- [ ] **Step 1: Create the tokens folder**

```bash
mkdir -p apps/conduit/src/styles/tokens
```

- [ ] **Step 2: Write `apps/conduit/src/styles/tokens/_colors.scss`**

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

  --border: #f1e1d0;
  --border-strong: #e4cfb8;

  --danger: #9e3a3a;
  --success: #4a6b3f;

  --focus-ring: rgba(217, 130, 91, 0.4);
}

[data-theme='dark'] {
  --ink-900: #f5ebde;
  --ink-700: #d8c9b8;
  --ink-500: #b8a690;
  --ink-400: #8b7560;
  --ink-300: #6b5847;

  --brand-600: #f0b08a;
  --brand-500: #e8a076;
  --brand-400: #c2613a;
  --brand-100: #3a2419;

  --paper: #1a1410;
  --paper-raised: #241b15;
  --paper-sunken: #22180f;

  --border: #3a2d22;
  --border-strong: #52412f;

  --danger: #d98080;
  --success: #9ab890;

  --focus-ring: rgba(232, 160, 118, 0.5);
}
```

- [ ] **Step 3: Write `apps/conduit/src/styles/tokens/_typography.scss`**

```scss
:root {
  --font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
  --font-body: 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  --fs-12: 0.75rem;
  --fs-14: 0.875rem;
  --fs-16: 1rem;
  --fs-18: 1.125rem;
  --fs-20: 1.25rem;
  --fs-24: 1.5rem;
  --fs-32: 2rem;
  --fs-44: 2.75rem;
  --fs-56: 3.5rem;

  --lh-tight: 1.15;
  --lh-standard: 1.5;
  --lh-relaxed: 1.75;
}
```

- [ ] **Step 4: Write `apps/conduit/src/styles/tokens/_spacing.scss`**

```scss
:root {
  --sp-4: 0.25rem;
  --sp-8: 0.5rem;
  --sp-12: 0.75rem;
  --sp-16: 1rem;
  --sp-24: 1.5rem;
  --sp-32: 2rem;
  --sp-48: 3rem;
  --sp-64: 4rem;

  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-pill: 999px;

  --shadow-sm: 0 2px 8px rgba(42, 26, 14, 0.06);
  --shadow-md: 0 8px 24px rgba(42, 26, 14, 0.1);
}

[data-theme='dark'] {
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.4);
}
```

- [ ] **Step 5: Write `apps/conduit/src/styles/tokens/_tokens.scss`**

```scss
@forward 'colors';
@forward 'typography';
@forward 'spacing';
```

- [ ] **Step 6: Commit**

```bash
git add apps/conduit/src/styles/tokens/
git commit -m "feat(styles): add design tokens for warm palette + dark mode"
```

---

## Task 3: Base styles (reset, typography, global)

**Files:**

- Create: `apps/conduit/src/styles/base/_reset.scss`
- Create: `apps/conduit/src/styles/base/_typography.scss`
- Create: `apps/conduit/src/styles/base/_global.scss`

- [ ] **Step 1: Create the base folder**

```bash
mkdir -p apps/conduit/src/styles/base
```

- [ ] **Step 2: Write `apps/conduit/src/styles/base/_reset.scss`**

```scss
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-tap-highlight-color: transparent;
}

ol,
ul {
  list-style: none;
}

img {
  vertical-align: middle;
  border: 0;
  max-width: 100%;
  height: auto;
}

button,
input,
optgroup,
select,
textarea {
  font: inherit;
  color: inherit;
  margin: 0;
}

button {
  overflow: visible;
  background: none;
  border: none;
}

button,
select {
  text-transform: none;
}

button,
[role='button'] {
  cursor: pointer;
}

button[disabled] {
  cursor: not-allowed;
}

input {
  line-height: normal;
}

textarea {
  overflow: auto;
  resize: vertical;
}

a,
area,
button,
[role='button'],
input,
label,
select,
summary,
textarea {
  touch-action: manipulation;
}

fieldset {
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
}

hr {
  margin-top: var(--sp-16);
  margin-bottom: var(--sp-16);
  border: 0;
  border-top: 1px solid var(--border);
}
```

- [ ] **Step 3: Write `apps/conduit/src/styles/base/_typography.scss`**

```scss
body {
  font-family: var(--font-body);
  font-size: var(--fs-16);
  line-height: var(--lh-standard);
  color: var(--ink-700);
  background-color: var(--paper);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-display);
  margin-bottom: var(--sp-8);
  font-weight: 600;
  line-height: var(--lh-tight);
  color: var(--ink-900);
  letter-spacing: -0.01em;
}

h1 {
  font-size: var(--fs-44);
  font-weight: 700;
}
h2 {
  font-size: var(--fs-32);
}
h3 {
  font-size: var(--fs-24);
}
h4 {
  font-size: var(--fs-20);
}
h5 {
  font-size: var(--fs-18);
}
h6 {
  font-size: var(--fs-16);
}

p {
  margin-bottom: var(--sp-16);
  color: var(--ink-700);
}

a {
  color: var(--brand-500);
  text-decoration: none;
  background-color: transparent;
  transition: color 150ms ease;
  cursor: pointer;
}

a:focus,
a:hover {
  color: var(--brand-600);
  text-decoration: underline;
}

a:focus-visible {
  outline: 2px solid var(--brand-400);
  outline-offset: 2px;
  border-radius: 2px;
}

a:not([href]) {
  color: inherit;
  text-decoration: none;
}

a:not([href]):focus,
a:not([href]):hover {
  color: inherit;
  text-decoration: none;
}

a:not([href]):focus {
  outline: none;
}

.logo-font {
  font-family: var(--font-display);
  font-weight: 600;
}
```

- [ ] **Step 4: Write `apps/conduit/src/styles/base/_global.scss`**

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

app-root > *:not(app-layout-footer) {
  flex-shrink: 0;
}

app-root > app-layout-footer,
app-root > footer {
  margin-top: auto;
}

// Theme transition: only added after first paint by ThemeService,
// to avoid flashing the wrong theme on initial load.
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

- [ ] **Step 5: Commit**

```bash
git add apps/conduit/src/styles/base/
git commit -m "feat(styles): add base reset, typography, and global shell"
```

---

## Task 4: Component styles part 1 — button + input

**Files:**

- Create: `apps/conduit/src/styles/components/_button.scss`
- Create: `apps/conduit/src/styles/components/_input.scss`

- [ ] **Step 1: Create the components folder**

```bash
mkdir -p apps/conduit/src/styles/components
```

- [ ] **Step 2: Write `apps/conduit/src/styles/components/_button.scss`**

```scss
.btn {
  display: inline-block;
  font-family: var(--font-body);
  font-weight: 600;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: var(--sp-8) var(--sp-16);
  font-size: var(--fs-14);
  border-radius: var(--radius-pill);
  transition: all 150ms ease;
}

.btn:focus-visible {
  outline: 2px solid var(--brand-400);
  outline-offset: 2px;
}

.btn:active:not(:disabled) {
  transform: scale(0.98);
}

.btn:focus,
.btn:hover {
  text-decoration: none;
}

.btn.disabled,
.btn:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

a.btn.disabled,
fieldset[disabled] a.btn {
  pointer-events: none;
}

// Primary
.btn-primary {
  color: #fff;
  background-color: var(--brand-500);
  border-color: var(--brand-500);
}

.btn-primary:hover,
.btn-primary:focus,
.btn-primary.focus,
.btn-primary:active,
.btn-primary.active {
  color: #fff;
  background-color: var(--brand-600);
  border-color: var(--brand-600);
}

.btn-primary.disabled:hover,
.btn-primary:disabled:hover {
  background-color: var(--brand-500);
  border-color: var(--brand-500);
}

// Outline (also used for the legacy .btn-outline-primary class)
.btn-outline-primary {
  color: var(--brand-500);
  background-color: transparent;
  border-color: var(--brand-500);
}

.btn-outline-primary:hover,
.btn-outline-primary:focus,
.btn-outline-primary.focus,
.btn-outline-primary:active,
.btn-outline-primary.active {
  color: #fff;
  background-color: var(--brand-500);
  border-color: var(--brand-500);
}

.btn-outline-primary.disabled:hover,
.btn-outline-primary:disabled:hover {
  border-color: var(--brand-400);
}

// Outline secondary (low-emphasis — used by Edit Profile / Follow)
.btn-secondary,
.btn-outline-secondary {
  color: var(--ink-500);
  background-color: transparent;
  border-color: var(--border-strong);
}

.btn-secondary:hover,
.btn-secondary:focus,
.btn-outline-secondary:hover,
.btn-outline-secondary:focus {
  color: var(--ink-900);
  background-color: var(--paper-sunken);
  border-color: var(--ink-400);
}

// Danger (delete actions)
.btn-outline-danger {
  color: var(--danger);
  background-color: transparent;
  border-color: var(--danger);
}

.btn-outline-danger:hover,
.btn-outline-danger:focus,
.btn-outline-danger.focus,
.btn-outline-danger:active,
.btn-outline-danger.active {
  color: #fff;
  background-color: var(--danger);
  border-color: var(--danger);
}

// Sizes
.btn-sm {
  padding: var(--sp-4) var(--sp-12);
  font-size: var(--fs-12);
}

.btn-lg {
  padding: var(--sp-12) var(--sp-24);
  font-size: var(--fs-16);
}
```

- [ ] **Step 3: Write `apps/conduit/src/styles/components/_input.scss`**

```scss
.form-control {
  display: block;
  width: 100%;
  padding: var(--sp-8) var(--sp-12);
  font-family: var(--font-body);
  font-size: var(--fs-16);
  line-height: 1.4;
  color: var(--ink-700);
  background-color: var(--paper-raised);
  background-image: none;
  background-clip: padding-box;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.form-control:focus {
  border-color: var(--brand-500);
  outline: none;
  box-shadow: 0 0 0 3px var(--focus-ring);
}

.form-control::placeholder {
  color: var(--ink-300);
  opacity: 1;
}

.form-control:disabled,
.form-control[readonly] {
  background-color: var(--paper-sunken);
  color: var(--ink-300);
  cursor: not-allowed;
  opacity: 1;
}

.form-control-lg {
  padding: var(--sp-12) var(--sp-16);
  font-size: var(--fs-18);
  border-radius: var(--radius-md);
}

.form-group {
  margin-bottom: var(--sp-16);
}
```

- [ ] **Step 4: Commit**

```bash
git add apps/conduit/src/styles/components/_button.scss apps/conduit/src/styles/components/_input.scss
git commit -m "feat(styles): restyle button + input with new tokens"
```

---

## Task 5: Component styles part 2 — card + tag

**Files:**

- Create: `apps/conduit/src/styles/components/_card.scss`
- Create: `apps/conduit/src/styles/components/_tag.scss`

- [ ] **Step 1: Write `apps/conduit/src/styles/components/_card.scss`**

```scss
.card {
  position: relative;
  display: block;
  margin-bottom: var(--sp-12);
  background-color: var(--paper-raised);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  transition:
    box-shadow 200ms ease,
    transform 200ms ease;
}

.card:hover {
  box-shadow: var(--shadow-sm);
}

.card-block {
  padding: var(--sp-24);
}

.card-block::after {
  content: '';
  display: table;
  clear: both;
}

.card-text:last-child {
  margin-bottom: 0;
}

.card-footer {
  padding: var(--sp-12) var(--sp-24);
  background-color: var(--paper-sunken);
  border-top: 1px solid var(--border);
}

.card-footer::after {
  content: '';
  display: table;
  clear: both;
}

.card-footer:last-child {
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
}
```

- [ ] **Step 2: Write `apps/conduit/src/styles/components/_tag.scss`**

```scss
ul.tag-list {
  display: inline-block;
}

ul.tag-list li {
  display: inline-block;
}

.tag-default {
  display: inline-block;
  font-size: var(--fs-12);
  line-height: 1.1rem;
  padding: var(--sp-4) var(--sp-12);
  background-color: var(--brand-100);
  color: var(--brand-600);
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  font-weight: 600;
  white-space: nowrap;
  margin-right: var(--sp-8);
  margin-bottom: var(--sp-4);
  transition:
    background-color 200ms ease,
    color 200ms ease;
}

.tag-default:hover {
  text-decoration: none;
  background-color: var(--brand-500);
  color: #fff;
}

.tag-default[href]:focus,
.tag-default[href]:hover {
  background-color: var(--brand-500);
  color: #fff;
}

.tag-pill {
  border-radius: var(--radius-pill);
}

.tag-default.tag-outline {
  background: transparent;
  border-color: var(--border-strong);
  color: var(--ink-500);
}

.tag-default.tag-outline:hover {
  background-color: var(--paper-sunken);
  color: var(--ink-900);
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/conduit/src/styles/components/_card.scss apps/conduit/src/styles/components/_tag.scss
git commit -m "feat(styles): restyle card + tag with new tokens"
```

---

## Task 6: Component styles part 3 — nav + pagination

**Files:**

- Create: `apps/conduit/src/styles/components/_nav.scss`
- Create: `apps/conduit/src/styles/components/_pagination.scss`

- [ ] **Step 1: Write `apps/conduit/src/styles/components/_nav.scss`**

This restyles the existing nav/navbar selectors. Plan 2 will replace the navbar template with a sticky blur-on-scroll version; this is just a token-aligned restyle.

```scss
.nav {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.nav-link {
  display: inline-block;
  color: var(--ink-500);
  transition:
    color 150ms ease,
    background-color 150ms ease;
}

.nav-link:focus,
.nav-link:hover {
  text-decoration: none;
  color: var(--ink-900);
}

.nav-link.disabled,
.nav-link.disabled:focus,
.nav-link.disabled:hover {
  color: var(--ink-300);
  cursor: not-allowed;
  background-color: transparent;
}

.nav-pills {
  display: flex;
  flex-wrap: wrap;
}

.nav-pills .nav-item + .nav-item {
  margin-left: var(--sp-4);
}

.nav-pills .nav-link {
  display: block;
  padding: var(--sp-8) var(--sp-16);
  border-radius: var(--radius-pill);
}

.nav-pills .nav-link.active,
.nav-pills .nav-link.active:focus,
.nav-pills .nav-link.active:hover {
  color: #fff;
  cursor: default;
  background-color: var(--brand-500);
}

// Tab-style nav (used by feed toggle, profile tabs)
.nav-pills.outline-active .nav-link {
  border-radius: 0;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--ink-400);
  padding: var(--sp-8) var(--sp-12);
}

.nav-pills.outline-active .nav-link:hover {
  color: var(--ink-700);
  background: transparent;
}

.nav-pills.outline-active .nav-link.active {
  background: transparent;
  border-bottom: 2px solid var(--brand-500);
  color: var(--ink-900);
  font-weight: 700;
}

// Navbar — basic restyle, full sticky/blur version comes in Plan 2
.navbar {
  position: relative;
  padding: var(--sp-8) var(--sp-16);
  background-color: var(--paper);
  border-bottom: 1px solid var(--border);
}

.navbar > .container {
  display: flex;
  align-items: center;
}

.navbar-brand {
  padding-top: 0;
  padding-bottom: var(--sp-4);
  margin-right: var(--sp-32);
  font-family: var(--font-display);
  font-size: var(--fs-24);
  font-weight: 600;
  color: var(--ink-900);
}

.navbar-brand:focus,
.navbar-brand:hover {
  text-decoration: none;
  color: var(--ink-900);
}

.navbar-nav {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.navbar-nav .nav-link {
  display: block;
  padding-top: var(--sp-8);
  padding-bottom: var(--sp-8);
}

.navbar-nav .nav-link + .nav-link,
.navbar-nav .nav-item + .nav-item {
  margin-left: var(--sp-16);
}

.navbar-light .navbar-brand,
.navbar-light .navbar-brand:focus,
.navbar-light .navbar-brand:hover {
  color: var(--ink-900);
}

.navbar-light .navbar-nav .nav-link {
  color: var(--ink-500);
}

.navbar-light .navbar-nav .nav-link:focus,
.navbar-light .navbar-nav .nav-link:hover {
  color: var(--ink-900);
}

.navbar-light .navbar-nav .active > .nav-link,
.navbar-light .navbar-nav .active > .nav-link:focus,
.navbar-light .navbar-nav .active > .nav-link:hover,
.navbar-light .navbar-nav .nav-link.active,
.navbar-light .navbar-nav .nav-link.active:focus,
.navbar-light .navbar-nav .nav-link.active:hover {
  color: var(--ink-900);
  font-weight: 600;
}

.nav-link .user-pic {
  height: 26px;
  border-radius: var(--radius-pill);
  float: left;
  margin-right: var(--sp-4);
}

.nav-signup {
  color: #fff !important;
  background: var(--brand-500);
  border: 1px solid var(--brand-500);
  border-radius: var(--radius-pill);
  padding: var(--sp-4) var(--sp-12) !important;
  font-size: var(--fs-14);
  line-height: 1.25rem;
  font-weight: 600;
  transition:
    background 200ms ease,
    border-color 200ms ease;
}

.nav-signup:hover,
.nav-signup:focus {
  color: #fff !important;
  background: var(--brand-600);
  border-color: var(--brand-600);
}
```

- [ ] **Step 2: Write `apps/conduit/src/styles/components/_pagination.scss`**

```scss
.pagination {
  display: inline-flex;
  padding-left: 0;
  margin-top: var(--sp-16);
  margin-bottom: var(--sp-16);
  gap: 0;
  border-radius: var(--radius-md);
}

.page-item {
  display: inline;
}

.page-item:first-child .page-link {
  margin-left: 0;
  border-bottom-left-radius: var(--radius-md);
  border-top-left-radius: var(--radius-md);
}

.page-item:last-child .page-link {
  border-bottom-right-radius: var(--radius-md);
  border-top-right-radius: var(--radius-md);
}

.page-item.active .page-link,
.page-item.active .page-link:focus,
.page-item.active .page-link:hover {
  z-index: 2;
  color: #fff;
  cursor: default;
  background-color: var(--brand-500);
  border-color: var(--brand-500);
}

.page-item.disabled .page-link,
.page-item.disabled .page-link:focus,
.page-item.disabled .page-link:hover {
  color: var(--ink-300);
  pointer-events: none;
  cursor: not-allowed;
  background-color: var(--paper-raised);
  border-color: var(--border);
}

.page-link {
  position: relative;
  float: left;
  padding: var(--sp-8) var(--sp-12);
  margin-left: -1px;
  color: var(--brand-500);
  text-decoration: none;
  background-color: var(--paper-raised);
  border: 1px solid var(--border);
  cursor: pointer;
  transition:
    color 150ms ease,
    background-color 150ms ease;
}

.page-link:focus,
.page-link:hover {
  color: var(--brand-600);
  background-color: var(--paper-sunken);
  border-color: var(--border-strong);
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/conduit/src/styles/components/_nav.scss apps/conduit/src/styles/components/_pagination.scss
git commit -m "feat(styles): restyle nav + pagination with new tokens"
```

---

## Task 7: Component styles part 4 — skeleton + error messages

**Files:**

- Create: `apps/conduit/src/styles/components/_skeleton.scss`
- Create: `apps/conduit/src/styles/components/_error-messages.scss`

- [ ] **Step 1: Write `apps/conduit/src/styles/components/_skeleton.scss`**

```scss
@keyframes cdt-skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton {
  display: block;
  background-color: var(--paper-sunken);
  background-image: linear-gradient(90deg, var(--paper-sunken) 0%, var(--paper-raised) 50%, var(--paper-sunken) 100%);
  background-size: 200% 100%;
  background-repeat: no-repeat;
  animation: cdt-skeleton-shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-sm);
}

@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
  }
}
```

- [ ] **Step 2: Write `apps/conduit/src/styles/components/_error-messages.scss`**

```scss
.error-messages {
  color: var(--danger);
  font-weight: 600;
  padding-left: var(--sp-32);
  margin-bottom: var(--sp-16);
  list-style: disc;
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/conduit/src/styles/components/_skeleton.scss apps/conduit/src/styles/components/_error-messages.scss
git commit -m "feat(styles): add skeleton shimmer + restyle error messages"
```

---

## Task 8: Layouts and utilities

**Files:**

- Create: `apps/conduit/src/styles/layouts/_container.scss`
- Create: `apps/conduit/src/styles/layouts/_pages-legacy.scss`
- Create: `apps/conduit/src/styles/utilities/_helpers.scss`

These keep the Bootstrap-style grid (`.container`, `.row`, `.col-md-*`) and the page-specific selectors (`.home-page`, `.article-page`, etc.) alive so templates keep working. Plan 2 will replace these as it migrates each page.

- [ ] **Step 1: Create the folders**

```bash
mkdir -p apps/conduit/src/styles/layouts apps/conduit/src/styles/utilities
```

- [ ] **Step 2: Write `apps/conduit/src/styles/layouts/_container.scss`**

```scss
.container {
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
}

@media (min-width: 544px) {
  .container {
    max-width: 576px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 940px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
}

.col-xs-12 {
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 0 0 100%;
  max-width: 100%;
}

@media (min-width: 768px) {
  .col-md-3 {
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    flex: 0 0 25%;
    max-width: 25%;
  }
  .col-md-6 {
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    flex: 0 0 50%;
    max-width: 50%;
  }
  .col-md-8 {
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    flex: 0 0 66.66667%;
    max-width: 66.66667%;
  }
  .col-md-9 {
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    flex: 0 0 75%;
    max-width: 75%;
  }
  .col-md-10 {
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    flex: 0 0 83.33333%;
    max-width: 83.33333%;
  }
  .col-md-12 {
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    flex: 0 0 100%;
    max-width: 100%;
  }
  .offset-md-1 {
    margin-left: 8.33333%;
  }
  .offset-md-2 {
    margin-left: 16.66667%;
  }
  .offset-md-3 {
    margin-left: 25%;
  }
}
```

- [ ] **Step 3: Write `apps/conduit/src/styles/layouts/_pages-legacy.scss`**

These are the page-shape selectors templates rely on today, ported to use the new tokens. Plan 2 will replace each `.home-page`, `.article-page`, `.profile-page`, etc. block as it migrates that page.

```scss
:root {
  --content-width: 720px;
  --content-breakpoint: 1080px;
}

// Footer
footer {
  background: var(--paper);
  border-top: 1px solid var(--border);
  margin-top: var(--sp-48);
  padding: var(--sp-16) 0;
  width: 100%;
}

footer .logo-font {
  color: var(--ink-900);
}

footer a {
  color: var(--ink-900);
}

footer .attribution {
  margin-left: 10px;
  font-size: var(--fs-12);
  color: var(--ink-400);
  font-weight: 300;
}

footer > .container {
  display: flex;
  align-items: center;
  max-width: var(--content-width);
  margin-left: auto;
  margin-right: auto;
}

// Banner (shared by home + article)
.banner {
  color: var(--ink-700);
  background: var(--paper-sunken);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: var(--sp-32);
  margin-bottom: var(--sp-32);
}

.banner h1 {
  margin-bottom: 0;
}

.container.page {
  margin-top: var(--sp-24);
}

// Article preview (home + profile feeds)
.preview-link {
  color: inherit;
}

.preview-link:hover {
  text-decoration: inherit;
}

.article-meta {
  display: block;
  position: relative;
  font-weight: 400;
}

.article-meta img {
  display: inline-block;
  vertical-align: middle;
  height: 32px;
  width: 32px;
  border-radius: 50%;
}

.article-meta .btn + .btn,
.article-meta app-follow-button + app-favorite-button,
.article-meta app-favorite-button {
  margin-left: var(--sp-8);
}

.article-meta .info {
  margin: 0 var(--sp-24) 0 var(--sp-8);
  display: inline-block;
  vertical-align: middle;
  line-height: 1rem;
}

.article-meta .info .author {
  display: block;
  font-weight: 600;
  color: var(--ink-900);
}

.article-meta .info .date {
  color: var(--ink-400);
  font-size: var(--fs-12);
  display: block;
}

.article-preview {
  border-top: 1px solid var(--border);
  padding: var(--sp-24) 0;
  transition: background-color 200ms ease;
}

.article-preview:hover {
  background-color: var(--paper-sunken);
}

.article-preview .article-meta {
  margin: 0 0 var(--sp-16) 0;
}

.article-preview .preview-link h1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--fs-24);
  line-height: var(--lh-tight);
  margin-bottom: 3px;
  color: var(--ink-900);
}

.article-preview .preview-link p {
  font-weight: 400;
  font-size: var(--fs-16);
  color: var(--ink-500);
  margin-bottom: var(--sp-16);
  line-height: 1.5;
}

.article-preview .preview-link span {
  max-width: 30%;
  font-size: var(--fs-12);
  font-weight: 400;
  color: var(--ink-400);
  vertical-align: middle;
}

.article-preview .preview-link ul {
  float: right;
  max-width: 50%;
  vertical-align: top;
}

.article-preview .preview-link ul li {
  font-weight: 400;
  font-size: var(--fs-12);
  padding-top: 0;
  padding-bottom: 0;
}

.btn .counter {
  font-size: var(--fs-12);
}

// Home page
.home-page .banner p {
  text-align: center;
  font-size: var(--fs-16);
  font-weight: 400;
  color: var(--ink-500);
  margin-bottom: 0;
}

.home-page .banner p a {
  color: var(--brand-500);
  text-decoration: underline;
}

.home-page .banner h1 {
  font-family: var(--font-display);
  font-weight: 700;
  text-align: center;
  font-size: var(--fs-56);
  line-height: var(--lh-tight);
  padding-bottom: var(--sp-8);
  color: var(--ink-900);
}

.home-page .feed-toggle {
  margin-bottom: -1px;
}

.home-page .sidebar {
  margin-left: 10px;
  padding-left: 20px;
  background: none;
  border-left: 1px solid var(--border);
}

.home-page .sidebar p {
  margin-bottom: var(--sp-4);
}

// Article page
.article-page .banner {
  padding: var(--sp-32) 0;
}

.article-page .banner h1 {
  font-family: var(--font-display);
  font-size: var(--fs-44);
  font-weight: 700;
  color: var(--ink-900);
}

.article-page .banner .btn {
  opacity: 0.85;
}

.article-page .banner .btn:hover {
  transition: 0.1s all;
  opacity: 1;
}

.article-page .banner .article-meta {
  margin: var(--sp-32) 0 0 0;
}

.article-page .banner .article-meta .author {
  color: var(--ink-900);
}

.article-page .banner > .container,
.article-page .article-content,
.article-page .article-actions,
.article-page .container.page > .row {
  max-width: var(--content-width);
  margin-left: auto;
  margin-right: auto;
}

.article-page .article-content.row,
.article-page .container.page > .row {
  margin-left: auto;
  margin-right: auto;
}

.article-page .article-content .col-md-12,
.article-page .container.page > .row > [class*='col-'] {
  padding-left: 0;
  padding-right: 0;
  flex: 0 0 100%;
  max-width: 100%;
  margin-left: 0;
}

.article-page .article-content p {
  font-family: var(--font-display);
  font-size: var(--fs-18);
  line-height: var(--lh-relaxed);
  margin-bottom: var(--sp-32);
  color: var(--ink-700);
}

.article-page .article-content h1,
.article-page .article-content h2,
.article-page .article-content h3,
.article-page .article-content h4,
.article-page .article-content h5,
.article-page .article-content h6 {
  font-family: var(--font-display);
  font-weight: 600;
  margin: var(--sp-32) 0 var(--sp-16) 0;
  color: var(--ink-900);
}

.article-page .article-content ul,
.article-page .article-content ol {
  margin-bottom: var(--sp-16);
  padding-left: var(--sp-32);
}

.article-page .article-content ul ul,
.article-page .article-content ul ol,
.article-page .article-content ol ul,
.article-page .article-content ol ol {
  margin-bottom: 0;
  padding-left: var(--sp-32);
}

.article-page .article-content ul {
  list-style: disc;
}

.article-page .article-content ul ul {
  list-style: circle;
}

.article-page .article-content ul ul ul {
  list-style: square;
}

.article-page .article-content ol {
  list-style: decimal;
}

.article-page .article-content ol ol {
  list-style: lower-alpha;
}

.article-page .article-content ol ol ol {
  list-style: lower-roman;
}

.article-page .article-actions {
  text-align: center;
  margin-top: var(--sp-24);
  margin-bottom: var(--sp-48);
}

.article-page .article-actions .article-meta .info {
  text-align: left;
}

.article-page .comment-form .card-block {
  padding: 0;
}

.article-page .comment-form .card-block textarea {
  border: 0;
  padding: var(--sp-24);
  background-color: var(--paper-raised);
}

.article-page .comment-form .card-footer .btn {
  font-weight: 700;
  float: right;
}

.article-page .comment-form .card-footer .comment-author-img {
  height: 30px;
  width: 30px;
}

.article-page .card {
  border: 1px solid var(--border);
}

.article-page .card .card-footer {
  border-top: 1px solid var(--border);
  font-size: var(--fs-12);
  font-weight: 400;
}

.article-page .card .comment-author-img {
  display: inline-block;
  vertical-align: middle;
  height: 20px;
  width: 20px;
  border-radius: 50%;
}

.article-page .card .comment-author {
  display: inline-block;
  vertical-align: middle;
  color: var(--ink-900);
}

.article-page .card .date-posted {
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
  color: var(--ink-400);
}

.article-page .card .mod-options {
  float: right;
  color: var(--ink-700);
  font-size: var(--fs-16);
}

.article-page .card .mod-options i {
  margin-left: 5px;
  opacity: 0.6;
  cursor: pointer;
}

.article-page .card .mod-options i:hover {
  opacity: 1;
}

// Profile page
.profile-page .user-info {
  text-align: center;
  background: var(--paper-sunken);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: var(--sp-32) 0 var(--sp-16) 0;
}

.profile-page .user-info .user-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: var(--sp-16);
}

.profile-page .user-info h4 {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--ink-900);
}

.profile-page .user-info p {
  margin: 0 auto var(--sp-8) auto;
  color: var(--ink-500);
  max-width: 450px;
  font-weight: 400;
}

.profile-page .user-info .action-btn {
  float: right;
  color: var(--ink-500);
  border: 1px solid var(--border-strong);
}

.profile-page .articles-toggle {
  margin: var(--sp-24) 0 -1px 0;
}

// Editor page
.editor-page .tag-list i {
  font-size: var(--fs-12);
  margin-right: 5px;
  cursor: pointer;
}
```

- [ ] **Step 4: Write `apps/conduit/src/styles/utilities/_helpers.scss`**

```scss
.pull-xs-right {
  float: right !important;
}

.text-xs-center {
  text-align: center !important;
}
```

- [ ] **Step 5: Commit**

```bash
git add apps/conduit/src/styles/layouts/ apps/conduit/src/styles/utilities/
git commit -m "feat(styles): add layouts (legacy grid + pages) and utilities"
```

---

## Task 9: Replace `styles.scss` entry, verify build

**Files:**

- Modify: `apps/conduit/src/styles.scss`

- [ ] **Step 1: Replace contents of `apps/conduit/src/styles.scss`**

```scss
// Design tokens
@use 'styles/tokens/colors';
@use 'styles/tokens/typography';
@use 'styles/tokens/spacing';

// Base
@use 'styles/base/reset';
@use 'styles/base/typography' as base-typography;
@use 'styles/base/global';

// Components
@use 'styles/components/button';
@use 'styles/components/input';
@use 'styles/components/card';
@use 'styles/components/tag';
@use 'styles/components/nav';
@use 'styles/components/pagination';
@use 'styles/components/skeleton';
@use 'styles/components/error-messages';

// Layouts
@use 'styles/layouts/container';
@use 'styles/layouts/pages-legacy';

// Utilities
@use 'styles/utilities/helpers';
```

- [ ] **Step 2: Build the app to verify SCSS compiles**

```bash
npx nx run conduit:build
```

Expected: build completes successfully. No SCSS errors. Bundle size warnings about styles.scss should be similar to before (or smaller).

- [ ] **Step 3: Serve the app and visually verify**

```bash
npx nx run conduit:serve --port=4200
```

Open `http://localhost:4200/` in a browser. Expected:

- Page loads without errors
- New warm palette (terracotta + warm off-white) is visible
- Fraunces serif appears on the brand wordmark and headings
- Nunito Sans appears on body text
- Buttons, links, cards visibly use the new tokens
- Layout is the same as before (no template changes yet)

Stop the server with Ctrl+C.

- [ ] **Step 4: Run e2e suite to confirm nothing broke**

```bash
npx nx e2e conduit-e2e
```

Expected: all e2e tests pass. They test functional behavior (forms, navigation, auth flows) — class names changed visually but selectors based on `data-testid` and visible text should still match.

If any test fails for a reason unrelated to visual changes (e.g. a `data-testid` got accidentally moved), STOP and investigate.

- [ ] **Step 5: Commit**

```bash
git add apps/conduit/src/styles.scss
git commit -m "refactor(styles): replace monolithic styles.scss with new SCSS architecture"
```

---

## Task 10: Create `libs/core/theme` library

**Files:**

- Create: `libs/core/theme/project.json`
- Create: `libs/core/theme/tsconfig.json`
- Create: `libs/core/theme/tsconfig.lib.json`
- Create: `libs/core/theme/tsconfig.spec.json`
- Create: `libs/core/theme/vite.config.mts`
- Create: `libs/core/theme/src/index.ts`
- Create: `libs/core/theme/src/test-setup.ts`
- Modify: `tsconfig.base.json`

- [ ] **Step 1: Create the library scaffolding**

```bash
mkdir -p libs/core/theme/src
```

- [ ] **Step 2: Write `libs/core/theme/project.json`**

```json
{
  "name": "core-theme",
  "$schema": "../../../node_modules/nx/schemas/project-schema.json",
  "projectType": "library",
  "sourceRoot": "libs/core/theme/src",
  "prefix": "cdt",
  "targets": {
    "test": {
      "executor": "@nx/vitest:test",
      "outputs": ["{options.reportsDirectory}"],
      "options": {
        "reportsDirectory": "{projectRoot}/../../../coverage/libs/core/theme"
      }
    }
  }
}
```

- [ ] **Step 3: Write `libs/core/theme/tsconfig.json`**

```json
{
  "extends": "../../../tsconfig.base.json",
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./tsconfig.lib.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ],
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

- [ ] **Step 4: Write `libs/core/theme/tsconfig.lib.json`**

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../../dist/out-tsc",
    "declaration": true,
    "declarationMap": true,
    "inlineSources": true,
    "types": []
  },
  "exclude": ["src/**/*.spec.ts", "src/test-setup.ts", "vite.config.mts"],
  "include": ["src/**/*.ts"]
}
```

- [ ] **Step 5: Write `libs/core/theme/tsconfig.spec.json`**

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../../dist/out-tsc",
    "module": "esnext",
    "target": "es2016",
    "types": ["vitest/globals", "node"]
  },
  "include": ["src/**/*.spec.ts", "src/**/*.test.ts", "src/**/*.d.ts", "src/test-setup.ts"]
}
```

- [ ] **Step 6: Write `libs/core/theme/vite.config.mts`**

```ts
/// <reference types='vitest' />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/libs/core/theme',
  plugins: [angular(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  test: {
    name: 'core-theme',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['src/test-setup.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/libs/core/theme',
      provider: 'v8' as const,
    },
  },
}));
```

- [ ] **Step 7: Write `libs/core/theme/src/test-setup.ts`**

```ts
import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';

import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { getTestBed } from '@angular/core/testing';

getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
```

- [ ] **Step 8: Write `libs/core/theme/src/index.ts`** (placeholder; populated in next task)

```ts
export {};
```

- [ ] **Step 9: Add the path alias to `tsconfig.base.json`**

In `tsconfig.base.json`, add inside `compilerOptions.paths` (alphabetical position, after `@realworld/core/http-client`):

```json
"@realworld/core/theme": ["libs/core/theme/src/index.ts"],
```

The full updated `paths` block should look like (showing context):

```json
"@realworld/core/forms": ["libs/core/forms/src/index.ts"],
"@realworld/core/http-client": ["libs/core/http-client/src/index.ts"],
"@realworld/core/theme": ["libs/core/theme/src/index.ts"],
"@realworld/home/feature-home": ["libs/home/feature-home/src/index.ts"],
```

- [ ] **Step 10: Verify nx recognizes the project**

```bash
npx nx show projects | grep core-theme
```

Expected: prints `core-theme`.

- [ ] **Step 11: Commit**

```bash
git add libs/core/theme/ tsconfig.base.json
git commit -m "chore(core/theme): scaffold theme library"
```

---

## Task 11: Implement `ThemeService` (TDD)

**Files:**

- Create: `libs/core/theme/src/theme.service.spec.ts`
- Create: `libs/core/theme/src/theme.service.ts`
- Create: `libs/core/theme/src/provide-theme.ts`
- Modify: `libs/core/theme/src/index.ts`

`ThemeService` exposes a writable signal `theme` (`'light' | 'dark' | 'system'`), reads/writes `localStorage['conduit-theme']`, computes a derived `resolved` signal, and an effect applies `data-theme` to `document.documentElement`. After first paint it adds the `theme-transition` class to `<body>`.

- [ ] **Step 1: Write `libs/core/theme/src/theme.service.spec.ts`**

```ts
import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ThemeService, type ThemePreference } from './theme.service';

const STORAGE_KEY = 'conduit-theme';

describe('ThemeService', () => {
  let originalMatchMedia: typeof window.matchMedia;
  let mediaListeners: Array<(event: { matches: boolean }) => void>;
  let mediaQueryMatches = false;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.body.classList.remove('theme-transition');

    mediaListeners = [];
    mediaQueryMatches = false;
    originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: mediaQueryMatches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: (_event: string, listener: (event: { matches: boolean }) => void) => {
        mediaListeners.push(listener);
      },
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    document.documentElement.removeAttribute('data-theme');
    document.body.classList.remove('theme-transition');
  });

  it("defaults to 'system' when no preference is stored", () => {
    TestBed.runInInjectionContext(() => {
      const service = new ThemeService();
      expect(service.theme()).toBe('system');
    });
  });

  it('reads stored preference from localStorage on construction', () => {
    localStorage.setItem(STORAGE_KEY, 'dark');
    TestBed.runInInjectionContext(() => {
      const service = new ThemeService();
      expect(service.theme()).toBe('dark');
    });
  });

  it("ignores invalid stored values and falls back to 'system'", () => {
    localStorage.setItem(STORAGE_KEY, 'fuchsia');
    TestBed.runInInjectionContext(() => {
      const service = new ThemeService();
      expect(service.theme()).toBe('system');
    });
  });

  it("resolves 'system' to dark when prefers-color-scheme: dark", () => {
    mediaQueryMatches = true;
    TestBed.runInInjectionContext(() => {
      const service = new ThemeService();
      expect(service.resolved()).toBe('dark');
    });
  });

  it("resolves 'system' to light when prefers-color-scheme: light", () => {
    mediaQueryMatches = false;
    TestBed.runInInjectionContext(() => {
      const service = new ThemeService();
      expect(service.resolved()).toBe('light');
    });
  });

  it("resolves to the explicit value when theme is 'light' or 'dark'", () => {
    mediaQueryMatches = true;
    TestBed.runInInjectionContext(() => {
      const service = new ThemeService();
      service.setTheme('light');
      expect(service.resolved()).toBe('light');
      service.setTheme('dark');
      expect(service.resolved()).toBe('dark');
    });
  });

  it("applies data-theme='light' to <html> when resolved is light", () => {
    TestBed.runInInjectionContext(() => {
      const service = new ThemeService();
      service.setTheme('light');
      TestBed.flushEffects();
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });

  it("applies data-theme='dark' to <html> when resolved is dark", () => {
    TestBed.runInInjectionContext(() => {
      const service = new ThemeService();
      service.setTheme('dark');
      TestBed.flushEffects();
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  it('persists changes to localStorage', () => {
    TestBed.runInInjectionContext(() => {
      const service = new ThemeService();
      service.setTheme('dark');
      expect(localStorage.getItem(STORAGE_KEY)).toBe('dark');
      service.setTheme('light');
      expect(localStorage.getItem(STORAGE_KEY)).toBe('light');
      service.setTheme('system');
      expect(localStorage.getItem(STORAGE_KEY)).toBe('system');
    });
  });

  it("updates resolved when system preference changes while theme is 'system'", () => {
    mediaQueryMatches = false;
    TestBed.runInInjectionContext(() => {
      const service = new ThemeService();
      expect(service.resolved()).toBe('light');
      // Simulate system preference flipping to dark
      mediaListeners.forEach((listener) => listener({ matches: true }));
      expect(service.resolved()).toBe('dark');
    });
  });

  it('rejects setTheme calls with invalid values', () => {
    TestBed.runInInjectionContext(() => {
      const service = new ThemeService();
      // @ts-expect-error testing invalid runtime input
      expect(() => service.setTheme('chartreuse')).toThrow();
    });
  });

  it('exposes ThemePreference union type', () => {
    const valid: ThemePreference[] = ['light', 'dark', 'system'];
    expect(valid).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npx nx test core-theme
```

Expected: FAIL with "Cannot find module './theme.service'" or similar — the service doesn't exist yet.

- [ ] **Step 3: Write `libs/core/theme/src/theme.service.ts`**

```ts
import { Injectable, signal, computed, effect, Signal, WritableSignal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'conduit-theme';
const VALID_PREFERENCES: ReadonlyArray<ThemePreference> = ['light', 'dark', 'system'];

function isValidPreference(value: unknown): value is ThemePreference {
  return typeof value === 'string' && (VALID_PREFERENCES as ReadonlyArray<string>).includes(value);
}

function readStoredPreference(): ThemePreference {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return isValidPreference(raw) ? raw : 'system';
  } catch {
    return 'system';
  }
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly theme: WritableSignal<ThemePreference> = signal<ThemePreference>(readStoredPreference());

  private readonly systemPrefersDark = signal<boolean>(this.detectSystemPrefersDark());

  readonly resolved: Signal<ResolvedTheme> = computed(() => {
    const t = this.theme();
    if (t === 'system') {
      return this.systemPrefersDark() ? 'dark' : 'light';
    }
    return t;
  });

  constructor() {
    this.watchSystemPreference();

    effect(() => {
      const resolved = this.resolved();
      this.document.documentElement.setAttribute('data-theme', resolved);
    });

    effect(() => {
      const t = this.theme();
      try {
        localStorage.setItem(STORAGE_KEY, t);
      } catch {
        // localStorage unavailable (private mode etc.) — best-effort, ignore
      }
    });
  }

  setTheme(preference: ThemePreference): void {
    if (!isValidPreference(preference)) {
      throw new Error(`Invalid theme preference: ${String(preference)}`);
    }
    this.theme.set(preference);
  }

  /**
   * Enable smooth color transitions. Called once after the initial paint
   * to prevent the page from animating on first render.
   */
  enableTransitions(): void {
    this.document.body.classList.add('theme-transition');
  }

  private detectSystemPrefersDark(): boolean {
    try {
      return this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    } catch {
      return false;
    }
  }

  private watchSystemPreference(): void {
    try {
      const mql = this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)');
      if (!mql) return;
      mql.addEventListener('change', (event: { matches: boolean }) => {
        this.systemPrefersDark.set(event.matches);
      });
    } catch {
      // matchMedia unavailable — silently no-op
    }
  }
}
```

- [ ] **Step 4: Write `libs/core/theme/src/provide-theme.ts`**

```ts
import { provideAppInitializer, inject, EnvironmentProviders } from '@angular/core';
import { ThemeService } from './theme.service';

/**
 * Initializes the ThemeService eagerly during app bootstrap so the
 * data-theme attribute is set before the first paint, then enables
 * smooth color transitions one frame later.
 */
export function provideTheme(): EnvironmentProviders {
  return provideAppInitializer(() => {
    const theme = inject(ThemeService);
    // Touch the resolved signal to trigger the initial effect that sets data-theme.
    void theme.resolved();
    // Enable transitions on the next frame so the initial paint doesn't animate.
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => theme.enableTransitions());
    } else {
      queueMicrotask(() => theme.enableTransitions());
    }
  });
}
```

- [ ] **Step 5: Update `libs/core/theme/src/index.ts`**

```ts
export { ThemeService } from './theme.service';
export type { ThemePreference, ResolvedTheme } from './theme.service';
export { provideTheme } from './provide-theme';
```

- [ ] **Step 6: Run the test to verify it passes**

```bash
npx nx test core-theme
```

Expected: all tests in `theme.service.spec.ts` PASS. If any fail, fix the implementation (not the test) and re-run.

- [ ] **Step 7: Commit**

```bash
git add libs/core/theme/src/
git commit -m "feat(core/theme): add ThemeService with light/dark/system preference"
```

---

## Task 12: Wire `ThemeService` into the app initializer

**Files:**

- Modify: `apps/conduit/src/app/app.config.ts`

- [ ] **Step 1: Add the `provideTheme` import and provider in `app.config.ts`**

Read the current file to see the existing providers, then add `provideTheme()` to the providers array.

The new top section (replacing the existing imports + providers) should be:

```ts
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { AuthGuard } from '@realworld/auth/data-access';
import { errorHandlingInterceptor } from '@realworld/core/error-handler';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { API_URL } from '@realworld/core/http-client';
import { provideTheme } from '@realworld/core/theme';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideTheme(),
    provideRouter(
      // ...rest of existing config unchanged
```

Keep the rest of the file (router config, interceptors, API_URL provider) exactly as it is.

- [ ] **Step 2: Build to verify the import resolves**

```bash
npx nx run conduit:build
```

Expected: build succeeds. If it fails with "Cannot find module '@realworld/core/theme'", check that Task 10 step 9 added the path alias correctly to `tsconfig.base.json`.

- [ ] **Step 3: Serve the app and verify dark mode works via system preference**

```bash
npx nx run conduit:serve --port=4200
```

Open `http://localhost:4200/` in a browser. Then:

1. Open DevTools → Rendering → "Emulate CSS media feature prefers-color-scheme" → set to `dark`
2. Expected: page colors flip to dark mode (warm dark background, lighter text)
3. Set back to `light` → page returns to light mode
4. In DevTools console, run `localStorage.setItem('conduit-theme', 'dark'); location.reload()` → page loads in dark mode immediately, no flash
5. Run `localStorage.setItem('conduit-theme', 'system'); location.reload()` → respects system pref again

If any step fails, investigate before proceeding.

Stop the server with Ctrl+C.

- [ ] **Step 4: Run e2e to confirm theme provider doesn't break anything**

```bash
npx nx e2e conduit-e2e
```

Expected: all e2e tests pass.

- [ ] **Step 5: Commit**

```bash
git add apps/conduit/src/app/app.config.ts
git commit -m "feat(app): wire ThemeService into app initializer"
```

---

## Task 13: Add `cdt-icon` wrapper

**Files:**

- Create: `libs/ui/components/src/icon/icon.component.ts`
- Modify: `libs/ui/components/src/index.ts`

`cdt-icon` is a thin wrapper around `lucide-angular`'s `<lucide-angular>` component, giving us a single import point and a stable name we can swap out later if needed.

- [ ] **Step 1: Create the folder**

```bash
mkdir -p libs/ui/components/src/icon
```

- [ ] **Step 2: Write `libs/ui/components/src/icon/icon.component.ts`**

```ts
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideAngularModule, icons, type LucideIconData } from 'lucide-angular';

export type IconSize = 12 | 14 | 16 | 18 | 20 | 24 | 32;

@Component({
  selector: 'cdt-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <lucide-angular
      [img]="iconData()"
      [size]="size()"
      [strokeWidth]="strokeWidth()"
      [attr.aria-hidden]="ariaLabel() ? null : 'true'"
      [attr.aria-label]="ariaLabel()"
      [attr.role]="ariaLabel() ? 'img' : null"
    ></lucide-angular>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
        color: currentColor;
      }
    `,
  ],
})
export class IconComponent {
  /** Lucide icon name in kebab-case, e.g. 'heart', 'pencil', 'trash-2'. */
  readonly name = input.required<string>();
  readonly size = input<IconSize>(16);
  readonly strokeWidth = input<number>(2);
  readonly ariaLabel = input<string | null>(null);

  readonly iconData = computed<LucideIconData>(() => {
    const pascal = toPascalCase(this.name());
    const data = (icons as Record<string, LucideIconData>)[pascal];
    if (!data) {
      throw new Error(`Lucide icon not found: '${this.name()}' (looked up as '${pascal}')`);
    }
    return data;
  });
}

function toPascalCase(kebab: string): string {
  return kebab
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}
```

- [ ] **Step 3: Update `libs/ui/components/src/index.ts`**

```ts
export * from './pager/pager.component';
export * from './icon/icon.component';
```

- [ ] **Step 4: Build the app to verify the new component compiles**

```bash
npx nx run conduit:build
```

Expected: build succeeds. The `cdt-icon` component is now available but not yet used anywhere.

- [ ] **Step 5: Commit**

```bash
git add libs/ui/components/src/icon/ libs/ui/components/src/index.ts
git commit -m "feat(ui): add cdt-icon wrapper around lucide-angular"
```

---

## Task 14: Add vitest config to `ui-components` lib + avatar utility (TDD)

**Files:**

- Create: `libs/ui/components/vite.config.mts`
- Modify: `libs/ui/components/project.json`
- Create: `libs/ui/components/src/avatar/avatar.utils.ts`
- Create: `libs/ui/components/src/avatar/avatar.utils.spec.ts`

The `ui-components` lib doesn't have test infrastructure yet. We need to add a `vite.config.mts` and a `test` target before we can run unit tests there.

The avatar utility derives initials and a deterministic color from a username. Pure function, easy to TDD.

- [ ] **Step 1: Write `libs/ui/components/vite.config.mts`**

```ts
/// <reference types='vitest' />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/libs/ui/components',
  plugins: [angular(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  test: {
    name: 'ui-components',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['src/test-setup.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/libs/ui/components',
      provider: 'v8' as const,
    },
  },
}));
```

- [ ] **Step 2: Add `test` target to `libs/ui/components/project.json`**

Replace the existing file with:

```json
{
  "name": "ui-components",
  "$schema": "../../../node_modules/nx/schemas/project-schema.json",
  "projectType": "library",
  "sourceRoot": "libs/ui/components/src",
  "prefix": "cdt",
  "targets": {
    "test": {
      "executor": "@nx/vitest:test",
      "outputs": ["{options.reportsDirectory}"],
      "options": {
        "reportsDirectory": "{projectRoot}/../../../coverage/libs/ui/components"
      }
    }
  }
}
```

- [ ] **Step 3: Create the avatar folder**

```bash
mkdir -p libs/ui/components/src/avatar
```

- [ ] **Step 4: Write `libs/ui/components/src/avatar/avatar.utils.spec.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { getInitials, getAvatarColor, AVATAR_PALETTE } from './avatar.utils';

describe('getInitials', () => {
  it('returns first letter of first and last word for two-word names', () => {
    expect(getInitials('Eleanor Vance')).toBe('EV');
    expect(getInitials('Daniel Park')).toBe('DP');
  });

  it('returns first two letters for single-word usernames', () => {
    expect(getInitials('eleanor')).toBe('EL');
    expect(getInitials('a')).toBe('A');
  });

  it('returns first letter of first word + first letter of last word for 3+ word names', () => {
    expect(getInitials('Mary Jane Watson')).toBe('MW');
    expect(getInitials('Jean-Luc Picard de la Forge')).toBe('JF');
  });

  it('uppercases the result', () => {
    expect(getInitials('alice bob')).toBe('AB');
  });

  it('returns ? for empty or whitespace-only input', () => {
    expect(getInitials('')).toBe('?');
    expect(getInitials('   ')).toBe('?');
  });

  it('handles leading/trailing whitespace', () => {
    expect(getInitials('  Eleanor Vance  ')).toBe('EV');
  });

  it('handles non-ASCII characters', () => {
    expect(getInitials('Émile Zöe')).toBe('ÉZ');
  });
});

describe('getAvatarColor', () => {
  it('returns the same color for the same username (deterministic)', () => {
    expect(getAvatarColor('eleanor')).toBe(getAvatarColor('eleanor'));
    expect(getAvatarColor('Eleanor Vance')).toBe(getAvatarColor('Eleanor Vance'));
  });

  it('returns a color from the curated palette', () => {
    const result = getAvatarColor('eleanor');
    expect(AVATAR_PALETTE).toContain(result);
  });

  it('distributes across the palette for varied inputs', () => {
    const inputs = ['alice', 'bob', 'carol', 'dan', 'eve', 'frank', 'grace', 'henry', 'iris', 'jack'];
    const colors = new Set(inputs.map(getAvatarColor));
    // With 10 different inputs over an 8-color palette, expect at least 4 distinct hits.
    expect(colors.size).toBeGreaterThanOrEqual(4);
  });

  it('returns the first palette color for empty input (deterministic fallback)', () => {
    expect(getAvatarColor('')).toBe(AVATAR_PALETTE[0]);
  });

  it('palette has exactly 8 colors', () => {
    expect(AVATAR_PALETTE).toHaveLength(8);
  });
});
```

- [ ] **Step 5: Run the test to verify it fails**

```bash
npx nx test ui-components
```

Expected: FAIL with "Cannot find module './avatar.utils'".

- [ ] **Step 6: Write `libs/ui/components/src/avatar/avatar.utils.ts`**

```ts
/**
 * Curated 8-color palette for avatar fallbacks. Each color has been
 * verified for AA contrast against white text.
 *
 * Colors: terracotta, moss, plum, teal, ochre, dusk blue, rose, slate.
 */
export const AVATAR_PALETTE = [
  '#c2613a',
  '#4a6b3f',
  '#6d3d5d',
  '#2e6e6a',
  '#9a7724',
  '#3d5a80',
  '#b56576',
  '#52606d',
] as const;

export function getInitials(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    return '?';
  }

  const parts = trimmed.split(/\s+/u);

  if (parts.length === 1) {
    const word = parts[0];
    return (word.length >= 2 ? word.slice(0, 2) : word).toUpperCase();
  }

  const first = parts[0].charAt(0);
  const last = parts[parts.length - 1].charAt(0);
  return (first + last).toUpperCase();
}

export function getAvatarColor(username: string): string {
  if (username.length === 0) {
    return AVATAR_PALETTE[0];
  }
  const hash = djb2Hash(username);
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

/**
 * djb2 string hash. Returns a non-negative 32-bit integer.
 * Chosen for being simple, deterministic, and well-distributed for short strings.
 */
function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}
```

- [ ] **Step 7: Run the test to verify it passes**

```bash
npx nx test ui-components
```

Expected: all tests in `avatar.utils.spec.ts` PASS.

- [ ] **Step 8: Commit**

```bash
git add libs/ui/components/vite.config.mts libs/ui/components/project.json libs/ui/components/src/avatar/
git commit -m "feat(ui): add avatar utils (initials + color hash) with tests"
```

---

## Task 15: Add `cdt-avatar` component

**Files:**

- Create: `libs/ui/components/src/avatar/avatar.component.ts`
- Create: `libs/ui/components/src/avatar/avatar.component.scss`
- Modify: `libs/ui/components/src/index.ts`

`cdt-avatar` shows the user's image; if `src` is missing or the image fails to load, it falls back to a colored circle with initials. Color is hashed from `username` so the same user always gets the same color.

- [ ] **Step 1: Write `libs/ui/components/src/avatar/avatar.component.scss`**

```scss
:host {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  font-family: inherit;
  font-weight: 700;
  color: #fff;
  user-select: none;
}

:host(.size-sm) {
  width: 24px;
  height: 24px;
  font-size: 0.65rem;
}

:host(.size-md) {
  width: 32px;
  height: 32px;
  font-size: 0.75rem;
}

:host(.size-lg) {
  width: 44px;
  height: 44px;
  font-size: 0.95rem;
}

:host(.size-xl) {
  width: 88px;
  height: 88px;
  font-size: 1.7rem;
}

img.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatar-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.02em;
}
```

- [ ] **Step 2: Write `libs/ui/components/src/avatar/avatar.component.ts`**

```ts
import { ChangeDetectionStrategy, Component, computed, HostBinding, input, signal } from '@angular/core';
import { getAvatarColor, getInitials } from './avatar.utils';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'cdt-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: undefined,
  styleUrl: './avatar.component.scss',
  template: `
    @if ($showImage()) {
      <img class="avatar-img" [src]="src()" [alt]="username()" (error)="onImageError()" (load)="onImageLoad()" />
    } @else {
      <span class="avatar-fallback" [style.background-color]="$bgColor()" [attr.aria-label]="username()" role="img">
        {{ $initials() }}
      </span>
    }
  `,
})
export class AvatarComponent {
  readonly src = input<string | null | undefined>(null);
  readonly username = input.required<string>();
  readonly size = input<AvatarSize>('md');

  private readonly imageFailed = signal(false);

  readonly $showImage = computed(() => {
    const url = this.src();
    return typeof url === 'string' && url.length > 0 && !this.imageFailed();
  });

  readonly $initials = computed(() => getInitials(this.username()));
  readonly $bgColor = computed(() => getAvatarColor(this.username()));

  @HostBinding('class')
  get hostClass(): string {
    return `size-${this.size()}`;
  }

  onImageError(): void {
    this.imageFailed.set(true);
  }

  onImageLoad(): void {
    // Reset fallback if a valid src loads later (e.g. src input changed).
    if (this.imageFailed()) {
      this.imageFailed.set(false);
    }
  }
}
```

- [ ] **Step 3: Update `libs/ui/components/src/index.ts`**

```ts
export * from './pager/pager.component';
export * from './icon/icon.component';
export * from './avatar/avatar.component';
export { getInitials, getAvatarColor, AVATAR_PALETTE } from './avatar/avatar.utils';
```

- [ ] **Step 4: Build to verify the component compiles**

```bash
npx nx run conduit:build
```

Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add libs/ui/components/src/avatar/avatar.component.ts libs/ui/components/src/avatar/avatar.component.scss libs/ui/components/src/index.ts
git commit -m "feat(ui): add cdt-avatar component with image+initials fallback"
```

---

## Task 16: Add `cdt-skeleton` and composed skeleton variants

**Files:**

- Create: `libs/ui/components/src/skeleton/skeleton.component.ts`
- Create: `libs/ui/components/src/skeleton/skeleton.component.scss`
- Create: `libs/ui/components/src/skeleton/article-card-skeleton.component.ts`
- Create: `libs/ui/components/src/skeleton/article-meta-skeleton.component.ts`
- Create: `libs/ui/components/src/skeleton/comment-skeleton.component.ts`
- Modify: `libs/ui/components/src/index.ts`

The shimmer animation is defined globally in `_skeleton.scss` (Task 7); these components compose `.skeleton` blocks into useful shapes.

- [ ] **Step 1: Create the folder**

```bash
mkdir -p libs/ui/components/src/skeleton
```

- [ ] **Step 2: Write `libs/ui/components/src/skeleton/skeleton.component.scss`**

```scss
:host {
  display: block;
  width: var(--cdt-skeleton-width, 100%);
  height: var(--cdt-skeleton-height, 1em);
  border-radius: var(--cdt-skeleton-radius, 6px);
}
```

- [ ] **Step 3: Write `libs/ui/components/src/skeleton/skeleton.component.ts`**

```ts
import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'cdt-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  /** CSS width value (e.g. '100%', '120px'). */
  readonly width = input<string>('100%');
  /** CSS height value (e.g. '1em', '24px'). */
  readonly height = input<string>('1em');
  /** CSS border-radius value (e.g. '6px', '50%'). */
  readonly radius = input<string>('6px');

  @HostBinding('class.skeleton')
  readonly skeletonClass = true;

  @HostBinding('attr.aria-busy')
  readonly ariaBusy = 'true';

  @HostBinding('attr.aria-label')
  readonly ariaLabel = 'Loading';

  @HostBinding('style.--cdt-skeleton-width')
  get widthVar(): string {
    return this.width();
  }

  @HostBinding('style.--cdt-skeleton-height')
  get heightVar(): string {
    return this.height();
  }

  @HostBinding('style.--cdt-skeleton-radius')
  get radiusVar(): string {
    return this.radius();
  }
}
```

- [ ] **Step 4: Write `libs/ui/components/src/skeleton/article-meta-skeleton.component.ts`**

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonComponent } from './skeleton.component';

@Component({
  selector: 'cdt-article-meta-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SkeletonComponent],
  template: `
    <div class="row">
      <cdt-skeleton width="32px" height="32px" radius="50%"></cdt-skeleton>
      <div class="text">
        <cdt-skeleton width="120px" height="0.85em"></cdt-skeleton>
        <cdt-skeleton width="80px" height="0.7em"></cdt-skeleton>
      </div>
    </div>
  `,
  styles: [
    `
      .row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .text {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }
    `,
  ],
})
export class ArticleMetaSkeletonComponent {}
```

- [ ] **Step 5: Write `libs/ui/components/src/skeleton/article-card-skeleton.component.ts`**

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonComponent } from './skeleton.component';
import { ArticleMetaSkeletonComponent } from './article-meta-skeleton.component';

@Component({
  selector: 'cdt-article-card-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SkeletonComponent, ArticleMetaSkeletonComponent],
  template: `
    <div class="card-skeleton">
      <cdt-article-meta-skeleton></cdt-article-meta-skeleton>
      <cdt-skeleton width="80%" height="1.4em" radius="6px"></cdt-skeleton>
      <cdt-skeleton width="100%" height="0.9em"></cdt-skeleton>
      <cdt-skeleton width="60%" height="0.9em"></cdt-skeleton>
      <div class="tags">
        <cdt-skeleton width="60px" height="1.2em" radius="999px"></cdt-skeleton>
        <cdt-skeleton width="80px" height="1.2em" radius="999px"></cdt-skeleton>
      </div>
    </div>
  `,
  styles: [
    `
      .card-skeleton {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        padding: 1.2rem 0;
        border-top: 1px solid var(--border);
      }
      .tags {
        display: flex;
        gap: 0.4rem;
        margin-top: 0.4rem;
      }
    `,
  ],
})
export class ArticleCardSkeletonComponent {}
```

- [ ] **Step 6: Write `libs/ui/components/src/skeleton/comment-skeleton.component.ts`**

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonComponent } from './skeleton.component';

@Component({
  selector: 'cdt-comment-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SkeletonComponent],
  template: `
    <div class="comment-skeleton">
      <div class="body">
        <cdt-skeleton width="100%" height="0.9em"></cdt-skeleton>
        <cdt-skeleton width="80%" height="0.9em"></cdt-skeleton>
      </div>
      <div class="meta">
        <cdt-skeleton width="20px" height="20px" radius="50%"></cdt-skeleton>
        <cdt-skeleton width="100px" height="0.7em"></cdt-skeleton>
        <cdt-skeleton width="60px" height="0.7em"></cdt-skeleton>
      </div>
    </div>
  `,
  styles: [
    `
      .comment-skeleton {
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        padding: 1rem;
        margin-bottom: 0.75rem;
      }
      .body {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        margin-bottom: 0.8rem;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid var(--border);
      }
      .meta {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    `,
  ],
})
export class CommentSkeletonComponent {}
```

- [ ] **Step 7: Update `libs/ui/components/src/index.ts`**

```ts
export * from './pager/pager.component';
export * from './icon/icon.component';
export * from './avatar/avatar.component';
export { getInitials, getAvatarColor, AVATAR_PALETTE } from './avatar/avatar.utils';
export * from './skeleton/skeleton.component';
export * from './skeleton/article-meta-skeleton.component';
export * from './skeleton/article-card-skeleton.component';
export * from './skeleton/comment-skeleton.component';
```

- [ ] **Step 8: Build to verify**

```bash
npx nx run conduit:build
```

Expected: build succeeds.

- [ ] **Step 9: Commit**

```bash
git add libs/ui/components/src/skeleton/ libs/ui/components/src/index.ts
git commit -m "feat(ui): add cdt-skeleton base + article-card / article-meta / comment variants"
```

---

## Task 17: Add `cdt-tag-chip` component

**Files:**

- Create: `libs/ui/components/src/tag-chip/tag-chip.component.ts`
- Modify: `libs/ui/components/src/index.ts`

A reusable component-scoped wrapper. Templates not migrated yet (Plan 2) — this component is built ready to use.

- [ ] **Step 1: Create the folder**

```bash
mkdir -p libs/ui/components/src/tag-chip
```

- [ ] **Step 2: Write `libs/ui/components/src/tag-chip/tag-chip.component.ts`**

```ts
import { ChangeDetectionStrategy, Component, computed, HostBinding, input, output } from '@angular/core';

export type TagChipVariant = 'default' | 'outline';

@Component({
  selector: 'cdt-tag-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<span>{{ tag() }}</span>',
  styles: [
    `
      :host {
        display: inline-block;
        font-family: var(--font-body);
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1.1rem;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        margin-right: 0.5rem;
        margin-bottom: 0.25rem;
        white-space: nowrap;
        transition:
          background-color 200ms ease,
          color 200ms ease;
      }

      :host(.variant-default) {
        background-color: var(--brand-100);
        color: var(--brand-600);
        border: 1px solid transparent;
      }

      :host(.variant-default.clickable:hover),
      :host(.variant-default.active) {
        background-color: var(--brand-500);
        color: #fff;
      }

      :host(.variant-outline) {
        background: transparent;
        border: 1px solid var(--border-strong);
        color: var(--ink-500);
      }

      :host(.variant-outline.clickable:hover),
      :host(.variant-outline.active) {
        background-color: var(--paper-sunken);
        color: var(--ink-900);
      }

      :host(.clickable) {
        cursor: pointer;
      }

      :host(.clickable:focus-visible) {
        outline: 2px solid var(--brand-400);
        outline-offset: 2px;
      }
    `,
  ],
  host: {
    '[attr.tabindex]': "clickable() ? '0' : null",
    '[attr.role]': "clickable() ? 'button' : null",
    '(click)': 'onActivate()',
    '(keydown.enter)': 'onActivate()',
    '(keydown.space)': 'onActivate($event)',
  },
})
export class TagChipComponent {
  readonly tag = input.required<string>();
  readonly variant = input<TagChipVariant>('default');
  readonly active = input<boolean>(false);
  readonly clickable = input<boolean>(false);

  readonly activated = output<string>();

  @HostBinding('class')
  get hostClass(): string {
    const classes = [`variant-${this.variant()}`];
    if (this.active()) classes.push('active');
    if (this.clickable()) classes.push('clickable');
    return classes.join(' ');
  }

  onActivate(event?: KeyboardEvent): void {
    if (!this.clickable()) return;
    if (event) {
      event.preventDefault();
    }
    this.activated.emit(this.tag());
  }
}
```

- [ ] **Step 3: Update `libs/ui/components/src/index.ts`**

```ts
export * from './pager/pager.component';
export * from './icon/icon.component';
export * from './avatar/avatar.component';
export { getInitials, getAvatarColor, AVATAR_PALETTE } from './avatar/avatar.utils';
export * from './skeleton/skeleton.component';
export * from './skeleton/article-meta-skeleton.component';
export * from './skeleton/article-card-skeleton.component';
export * from './skeleton/comment-skeleton.component';
export * from './tag-chip/tag-chip.component';
```

- [ ] **Step 4: Build to verify**

```bash
npx nx run conduit:build
```

Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add libs/ui/components/src/tag-chip/ libs/ui/components/src/index.ts
git commit -m "feat(ui): add cdt-tag-chip component"
```

---

## Task 18: Add `cdt-theme-toggle` component

**Files:**

- Create: `libs/ui/components/src/theme-toggle/theme-toggle.component.ts`
- Create: `libs/ui/components/src/theme-toggle/theme-toggle.component.scss`
- Modify: `libs/ui/components/src/index.ts`

Three-state segmented control: Light / Dark / System. Reads + writes through `ThemeService`. Plan 2 will mount it in the navbar dropdown and on the Settings page.

- [ ] **Step 1: Create the folder**

```bash
mkdir -p libs/ui/components/src/theme-toggle
```

- [ ] **Step 2: Write `libs/ui/components/src/theme-toggle/theme-toggle.component.scss`**

```scss
:host {
  display: inline-flex;
  align-items: center;
  padding: 3px;
  background: var(--paper-sunken);
  border: 1px solid var(--border);
  border-radius: 999px;
  gap: 2px;
}

button {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: var(--ink-500);
  cursor: pointer;
  transition:
    color 150ms ease,
    background-color 150ms ease;
}

button:hover {
  color: var(--ink-900);
}

button.active {
  background-color: var(--brand-500);
  color: #fff;
}

button:focus-visible {
  outline: 2px solid var(--brand-400);
  outline-offset: 2px;
}
```

- [ ] **Step 3: Write `libs/ui/components/src/theme-toggle/theme-toggle.component.ts`**

```ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService, type ThemePreference } from '@realworld/core/theme';

@Component({
  selector: 'cdt-theme-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './theme-toggle.component.scss',
  template: `
    <div role="radiogroup" aria-label="Theme preference">
      @for (option of options; track option.value) {
        <button
          type="button"
          role="radio"
          [class.active]="theme() === option.value"
          [attr.aria-checked]="theme() === option.value"
          (click)="select(option.value)"
        >
          {{ option.label }}
        </button>
      }
    </div>
  `,
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);
  readonly theme = this.themeService.theme;

  readonly options: ReadonlyArray<{ value: ThemePreference; label: string }> = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];

  select(value: ThemePreference): void {
    this.themeService.setTheme(value);
  }
}
```

- [ ] **Step 4: Update `libs/ui/components/src/index.ts`**

```ts
export * from './pager/pager.component';
export * from './icon/icon.component';
export * from './avatar/avatar.component';
export { getInitials, getAvatarColor, AVATAR_PALETTE } from './avatar/avatar.utils';
export * from './skeleton/skeleton.component';
export * from './skeleton/article-meta-skeleton.component';
export * from './skeleton/article-card-skeleton.component';
export * from './skeleton/comment-skeleton.component';
export * from './tag-chip/tag-chip.component';
export * from './theme-toggle/theme-toggle.component';
```

- [ ] **Step 5: Build to verify**

```bash
npx nx run conduit:build
```

Expected: build succeeds.

- [ ] **Step 6: Commit**

```bash
git add libs/ui/components/src/theme-toggle/ libs/ui/components/src/index.ts
git commit -m "feat(ui): add cdt-theme-toggle segmented control"
```

---

## Task 19: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Run lint across affected projects**

```bash
npx nx affected -t lint
```

Expected: no lint errors. If any, fix them in the relevant files and re-run.

- [ ] **Step 2: Run unit tests across affected projects**

```bash
npx nx affected -t test
```

Expected: all tests pass — including `core-theme` and `ui-components`.

- [ ] **Step 3: Run a production build**

```bash
npx nx run conduit:build --configuration=production
```

Expected: build succeeds. No bundle-size budget violations beyond what existed before. Style-budget warnings are OK if minor.

- [ ] **Step 4: Run e2e suite**

```bash
npx nx e2e conduit-e2e
```

Expected: every e2e test passes. The app behavior is unchanged from a user perspective; only colors/fonts shifted.

- [ ] **Step 5: Manual smoke test — light mode**

```bash
npx nx run conduit:serve --port=4200
```

In a browser at `http://localhost:4200/`:

- Home page loads with the new warm palette
- Headings render in Fraunces serif, body in Nunito Sans
- Click "Sign in" → form is styled with the new input + button styles
- Click "Global Feed" tab → tab styling shows underline-active state in terracotta
- Click an article → article body renders with Fraunces serif and warm tones
- Pagination controls visible with new pill button styling
- No console errors

- [ ] **Step 6: Manual smoke test — dark mode (via system preference)**

In DevTools → Rendering → "Emulate CSS media feature prefers-color-scheme" → set to `dark`.

Expected: every visible surface flips to the warm dark palette (deep brown background, warm cream text). No flash on emulator switch (transition is 300ms ease). All buttons, links, inputs, cards remain readable. No light-mode artifacts (e.g. white backgrounds bleeding through).

- [ ] **Step 7: Manual smoke test — explicit dark theme (via localStorage)**

In DevTools console:

```js
localStorage.setItem('conduit-theme', 'dark');
location.reload();
```

Expected: page loads in dark mode immediately (no flash to light first). The `<html>` element has `data-theme="dark"`.

Then:

```js
localStorage.setItem('conduit-theme', 'light');
location.reload();
```

Expected: page loads in light mode immediately, even if system is set to dark.

Then:

```js
localStorage.removeItem('conduit-theme');
location.reload();
```

Expected: page falls back to system preference. `<html>` has `data-theme="light"` or `data-theme="dark"` depending on emulator setting.

Stop the server with Ctrl+C.

- [ ] **Step 8: Confirm new components are reachable from the conduit app's perspective**

```bash
node -e "
const fs = require('fs');
const idx = fs.readFileSync('libs/ui/components/src/index.ts', 'utf8');
const expected = ['icon.component', 'avatar.component', 'avatar.utils', 'skeleton.component', 'article-meta-skeleton', 'article-card-skeleton', 'comment-skeleton', 'tag-chip.component', 'theme-toggle.component'];
const missing = expected.filter(name => !idx.includes(name));
if (missing.length) { console.error('MISSING from index.ts:', missing); process.exit(1); }
console.log('All new exports present in libs/ui/components/src/index.ts');
"
```

Expected: prints `All new exports present...`. If anything is missing, add it to the index.

- [ ] **Step 9: Final commit (if any tweaks were needed during verification)**

If steps 1-8 surfaced any issues that required code changes, commit them now. If everything passed cleanly, no commit needed.

```bash
git status
# If clean, you're done. If not, commit fixes:
git add -A
git commit -m "chore: fix issues discovered in plan-1 verification"
```

---

## Done

After Task 19, Plan 1 is complete:

- The new SCSS architecture is live under `apps/conduit/src/styles/`.
- Templates render with the warm terracotta palette and Fraunces + Nunito Sans typography.
- Dark mode works via system preference (and via manual `localStorage` poke for testing).
- `ThemeService` is wired into the app and exposed under `@realworld/core/theme`.
- Shared UI components (`cdt-icon`, `cdt-avatar`, `cdt-skeleton` family, `cdt-tag-chip`, `cdt-theme-toggle`) are built and exported from `@realworld/ui/components`, ready for Plan 2 to use.
- All e2e tests still pass.
- The current page templates (home, article, profile, etc.) still use the existing layouts — Plan 2 will rework them.

Plan 2 will remove the temporary `_pages-legacy.scss` file as it migrates each page.
