# Conduit — Design Modernization Spec

**Date:** 2026-04-24
**Scope:** Full visual redesign of the Conduit app (all pages + shell), dark mode support, SCSS architecture refactor, icon library migration, and avatar fallback component.
**Out of scope:** API changes, new pages, i18n, rich-text editor upgrade, mobile navigation beyond a hamburger drawer, animation libraries.

---

## 1. Goal

Modernize the look and feel of the Conduit app. Move away from the dated Bootstrap-inspired design toward a warm, editorial "Warm & Friendly" aesthetic with terracotta accents. Keep every existing feature and API behavior intact; reshape how pages look and how styles are organized.

---

## 2. Design direction

**Aesthetic:** Warm & Friendly — Substack / Medium-adjacent. Serif display type, sans-serif body UI, warm off-white paper backgrounds, muted terracotta accent.

**Commitments:**

- No gradients anywhere. Solid colors only.
- No new UI libraries (no Tailwind, no Material, no Bootstrap).
- Keep the "Conduit" name and `conduit` wordmark in the logo font (Fraunces).
- Maintain every existing `data-testid` attribute so the e2e suite keeps passing.

---

## 3. Design tokens

All values below become CSS custom properties in `tokens/_colors.scss`, `tokens/_typography.scss`, `tokens/_spacing.scss`.

### 3.1 Colors — light mode

| Token             | Hex       | Use                                      |
| ----------------- | --------- | ---------------------------------------- |
| `--ink-900`       | `#2a1a0e` | Primary text (warm near-black)           |
| `--ink-700`       | `#4a3a2e` | Body text                                |
| `--ink-500`       | `#6b5847` | Secondary text                           |
| `--ink-400`       | `#8b7560` | Muted text / metadata                    |
| `--ink-300`       | `#b8a690` | Disabled text / placeholders             |
| `--brand-600`     | `#a84f2b` | Links, hover states                      |
| `--brand-500`     | `#c2613a` | **Default accent** — buttons, active nav |
| `--brand-400`     | `#d9825b` | Outline-button hover tint, focus ring    |
| `--brand-100`     | `#fae8dc` | Tag chip background, selected-state bg   |
| `--paper`         | `#fffcf7` | Page background                          |
| `--paper-raised`  | `#ffffff` | Cards, elevated surfaces                 |
| `--paper-sunken`  | `#fff7f0` | Banners, subtle hover backgrounds        |
| `--border`        | `#f1e1d0` | Card borders, hairlines                  |
| `--border-strong` | `#e4cfb8` | Input borders                            |
| `--danger`        | `#9e3a3a` | Destructive actions, errors              |
| `--success`       | `#4a6b3f` | Confirmations                            |

### 3.2 Colors — dark mode

Same token names, different values, applied under `[data-theme='dark']`.

| Token             | Hex       |
| ----------------- | --------- |
| `--ink-900`       | `#f5ebde` |
| `--ink-700`       | `#d8c9b8` |
| `--ink-500`       | `#b8a690` |
| `--ink-400`       | `#8b7560` |
| `--ink-300`       | `#6b5847` |
| `--brand-600`     | `#f0b08a` |
| `--brand-500`     | `#e8a076` |
| `--brand-400`     | `#c2613a` |
| `--brand-100`     | `#3a2419` |
| `--paper`         | `#1a1410` |
| `--paper-raised`  | `#241b15` |
| `--paper-sunken`  | `#22180f` |
| `--border`        | `#3a2d22` |
| `--border-strong` | `#52412f` |
| `--danger`        | `#d98080` |
| `--success`       | `#9ab890` |

### 3.3 Typography

- **Display / headings:** `Fraunces` (variable serif) — weights 400, 600, 700
- **Body UI:** `Nunito Sans` — weights 400, 600, 700
- **Article reading body:** `Fraunces` at 1.1rem, line-height 1.75
- **Monospace:** System stack (`ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`) — no new web font

**Type scale (px):** 12 · 14 · 16 · 18 · 20 · 24 · 32 · 44 · 56
**Line heights:** tight 1.15 (display), standard 1.5 (UI), relaxed 1.75 (article body)

Google Fonts `<link>` in `apps/conduit/src/index.html` gets rewritten to load only Fraunces + Nunito Sans. The existing Titillium/Source Serif/Merriweather/Source Sans load is removed.

### 3.4 Spacing, radius, shadow

- **Spacing scale (px):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64
- **Radius:** 6px (small inputs), 12px (buttons), 14px (cards), 20px (containers/banners), 999px (pills, avatars)
- **Shadows:** two levels only
  - `--shadow-sm`: `0 2px 8px rgba(42, 26, 14, 0.06)` — card hover lift
  - `--shadow-md`: `0 8px 24px rgba(42, 26, 14, 0.1)` — popovers/modals if any

---

## 4. Component system

Replaces the ad-hoc component classes in the current `styles.scss`. Lives in `apps/conduit/src/styles/components/`.

### 4.1 Buttons

Variants: `.btn-primary`, `.btn-outline`, `.btn-ghost`, `.btn-danger`.
Sizes: `.btn-sm` (28px), default (36px), `.btn-lg` (44px).
Radius: 999px (pill). Transition: `all 150ms ease`. Focus ring: 2px `--brand-400` with 2px offset.

Active state: slight scale-down (0.98) for tactile feel. No active background shift.

### 4.2 Inputs

Single treatment.
`--paper-raised` bg, 1px `--border-strong`, radius 12px, padding 10×14px.
Focus: border → `--brand-500`, 3px ring at 15% opacity.
Disabled: `--paper-sunken` bg, `--ink-300` text, `cursor: not-allowed`.
Error: border → `--danger`, message below in `--danger`.

### 4.3 Card

Workhorse container.
`--paper-raised` bg, 1px `--border`, radius 14px, padding 20px.
Hover: `--shadow-sm` and translate-Y(-2px), 200ms transition. **This is the "hover lift".**

### 4.4 Tag chip

Two variants:

- Default (`.tag-chip`): `--brand-100` bg, `--brand-600` text, pill radius, padding 4×10px
- Outlined (`.tag-chip-outline`): transparent bg, `--border-strong` border, `--ink-500` text
- Hover (both, when `clickable`): fills with `--brand-500` at low opacity

### 4.5 Nav tabs

For feed toggles and profile tabs.
Flat text buttons in a row. Active: `--ink-900` text, 2px `--brand-500` bottom border. Inactive: `--ink-400` text; hover: `--ink-700`.

### 4.6 Skeleton loader

`--paper-sunken` block with a shimmer animation (background-position travel over a lighter stripe, ~1.5s loop). Skeleton variants live as Angular components in `libs/ui/components`: `cdt-article-card-skeleton`, `cdt-article-meta-skeleton`, `cdt-comment-skeleton`. Generic block: `cdt-skeleton` with `width`, `height`, `radius` inputs.

### 4.7 Theme toggle

Three-state segmented control: Light / Dark / System. Primary placement: Settings → Preferences. Secondary placement: nav dropdown (smaller). Triggers a 300ms ease transition on all color properties on `<html>` — disabled during initial paint to prevent flash.

---

## 5. Angular components to add

All live in `libs/ui/components` except `ThemeService`.

| Component                   | Purpose                             | Key inputs                                      |
| --------------------------- | ----------------------------------- | ----------------------------------------------- |
| `cdt-avatar`                | Image-with-initials-fallback        | `src`, `username`, `size` ('sm'/'md'/'lg'/'xl') |
| `cdt-icon`                  | Thin wrapper over `lucide-angular`  | `name`, `size`                                  |
| `cdt-skeleton`              | Generic skeleton block              | `width`, `height`, `radius`                     |
| `cdt-article-card-skeleton` | Composed skeleton for a feed card   | —                                               |
| `cdt-article-meta-skeleton` | Composed skeleton for meta row      | —                                               |
| `cdt-comment-skeleton`      | Composed skeleton for a comment     | —                                               |
| `cdt-theme-toggle`          | Segmented Light/Dark/System control | —                                               |
| `cdt-tag-chip`              | Styled tag chip                     | `tag`, `variant`, `active`, `clickable`         |

`ThemeService` lives in `libs/core/theme/`.

### 5.1 Avatar fallback algorithm

1. If `src` input is present and the `<img>` loads successfully → show the image.
2. If `src` is missing, empty, or the `<img>` `error` event fires → render a solid-color circle with up to 2 initials derived from `username` (first character of first word + first character of last word, uppercased; single-word usernames get the first 2 characters).
3. The circle background color is picked by hashing `username` modulo an 8-color palette:
   - Terracotta `#c2613a`
   - Moss `#4a6b3f`
   - Plum `#6d3d5d`
   - Teal `#2e6e6a`
   - Ochre `#9a7724`
   - Dusk blue `#3d5a80`
   - Rose `#b56576`
   - Slate `#52606d`
4. Foreground is always white; all 8 colors are verified for white-text AA contrast.
5. Fallback block includes `aria-label` with the full username.
6. Same username always produces the same color (deterministic).

Replaces every bare `<img [src]="…image">` across: `article-list-item`, `article-meta`, `article-comment`, `add-comment`, `profile.component`, `layout-header` (navbar).

### 5.2 ThemeService

Signal-based, matches the project's NgRx Signals conventions.

- `theme: WritableSignal<'light' | 'dark' | 'system'>` — persisted to `localStorage['conduit-theme']`, defaults to `'system'`
- `resolved: Signal<'light' | 'dark'>` — computed, reads `matchMedia('(prefers-color-scheme: dark)')` when theme is `'system'`
- An `effect` sets `data-theme` attribute on `document.documentElement` and toggles a `theme-transition` class on `<body>` (added only after first paint, to prevent flash on load)
- Listens for `change` events on the `matchMedia` query so system-preference changes propagate live

---

## 6. Page layouts

### 6.1 Global shell

**Navbar** — sticky top, `--paper` bg, `backdrop-filter: blur(10px)` when scrolled, 1px bottom border. Left: `conduit` Fraunces 600 wordmark. Right (authenticated): Home · New Post · Settings · avatar menu. Right (guest): Home · Sign in · Sign up (pill). Mobile breakpoint (<768px): right links collapse into a hamburger drawer.

**Footer** — thin, `--paper` bg, 1px top border. Wordmark + attribution. Structural layout unchanged.

**Page container** — max-width 1100px for feed pages, 720px for reading pages (article/editor/settings), 900px for profile, 900px for auth card.

### 6.2 Home page

Layout B from the brainstorming session: slim banner + tag chips + single-column stream.

```
[ navbar ]
[ slim banner: "conduit" Fraunces 700 + tagline, solid --paper-sunken bg ]
[ tab row: Your Feed | Global Feed ]
[ tag chips rail: "Browse by tag" label + wrapping chip row ]
[ stream:
   each item → grid (1fr 90px):
     left: meta row (avatar + author + date + read-time),
           title (Fraunces 700 1.1rem),
           description (Nunito 0.88rem --ink-500),
           tags + favorite button
     right: thumbnail 90×72 (hashed color block — API has no cover image)
]
[ pager ]
```

Read-time is computed client-side as `ceil(wordCount / 200)` minutes, displayed as e.g. "5 min read".

### 6.3 Article page

Layout C: side-rail actions.

```
[ navbar ]
[ 740px max-width layout: 50px sticky rail | article column ]
   rail (sticky, 20px from top):
     - favorite button (♡ icon + count below)
     - comment button (💬 icon, scrolls to comments anchor)
     - share button (↗ icon, copies URL, shows toast "Link copied")
   article:
     - kicker: "Essay · 8 min read" (read-time computed)
     - h1 (Fraunces 700, 2rem, letter-spacing -0.02em)
     - author row: 40px avatar, name, date · read-time, Follow button
     - body (Fraunces, 1.1rem, 1.75 line-height, markdown rendered)
     - action row at bottom (Follow + Favorite, mirror of rail)
     - comments section:
         "Add a comment" card (textarea + Post button)
         each comment: card with avatar + name + date + body + delete (author only)
]
```

### 6.4 Profile page

Layout C: split hero with inline stats card.

```
[ navbar ]
[ hero (solid --paper-sunken, NO gradient):
   grid: 96px avatar | bio column | stats card
   bio column: name (Fraunces 700), @handle, bio
   stats card: --paper-raised, --border, radius 14px
     rows: "Articles" count, "Favorites received" (client-summed)
]
[ action row: Follow / Edit profile + Share ]
[ tab row: My Articles | Favorited ]
[ feed: stream cards identical to home ]
```

Stats are limited to what the RealWorld API provides:

- **Articles count** — from the articles list length (paginated — show only loaded count, or total if API returns a `articlesCount` — verify during implementation)
- **Favorites received** — `reduce` sum of `favoritesCount` across loaded articles

No followers/following counts, no join date — the API does not expose them.

### 6.5 Auth (login / register)

Split hero layout, same shell for both routes.

```
[ centered 900×520 card, 2 columns 1fr:1fr, radius 20px, 1px --border, --shadow-md ]
   left (--paper-sunken, padded 32px):
     Fraunces 700 heading ("Write, read, connect" on login / "Join Conduit" on register)
     short tagline paragraph
     pull-quote at bottom (italicized Fraunces)
   right (--paper-raised, padded 36×32px):
     h2 ("Welcome back" / "Create your account")
     email + password inputs (+ username on register)
     submit button (full-width btn-primary)
     toggle link ("New here? Create an account" / "Have an account? Sign in")
]
```

### 6.6 Editor

Two-pane live preview.

```
[ navbar ]
[ 1100px max-width, grid: 1fr | 1fr, 1px border between panes ]
   left (write, --paper):
     title input — styled to look like the final h1 (Fraunces 700 1.5rem)
     subtitle input — italic
     markdown textarea (monospace, min-height 300px)
     tag chip input — type + Enter adds; click × to remove
   right (preview, --paper-sunken):
     "Live preview" kicker
     renders title + subtitle + markdown body using article-page typography
[ footer bar: --paper-sunken, Cancel (btn-ghost) + Publish (btn-primary) ]
```

Preview updates are debounced 150ms so typing doesn't re-render on every keystroke.

### 6.7 Settings

Sectioned cards in a 640px column.

```
[ navbar ]
[ 640px max-width, padded 28×32 ]
   h2 "Settings" + subtitle "Manage your profile, account, and preferences"
   card: Profile (image URL, username, bio textarea)
   card: Account (email, new password — placeholder: "Leave blank to keep")
   card: Preferences (Appearance: Light | Dark | System segmented toggle)
   footer row: Log out (btn-danger ghost) | Save changes (btn-primary)
]
```

### 6.8 404 / error

(Scoped in if the app has or adds a 404 route — verify during implementation.) Friendly Fraunces heading ("That page wandered off"), a short paragraph, "Back home" button. Matches the warm tone.

---

## 7. SCSS architecture

Replaces the monolithic `apps/conduit/src/styles.scss`.

```
apps/conduit/src/styles/
├── styles.scss               (entry — imports only)
├── tokens/
│   ├── _colors.scss
│   ├── _typography.scss
│   ├── _spacing.scss
│   └── _tokens.scss          (re-exports)
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _global.scss          (body, app-root shell, theme transition)
├── components/
│   ├── _button.scss
│   ├── _input.scss
│   ├── _card.scss
│   ├── _tag.scss
│   ├── _nav.scss
│   ├── _pagination.scss
│   ├── _skeleton.scss
│   └── _error-messages.scss
├── layouts/
│   ├── _container.scss       (replaces Bootstrap grid)
│   ├── _page-home.scss
│   ├── _page-article.scss
│   ├── _page-profile.scss
│   ├── _page-editor.scss
│   ├── _page-settings.scss
│   └── _page-auth.scss
└── utilities/
    └── _helpers.scss
```

The old `.container`, `.row`, `.col-md-*` classes are removed. Templates that use them (`home.component.html`, `article.component.html`, `profile.component.html`, etc.) get lightly edited to use layout-specific class names — e.g. `col-xs-12 col-md-10 offset-md-1` → `profile-container`. Grid / Flexbox handled by the layout SCSS files.

Angular's `angular.json` / `project.json` for the `conduit` app already points to `src/styles.scss` — that file stays at that path and simply imports the new structure:

```scss
// apps/conduit/src/styles.scss
@use 'styles/tokens/tokens';
@use 'styles/base/reset';
@use 'styles/base/typography';
@use 'styles/base/global';
@use 'styles/components/button';
// …etc
```

---

## 8. Icon migration

- Add `lucide-angular` as a dependency.
- Remove `<link href="//code.ionicframework.com/ionicons/…">` from `apps/conduit/src/index.html`.
- Migrate every `<i class="ion-*">` across all templates to `<cdt-icon name="…">`.
- Known mappings (verify all during the migration sweep):

| ionicons class   | Lucide name |
| ---------------- | ----------- |
| `ion-heart`      | `heart`     |
| `ion-plus-round` | `plus`      |
| `ion-gear-a`     | `settings`  |
| `ion-edit`       | `pencil`    |
| `ion-trash-a`    | `trash-2`   |
| `ion-pound`      | `hash`      |
| `ion-compose`    | `pen-line`  |

Run a search (`grep -rn "ion-" libs/ apps/`) before finalizing and add any additional mappings found.

---

## 9. Interactions & motion

- **Hover lift on cards** — `--shadow-sm` + `translateY(-2px)`, 200ms ease.
- **Skeleton loaders while fetching** — on home feed, profile feed, article page, comments.
- **Smooth theme transition** — 300ms ease on color-related properties on `<html>`, gated behind a `theme-transition` class added after first paint.
- **No page-transition animations** (explicitly excluded).
- **No reading progress bar** (explicitly excluded).
- **No animation library** — CSS transitions and `@keyframes` only.

---

## 10. Accessibility

- Color contrast verified against WCAG AA: 4.5:1 for body, 3:1 for large text. Both light and dark mode.
- All buttons, links, inputs have visible focus rings using `--brand-400`.
- Avatar initial-fallback exposes `aria-label` with the full username.
- Theme toggle uses `role="radiogroup"` with each option as `role="radio"` and proper `aria-checked` state.
- Skeleton loaders have `aria-busy="true"` and `aria-label="Loading"`.
- Images always have `alt` attributes.

---

## 11. Testing & constraint preservation

**Hard rule:** every existing `data-testid` stays on its element, exactly as it is today. Templates are grepped before and after each change.

- Run `npx nx e2e conduit-e2e` — must pass on completion.
- Existing `*.spec.ts` unit tests: behavior assertions stay; any that assert on CSS class names are updated to match new class names (e.g. `.article-preview` → `.article-card`).
- Visual regression is not in scope (no baseline screenshots to maintain).

---

## 12. Dependencies

**Add:**

- `lucide-angular`

**Remove:**

- External ionicons CDN `<link>` in `apps/conduit/src/index.html` (not an npm dep)
- Unused Google Fonts families (Titillium Web, Source Serif Pro, Merriweather Sans, Source Sans Pro) — replaced by Fraunces + Nunito Sans

**Not added:**

- Tailwind / UnoCSS / any utility-first CSS library
- Material / PrimeNG / other component libraries
- Framer Motion or any animation library

---

## 13. Implementation order

Proposed sequence (the implementation plan will refine this with explicit tasks and dependencies):

1. **Tokens & base styles** — `tokens/`, `base/`, theme transition class. Import from `styles.scss`. Dark mode values set but no toggle yet. Visible change: warm palette, new fonts, new text colors.
2. **Shared UI components** — `cdt-avatar`, `cdt-icon`, `cdt-skeleton`, `cdt-tag-chip`, `cdt-theme-toggle`.
3. **ThemeService + theme toggle wiring** — dark mode live, toggle visible in Settings and nav.
4. **Navbar + footer restyle**.
5. **Home page layout** — including skeleton loaders for the article list.
6. **Article page layout** — side rail + restyle + comments.
7. **Profile page layout**.
8. **Auth (login + register) layout**.
9. **Editor layout** — two-pane with live preview.
10. **Settings layout**.
11. **Icon migration sweep** — replace all `ion-*` usages with `cdt-icon`. Remove ionicons CDN link.
12. **Tests & polish** — run e2e suite, fix any spec assertions on old class names, accessibility pass.

Each step leaves the app in a working state; there is no single "big bang" change.

---

## 14. Open questions deferred to implementation

- Does the RealWorld API include `articlesCount` on profile responses, or do we compute it from the list length? (Verify in `libs/profile/` and `libs/articles/` data-access code.)
- Does the existing router have a 404 route, or should we add one? (Verify in `apps/conduit/src/app/app.config.ts` and router setup.)
- Does the current layout already have a `<app-layout-header>` / `<app-layout-footer>` that we restyle, or are they inline in `app.component.html`? (Verify in `apps/conduit/src/app/layout/`.)

These affect implementation detail but do not change the design.
