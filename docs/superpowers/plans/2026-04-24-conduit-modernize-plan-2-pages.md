# Conduit Modernize — Plan 2: Page Redesigns

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the Warm & Friendly page layouts from the design spec to every page of the Conduit app (home, article, profile, auth, editor, settings), restyle the navbar and footer, and wire the shared UI components built in Plan 1 (`cdt-avatar`, `cdt-tag-chip`, `cdt-skeleton`, `cdt-theme-toggle`) into the existing templates. After Plan 2 ships, the redesign is visible end-to-end.

**Architecture:** New page layouts live in dedicated SCSS partials under `apps/conduit/src/styles/layouts/` (one per page). The legacy `_pages-legacy.scss` is retired in the final task after every page has been migrated. Templates are rewritten to use the new SCSS grid/flex layouts plus the shared UI components from Plan 1; Bootstrap-style `.container`/`.row`/`.col-md-*` wrappers get replaced with scoped container classes as each page is touched. A small Plan 1 carry-forward (splitting `_spacing.scss` into `_spacing.scss` + `_elevation.scss`) happens first. Every existing `data-testid` is preserved so the e2e suite keeps passing.

**Tech Stack:** Angular 21.2.5 (zoneless, standalone components), NgRx Signals, SCSS with CSS custom properties, existing `marked` markdown dep, no new runtime deps.

**Out of scope (handled in Plan 3):**

- Icon migration from `<i class="ion-*">` to `<cdt-icon>` — all templates here will keep the ionicons classes in place; Plan 3 sweeps.
- Removing the ionicons CDN `<link>` from `index.html`.
- Replacing `cdt-icon`'s dynamic lookup with `provideIcons([…])` named imports (Plan 3 must do this before shipping to keep the Lucide bundle tree-shaken).
- 404 / generic error page.
- New API fields (stats shown on the profile page are limited to what the current RealWorld API returns).

---

## File structure

**Created:**

```
apps/conduit/src/styles/
├── tokens/
│   └── _elevation.scss                 # NEW — radius + shadow tokens, moved from _spacing.scss
├── layouts/
│   ├── _page-home.scss                 # NEW — home page: slim banner + tag chips + stream
│   ├── _page-article.scss              # NEW — article page: side-rail + kicker + body + comments
│   ├── _page-profile.scss              # NEW — profile page: split hero + stats card + feed
│   ├── _page-auth.scss                 # NEW — split-hero auth card (login + register share it)
│   ├── _page-editor.scss               # NEW — two-pane editor with live preview
│   └── _page-settings.scss             # NEW — sectioned cards + theme toggle
└── components/
    └── _footer.scss                    # NEW — footer tweak, moved from _pages-legacy.scss

libs/ui/components/src/
├── reading-time/
│   ├── reading-time.ts                 # NEW — pure function: words → minutes
│   └── reading-time.spec.ts            # NEW — test
```

**Modified:**

- `apps/conduit/src/styles/tokens/_spacing.scss` — drop radius + shadow; spacing tokens only.
- `apps/conduit/src/styles/tokens/_tokens.scss` — `@forward 'elevation';`.
- `apps/conduit/src/styles.scss` — import the new layout partials + remove `_pages-legacy.scss` in the final task.
- `apps/conduit/src/styles/components/_nav.scss` — sticky navbar + `backdrop-filter` + subtle shadow on scroll.
- `apps/conduit/src/app/layout/navbar/navbar.component.html` — swap `<i class="ion-*">` stays (Plan 3 migrates), add `<cdt-avatar>` next to username.
- `apps/conduit/src/app/layout/footer/footer.component.html` — minor markup tweak (no structural change).
- `apps/conduit/src/app/layout/navbar/navbar.component.ts` — imports `AvatarComponent`.
- `libs/home/feature-home/src/home.component.html` — new Layout B structure.
- `libs/home/feature-home/src/home.component.ts` — imports update.
- `libs/home/feature-home/src/tags-list/tags-list.component.html` — use `<cdt-tag-chip clickable>`.
- `libs/home/feature-home/src/tags-list/tags-list.component.ts` — imports update.
- `libs/articles/feature-articles-list/src/article-list.component.html` — use `<cdt-article-card-skeleton>` while loading.
- `libs/articles/feature-articles-list/src/article-list.component.ts` — imports update.
- `libs/articles/feature-articles-list/src/article-list-item/article-list-item.component.html` — use `<cdt-avatar>` + `<cdt-tag-chip>` + read-time.
- `libs/articles/feature-articles-list/src/article-list-item/article-list-item.component.ts` — imports update + read-time helper.
- `libs/articles/feature-article/src/article.component.html` — new side-rail layout (no banner).
- `libs/articles/feature-article/src/article.component.ts` — side-rail logic (favorite, comments scroll, share).
- `libs/articles/feature-article/src/article-meta/article-meta.component.html` — use `<cdt-avatar>`.
- `libs/articles/feature-article/src/article-meta/article-meta.component.ts` — imports update.
- `libs/articles/feature-article/src/article-comment/article-comment.component.html` — use `<cdt-avatar>`.
- `libs/articles/feature-article/src/article-comment/article-comment.component.ts` — imports update.
- `libs/articles/feature-article/src/add-comment/add-comment.component.html` — use `<cdt-avatar>`.
- `libs/articles/feature-article/src/add-comment/add-comment.component.ts` — imports update.
- `libs/profile/feature-profile/src/profile.component.html` — split hero + stats + tabs.
- `libs/profile/feature-profile/src/profile.component.ts` — imports update + articles count signal.
- `libs/auth/feature-auth/src/login/login.component.html` — split-hero layout.
- `libs/auth/feature-auth/src/register/register.component.html` — split-hero layout.
- `libs/articles/feature-article-edit/src/article-edit.component.html` — two-pane editor + chip tag input.
- `libs/articles/feature-article-edit/src/article-edit.component.ts` — FormArray for tags + chip logic + debounced preview.
- `libs/settings/feature-settings/src/settings.component.html` — sectioned card layout + theme toggle + logout.
- `libs/settings/feature-settings/src/settings.component.ts` — imports update.
- `libs/ui/components/src/tag-chip/tag-chip.component.ts` — add `<ng-content>` slot after tag text for a trailing action (used by editor chip input).
- `libs/ui/components/src/index.ts` — re-export `reading-time`.

**Deleted:**

- `apps/conduit/src/styles/layouts/_pages-legacy.scss` — removed in the final migration task once every page has its own layout partial.

---

## Task 1: Split `_spacing.scss` → `_spacing.scss` + `_elevation.scss`

Plan 1 carry-forward. Separating layout tokens (spacing scale) from elevation tokens (radius + shadow) so the filenames match responsibilities.

**Files:**

- Modify: `apps/conduit/src/styles/tokens/_spacing.scss`
- Create: `apps/conduit/src/styles/tokens/_elevation.scss`
- Modify: `apps/conduit/src/styles/tokens/_tokens.scss`
- Modify: `apps/conduit/src/styles.scss`

- [ ] **Step 1: Rewrite `apps/conduit/src/styles/tokens/_spacing.scss`**

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
}
```

- [ ] **Step 2: Create `apps/conduit/src/styles/tokens/_elevation.scss`**

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

[data-theme='dark'] {
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.4);
}
```

- [ ] **Step 3: Update `apps/conduit/src/styles/tokens/_tokens.scss`**

```scss
@forward 'colors';
@forward 'typography';
@forward 'spacing';
@forward 'elevation';
```

- [ ] **Step 4: Update `apps/conduit/src/styles.scss` — add the elevation import**

After the existing `@use 'styles/tokens/spacing';` line, add:

```scss
@use 'styles/tokens/elevation';
```

The full tokens block of `styles.scss` should read:

```scss
// Design tokens
@use 'styles/tokens/colors';
@use 'styles/tokens/typography';
@use 'styles/tokens/spacing';
@use 'styles/tokens/elevation';
```

- [ ] **Step 5: Verify build**

```bash
npx nx run conduit:build
```

Expected: succeeds. All `--radius-*` and `--shadow-*` references in existing partials still resolve.

- [ ] **Step 6: Commit**

```bash
git add apps/conduit/src/styles/tokens/_spacing.scss apps/conduit/src/styles/tokens/_elevation.scss apps/conduit/src/styles/tokens/_tokens.scss apps/conduit/src/styles.scss
git commit -m "refactor(styles): split elevation tokens into dedicated partial"
```

---

## Task 2: Reading-time helper (TDD)

A pure utility: given a string of article body text, return an integer number of minutes at 200 wpm (minimum 1).

**Files:**

- Create: `libs/ui/components/src/reading-time/reading-time.ts`
- Create: `libs/ui/components/src/reading-time/reading-time.spec.ts`
- Modify: `libs/ui/components/src/index.ts`

- [ ] **Step 1: Create folder**

```bash
mkdir -p libs/ui/components/src/reading-time
```

- [ ] **Step 2: Write the failing test — `libs/ui/components/src/reading-time/reading-time.spec.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { readingTimeMinutes } from './reading-time';

describe('readingTimeMinutes', () => {
  it('returns 1 for empty input (minimum 1 minute)', () => {
    expect(readingTimeMinutes('')).toBe(1);
    expect(readingTimeMinutes('   ')).toBe(1);
  });

  it('returns 1 for very short text', () => {
    expect(readingTimeMinutes('Hello world')).toBe(1);
  });

  it('computes minutes at 200 words per minute', () => {
    const text = Array.from({ length: 200 }, () => 'word').join(' ');
    expect(readingTimeMinutes(text)).toBe(1);
  });

  it('rounds up (ceiling) for partial minutes', () => {
    const text = Array.from({ length: 201 }, () => 'word').join(' ');
    expect(readingTimeMinutes(text)).toBe(2);
  });

  it('handles multi-paragraph prose', () => {
    // 600 words spread across paragraphs.
    const paragraph = Array.from({ length: 200 }, () => 'word').join(' ');
    const text = [paragraph, paragraph, paragraph].join('\n\n');
    expect(readingTimeMinutes(text)).toBe(3);
  });

  it('ignores markdown formatting characters when counting words', () => {
    // 4 words regardless of markdown noise.
    expect(readingTimeMinutes('**Hello** _world_ # heading')).toBe(1);
  });

  it('treats null/undefined input as empty (returns 1)', () => {
    expect(readingTimeMinutes(null as unknown as string)).toBe(1);
    expect(readingTimeMinutes(undefined as unknown as string)).toBe(1);
  });
});
```

- [ ] **Step 3: Run to verify it fails**

```bash
npx nx test ui-components
```

Expected: FAIL — `Cannot find module './reading-time'`.

- [ ] **Step 4: Implement `libs/ui/components/src/reading-time/reading-time.ts`**

```ts
const WORDS_PER_MINUTE = 200;

/**
 * Estimate reading time in whole minutes at 200 wpm, floored to minimum 1.
 * Markdown formatting noise (#, *, _, `) is stripped before word-counting.
 */
export function readingTimeMinutes(text: string | null | undefined): number {
  if (!text) {
    return 1;
  }
  const cleaned = text.replace(/[#*_`~>\-]+/g, ' ').trim();
  if (cleaned.length === 0) {
    return 1;
  }
  const wordCount = cleaned.split(/\s+/u).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
```

- [ ] **Step 5: Run to verify it passes**

```bash
npx nx test ui-components
```

Expected: all tests pass.

- [ ] **Step 6: Update `libs/ui/components/src/index.ts`**

Add this line (keep existing exports):

```ts
export * from './reading-time/reading-time';
```

- [ ] **Step 7: Commit**

```bash
git add libs/ui/components/src/reading-time/ libs/ui/components/src/index.ts
git commit -m "feat(ui): add readingTimeMinutes utility"
```

---

## Task 3: Swap `<img>` → `<cdt-avatar>` across article/comment/profile templates

No layout change yet — just replace the bare `<img [src]="…image">` tags with `<cdt-avatar>` so the initials fallback kicks in when `image` is missing or broken. Preserves every `data-testid`.

**Files:**

- Modify: `libs/articles/feature-articles-list/src/article-list-item/article-list-item.component.ts`
- Modify: `libs/articles/feature-articles-list/src/article-list-item/article-list-item.component.html`
- Modify: `libs/articles/feature-article/src/article-meta/article-meta.component.ts`
- Modify: `libs/articles/feature-article/src/article-meta/article-meta.component.html`
- Modify: `libs/articles/feature-article/src/article-comment/article-comment.component.ts`
- Modify: `libs/articles/feature-article/src/article-comment/article-comment.component.html`
- Modify: `libs/articles/feature-article/src/add-comment/add-comment.component.ts`
- Modify: `libs/articles/feature-article/src/add-comment/add-comment.component.html`
- Modify: `libs/profile/feature-profile/src/profile.component.ts`
- Modify: `libs/profile/feature-profile/src/profile.component.html`

- [ ] **Step 1: Update `article-list-item.component.ts` — add `AvatarComponent` import**

Change the `imports` array of the `@Component` decorator from:

```ts
imports: [RouterModule, NgClass, DatePipe],
```

to:

```ts
imports: [RouterModule, NgClass, DatePipe, AvatarComponent],
```

And add the import at the top:

```ts
import { AvatarComponent } from '@realworld/ui/components';
```

- [ ] **Step 2: Replace the `<img>` in `article-list-item.component.html`**

Find:

```html
<a>
  <img [src]="article().author.image" />
</a>
```

Replace with:

```html
<a [routerLink]="['/profile', article().author.username]">
  <cdt-avatar [src]="article().author.image" [username]="article().author.username" size="md"></cdt-avatar>
</a>
```

Note: the original element had no `routerLink` — adding one so the avatar is a proper link to the author's profile. This matches the article-meta pattern (which already routes to `/profile/:username`).

- [ ] **Step 3: Update `article-meta.component.ts` — add `AvatarComponent` import**

Change:

```ts
imports: [RouterModule, NgClass, DatePipe],
```

to:

```ts
imports: [RouterModule, NgClass, DatePipe, AvatarComponent],
```

Add the import:

```ts
import { AvatarComponent } from '@realworld/ui/components';
```

- [ ] **Step 4: Replace the `<img>` in `article-meta.component.html`**

Find:

```html
<a data-testid="article-author" [routerLink]="['/profile', article().author.username]">
  <img [src]="article().author.image" />
</a>
```

Replace with:

```html
<a data-testid="article-author" [routerLink]="['/profile', article().author.username]">
  <cdt-avatar [src]="article().author.image" [username]="article().author.username" size="md"></cdt-avatar>
</a>
```

- [ ] **Step 5: Update `article-comment.component.ts` — add `AvatarComponent`**

Change:

```ts
imports: [DatePipe, RouterModule],
```

to:

```ts
imports: [DatePipe, RouterModule, AvatarComponent],
```

Add:

```ts
import { AvatarComponent } from '@realworld/ui/components';
```

- [ ] **Step 6: Replace the `<img>` in `article-comment.component.html`**

Find:

```html
<a class="comment-author" [routerLink]="['/profile', comment().author.username]">
  <img [src]="comment().author.image" class="comment-author-img" />
</a>
```

Replace with:

```html
<a class="comment-author" [routerLink]="['/profile', comment().author.username]">
  <cdt-avatar
    class="comment-author-img"
    [src]="comment().author.image"
    [username]="comment().author.username"
    size="sm"
  ></cdt-avatar>
</a>
```

The `.comment-author-img` class is still applied (via the host) so any existing sizing rules in `_pages-legacy.scss` continue to apply.

- [ ] **Step 7: Update `add-comment.component.ts`**

Change:

```ts
imports: [ListErrorsComponent, ReactiveFormsModule, InputErrorsComponent],
```

to:

```ts
imports: [ListErrorsComponent, ReactiveFormsModule, InputErrorsComponent, AvatarComponent],
```

Add:

```ts
import { AvatarComponent } from '@realworld/ui/components';
```

- [ ] **Step 8: Replace the `<img>` in `add-comment.component.html`**

Find:

```html
<img [src]="currentUser().image" class="comment-author-img" />
```

Replace with:

```html
<cdt-avatar
  class="comment-author-img"
  [src]="currentUser().image"
  [username]="currentUser().username"
  size="sm"
></cdt-avatar>
```

- [ ] **Step 9: Update `profile.component.ts` — add `AvatarComponent`**

Change:

```ts
imports: [RouterModule, NgClass],
```

to:

```ts
imports: [RouterModule, NgClass, AvatarComponent],
```

Add:

```ts
import { AvatarComponent } from '@realworld/ui/components';
```

- [ ] **Step 10: Replace the `<img>` in `profile.component.html`**

Find:

```html
<img [src]="$image()" class="user-img" />
```

Replace with:

```html
<cdt-avatar class="user-img" [src]="$image()" [username]="$username()" size="xl"></cdt-avatar>
```

- [ ] **Step 11: Build + verify nothing broke**

```bash
npx nx run conduit:build
```

Expected: succeeds.

- [ ] **Step 12: Commit**

```bash
git add libs/articles/ libs/profile/
git commit -m "feat(ui): swap bare <img> for <cdt-avatar> in article/comment/profile templates"
```

---

## Task 4: Swap `.tag-default` links for `<cdt-tag-chip>` in tags-list and article-list-item

Also — extend `cdt-tag-chip` with a content-projection slot so the editor chip input (Task 11) can project a trailing × button.

**Files:**

- Modify: `libs/ui/components/src/tag-chip/tag-chip.component.ts`
- Modify: `libs/home/feature-home/src/tags-list/tags-list.component.ts`
- Modify: `libs/home/feature-home/src/tags-list/tags-list.component.html`
- Modify: `libs/articles/feature-articles-list/src/article-list-item/article-list-item.component.html`

- [ ] **Step 1: Add `<ng-content>` to `tag-chip.component.ts`**

Change the template from:

```ts
template: '<span>{{ tag() }}</span>',
```

to:

```ts
template: `<span>{{ tag() }}</span><ng-content></ng-content>`,
```

Nothing else changes in that component.

- [ ] **Step 2: Update `tags-list.component.ts` imports**

Replace the import block + `@Component` metadata block at the top of the file so it reads:

```ts
import { Component, ChangeDetectionStrategy, output, input } from '@angular/core';
import { TagChipComponent } from '@realworld/ui/components';

@Component({
  selector: 'cdt-tags-list',
  templateUrl: './tags-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TagChipComponent],
})
export class TagsListComponent {
  tags = input<string[]>([]);
  setListTag = output<string>();
}
```

- [ ] **Step 3: Rewrite `tags-list.component.html`**

Replace the entire contents with:

```html
<p class="sidebar-heading">Popular Tags</p>

<div class="tag-list">
  @for (tag of tags(); track tag) {
  <cdt-tag-chip [tag]="tag" variant="outline" [clickable]="true" (activated)="setListTag.emit($event)"></cdt-tag-chip>
  }
</div>
```

(Page-level styles for `.sidebar-heading` land in the home-page task; the class is just a semantic hook for now.)

- [ ] **Step 4: Update `article-list-item.component.ts` to import `TagChipComponent`**

Change:

```ts
imports: [RouterModule, NgClass, DatePipe, AvatarComponent],
```

to:

```ts
imports: [RouterModule, NgClass, DatePipe, AvatarComponent, TagChipComponent],
```

Add import:

```ts
import { TagChipComponent } from '@realworld/ui/components';
```

- [ ] **Step 5: Replace the tag list in `article-list-item.component.html`**

Find:

```html
<ul class="tag-list">
  @for (tag of article().tagList; track tag) {
  <li class="tag-default tag-pill tag-outline">{{ tag }}</li>
  }
</ul>
```

Replace with:

```html
<ul class="tag-list">
  @for (tag of article().tagList; track tag) {
  <li>
    <cdt-tag-chip [tag]="tag" variant="outline"></cdt-tag-chip>
  </li>
  }
</ul>
```

- [ ] **Step 6: Build + verify**

```bash
npx nx run conduit:build
```

- [ ] **Step 7: Commit**

```bash
git add libs/ui/components/src/tag-chip/tag-chip.component.ts libs/home/feature-home/src/tags-list/ libs/articles/feature-articles-list/src/article-list-item/
git commit -m "feat(ui): integrate cdt-tag-chip in tags-list + article-list-item"
```

---

## Task 5: Skeleton loader for the feed

Replace the plain `<div>Loading articles...</div>` placeholder with actual `<cdt-article-card-skeleton>` rows.

**Files:**

- Modify: `libs/articles/feature-articles-list/src/article-list.component.ts`
- Modify: `libs/articles/feature-articles-list/src/article-list.component.html`

- [ ] **Step 1: Update `article-list.component.ts`**

Change:

```ts
imports: [ArticleListItemComponent, PagerComponent],
```

to:

```ts
imports: [ArticleListItemComponent, PagerComponent, ArticleCardSkeletonComponent],
```

Add import:

```ts
import { ArticleCardSkeletonComponent } from '@realworld/ui/components';
```

- [ ] **Step 2: Rewrite `article-list.component.html`**

Replace the entire file with:

```html
@if (!$isLoading()) { @for (article of $articles(); track article.slug) {
<cdt-article-list-item
  data-testid="article-list"
  (navigateToArticle)="navigateToArticle($event)"
  (unFavorite)="unFavorite($event)"
  (favorite)="favorite($event)"
  [article]="article"
>
</cdt-article-list-item>
} @empty {
<div class="empty-feed-message">No articles are here... yet.</div>
}

<cdt-pager
  (setPage)="setPage($event)"
  [currentPage]="$listConfig.currentPage()"
  [totalPages]="$totalPages()"
></cdt-pager>
} @else { @for (_ of [1, 2, 3]; track $index) {
<cdt-article-card-skeleton></cdt-article-card-skeleton>
} }
```

Three skeleton cards are a good default while waiting for the page's articles to arrive.

- [ ] **Step 3: Build + verify**

```bash
npx nx run conduit:build
```

- [ ] **Step 4: Commit**

```bash
git add libs/articles/feature-articles-list/src/article-list.component.ts libs/articles/feature-articles-list/src/article-list.component.html
git commit -m "feat(ui): show article card skeletons while feed is loading"
```

---

## Task 6: Navbar — sticky + blur + avatar

Make the navbar sticky at the top of the viewport with a warm paper background and a `backdrop-filter: blur` pass. Add a compact `<cdt-avatar>` next to the username for logged-in users.

**Files:**

- Modify: `apps/conduit/src/styles/components/_nav.scss`
- Modify: `apps/conduit/src/app/layout/navbar/navbar.component.ts`
- Modify: `apps/conduit/src/app/layout/navbar/navbar.component.html`

- [ ] **Step 1: Rewrite the `.navbar` block in `_nav.scss`**

Find the existing block:

```scss
// Navbar — basic restyle, full sticky/blur version comes in Plan 2
.navbar {
  position: relative;
  padding: var(--sp-8) var(--sp-16);
  background-color: var(--paper);
  border-bottom: 1px solid var(--border);
}
```

Replace with:

```scss
// Navbar — sticky, blurred, modest shadow as you scroll.
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: var(--sp-12) var(--sp-16);
  background-color: rgba(255, 252, 247, 0.82);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--border);
}

[data-theme='dark'] .navbar {
  background-color: rgba(26, 20, 16, 0.82);
}
```

Leave every other rule in `_nav.scss` unchanged.

- [ ] **Step 2: Update `navbar.component.ts`**

Replace the import block and the `@Component` metadata so the file reads:

```ts
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '@realworld/core/api-types';
import { AvatarComponent } from '@realworld/ui/components';

@Component({
  selector: 'cdt-navbar',
  templateUrl: './navbar.component.html',
  imports: [RouterModule, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected readonly user = input.required<User>();
  protected readonly isLoggedIn = input.required<boolean>();
}
```

- [ ] **Step 3: Update `navbar.component.html`**

Replace the entire template with:

```html
<nav class="navbar navbar-light">
  <div class="container">
    <a class="navbar-brand" routerLink="/">conduit</a>

    @if (!isLoggedIn()) {
    <ul class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <a class="nav-link" routerLink="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/login" routerLinkActive="active">Sign in</a>
      </li>
      <li class="nav-item">
        <a class="nav-link nav-signup" routerLink="/register" routerLinkActive="active">Sign up</a>
      </li>
    </ul>
    } @else {
    <ul class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/']" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"
          >Home</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/editor" routerLinkActive="active">
          <i class="ion-compose"></i>&nbsp;New Post
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/settings" routerLinkActive="active">
          <i class="ion-gear-a"></i>&nbsp;Settings
        </a>
      </li>
      <li class="nav-item">
        <a
          data-testid="loggedin-user"
          class="nav-link nav-user"
          [routerLink]="['/profile', user().username]"
          routerLinkActive="active"
        >
          <cdt-avatar [src]="user().image" [username]="user().username" size="sm"></cdt-avatar>
          <span>{{ user().username }}</span>
        </a>
      </li>
    </ul>
    }
  </div>
</nav>
```

Changes vs. before:

- The Sign up link got `nav-signup` class so it renders as a pill (styles already exist in `_nav.scss`).
- Logged-in user link now includes a small avatar to the left of the username.

- [ ] **Step 4: Add a `.nav-user` rule to `_nav.scss`**

Near the bottom of `_nav.scss`, after the `.nav-signup:hover, .nav-signup:focus` block, append:

```scss
.nav-user {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-8);
}
```

- [ ] **Step 5: Build + verify**

```bash
npx nx run conduit:build
```

- [ ] **Step 6: Commit**

```bash
git add apps/conduit/src/styles/components/_nav.scss apps/conduit/src/app/layout/navbar/
git commit -m "feat(navbar): sticky + blur background and user avatar in links"
```

---

## Task 7: Footer — dedicated partial + token-only values

Move the footer rules out of `_pages-legacy.scss` into a dedicated `_footer.scss` partial. Content is unchanged.

**Files:**

- Create: `apps/conduit/src/styles/components/_footer.scss`
- Modify: `apps/conduit/src/styles/layouts/_pages-legacy.scss`
- Modify: `apps/conduit/src/styles.scss`

- [ ] **Step 1: Create `apps/conduit/src/styles/components/_footer.scss`**

```scss
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
  margin-left: var(--sp-8);
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
```

- [ ] **Step 2: Delete the footer block from `_pages-legacy.scss`**

Open `apps/conduit/src/styles/layouts/_pages-legacy.scss` and remove the block from `// Footer` down through (and including) the last `footer > .container { … }` rule. Keep everything below it (banner, article-preview, page-specific rules) untouched. The `:root { --content-width: 720px; --content-breakpoint: 1080px; }` block at the top of the file stays — the footer references it.

- [ ] **Step 3: Update `apps/conduit/src/styles.scss` to import the new footer partial**

In the `// Components` section of `styles.scss`, add the footer import after `error-messages`:

```scss
@use 'styles/components/error-messages';
@use 'styles/components/footer';
```

- [ ] **Step 4: Build + verify**

```bash
npx nx run conduit:build
```

- [ ] **Step 5: Commit**

```bash
git add apps/conduit/src/styles/components/_footer.scss apps/conduit/src/styles/layouts/_pages-legacy.scss apps/conduit/src/styles.scss
git commit -m "refactor(styles): move footer rules to dedicated _footer.scss partial"
```

---

## Task 8: Home page — Layout B (slim banner + tag chips + stream)

Restructures the home page: slim banner at top, feed-toggle tab row, a horizontal tag chip rail, then a single-column stream of articles with a gradient thumbnail on each card. The tag sidebar goes away — tags are now chips above the feed.

**Files:**

- Create: `apps/conduit/src/styles/layouts/_page-home.scss`
- Modify: `apps/conduit/src/styles/layouts/_pages-legacy.scss`
- Modify: `apps/conduit/src/styles.scss`
- Modify: `libs/home/feature-home/src/home.component.html`
- Modify: `libs/articles/feature-articles-list/src/article-list-item/article-list-item.component.html`
- Modify: `libs/articles/feature-articles-list/src/article-list-item/article-list-item.component.ts`

- [ ] **Step 1: Create `apps/conduit/src/styles/layouts/_page-home.scss`**

```scss
.home-page {
  display: block;
}

.home-page .home-banner {
  background: var(--paper-sunken);
  padding: var(--sp-32) var(--sp-16);
  border-bottom: 1px solid var(--border);
  text-align: center;
}

.home-page .home-banner h1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--fs-32);
  color: var(--ink-900);
  margin-bottom: var(--sp-4);
  letter-spacing: -0.01em;
}

.home-page .home-banner p {
  font-style: italic;
  color: var(--ink-500);
  margin-bottom: 0;
}

.home-page .home-container {
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 var(--sp-16);
}

.home-page .feed-toggle {
  display: flex;
  gap: var(--sp-16);
  padding: var(--sp-12) 0;
  border-bottom: 1px solid var(--border);
  margin-top: var(--sp-24);
}

.home-page .tag-chip-rail {
  padding: var(--sp-12) 0;
  border-bottom: 1px solid var(--border);
}

.home-page .tag-chip-rail-label {
  font-size: var(--fs-12);
  color: var(--ink-400);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  margin-bottom: var(--sp-8);
}

.home-page .empty-feed-message {
  padding: var(--sp-32) 0;
  color: var(--ink-400);
  text-align: center;
}

// Article card — single-column stream layout with a gradient thumbnail.
.home-page .article-preview {
  display: grid;
  grid-template-columns: 1fr 100px;
  gap: var(--sp-16);
  align-items: flex-start;
  border-top: 1px solid var(--border);
  padding: var(--sp-24) 0;
  transition: background-color 200ms ease;
}

.home-page .article-preview:hover {
  background-color: var(--paper-sunken);
}

.home-page .article-preview:first-of-type {
  border-top: none;
}

.home-page .article-preview .article-card-main {
  min-width: 0;
}

.home-page .article-preview .article-meta {
  display: flex;
  align-items: center;
  gap: var(--sp-8);
  margin-bottom: var(--sp-12);
}

.home-page .article-preview .article-meta .info {
  margin: 0;
  line-height: 1.2;
}

.home-page .article-preview .article-meta .author {
  font-weight: 600;
  color: var(--ink-900);
}

.home-page .article-preview .article-meta .date {
  color: var(--ink-400);
  font-size: var(--fs-12);
}

.home-page .article-preview .preview-link {
  display: block;
  color: inherit;
}

.home-page .article-preview .preview-link h1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--fs-20);
  line-height: var(--lh-tight);
  color: var(--ink-900);
  margin-bottom: var(--sp-4);
}

.home-page .article-preview .preview-link p {
  font-size: var(--fs-14);
  color: var(--ink-500);
  line-height: 1.5;
  margin-bottom: var(--sp-12);
}

.home-page .article-preview .tag-list {
  display: inline-block;
  margin: 0;
}

.home-page .article-preview .tag-list li {
  display: inline-block;
  margin-right: var(--sp-4);
}

// Favorite button floats right in the article meta row.
.home-page .article-preview .article-meta .btn {
  margin-left: auto;
}

// Thumbnail square — gradient derived from the article slug.
.home-page .article-preview .article-thumb {
  width: 100px;
  height: 80px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--brand-100), var(--brand-500));
}

@media (max-width: 540px) {
  .home-page .article-preview {
    grid-template-columns: 1fr;
  }
  .home-page .article-preview .article-thumb {
    display: none;
  }
}
```

- [ ] **Step 2: Remove the `.home-page` block from `_pages-legacy.scss`**

Open `_pages-legacy.scss` and remove the entire `// Home page` section (`.home-page .banner p`, `.home-page .banner h1`, `.home-page .feed-toggle`, `.home-page .sidebar`, `.home-page .sidebar p`). Everything else in that file stays.

- [ ] **Step 3: Add the new layout partial to `styles.scss`**

In the `// Layouts` section of `apps/conduit/src/styles.scss`, insert the home page import before the `pages-legacy` line:

```scss
@use 'styles/layouts/container';
@use 'styles/layouts/page-home';
@use 'styles/layouts/pages-legacy';
```

- [ ] **Step 4: Rewrite `libs/home/feature-home/src/home.component.html`**

Replace the entire file with:

```html
<div class="home-page">
  <div class="home-banner">
    <h1 class="logo-font">conduit</h1>
    <p>A place to share what you've been thinking about.</p>
  </div>

  <div class="home-container">
    @if ({ listConfig: $listConfig() }; as model) {
    <ul class="nav nav-pills outline-active feed-toggle">
      <li class="nav-item">
        <a [ngClass]="{ active: model.listConfig.type === 'FEED' }" class="nav-link" (click)="setListTo('FEED')"
          >Your Feed</a
        >
      </li>
      <li class="nav-item">
        <a
          data-testid="global-feed"
          [ngClass]="{
              active: model.listConfig.type === 'ALL' && !model.listConfig.filters.tag
            }"
          class="nav-link"
          (click)="setListTo('ALL')"
          >Global Feed</a
        >
      </li>
      <li class="nav-item" [hidden]="!model.listConfig.filters.tag">
        <a class="nav-link active">
          <i class="ion-pound"></i>
          {{ model.listConfig.filters.tag }}
        </a>
      </li>
    </ul>
    } @defer (when !!$tags().length) {
    <div class="tag-chip-rail">
      <div class="tag-chip-rail-label">Browse by tag</div>
      <cdt-tags-list (setListTag)="setListTag($event)" [tags]="$tags()"></cdt-tags-list>
    </div>
    }

    <cdt-article-list></cdt-article-list>
  </div>
</div>
```

Structural change: the outer `container > row` grid is gone. The `<cdt-tags-list>` moves from a right sidebar into a horizontal chip rail above the feed. Feed toggle keeps the same `data-testid="global-feed"` selector.

- [ ] **Step 5: Rewrite `article-list-item.component.html`**

Replace the file with:

```html
<div class="article-preview">
  <div class="article-card-main">
    <div class="article-meta">
      <a [routerLink]="['/profile', article().author.username]">
        <cdt-avatar [src]="article().author.image" [username]="article().author.username" size="md"></cdt-avatar>
      </a>
      <div class="info">
        <a class="author" [routerLink]="['/profile', article().author.username]"> {{ article().author.username }} </a>
        <span class="date"> {{ article().createdAt | date: 'longDate' }} · {{ $readingTime() }} min read </span>
      </div>
      <button
        [ngClass]="{
          'btn-outline-primary': !article().favorited,
          'btn-primary': article().favorited
        }"
        class="btn btn-sm"
        (click)="toggleFavorite(article())"
      >
        <i class="ion-heart"></i>
        {{ article().favoritesCount }}
      </button>
    </div>

    <a (click)="navigateToArticle.emit(article().slug)" class="preview-link">
      <h1 data-testid="article-list-title">{{ article().title }}</h1>
      <p>{{ article().description }}</p>
    </a>

    <ul class="tag-list">
      @for (tag of article().tagList; track tag) {
      <li>
        <cdt-tag-chip [tag]="tag" variant="outline"></cdt-tag-chip>
      </li>
      }
    </ul>
  </div>
  <div class="article-thumb" aria-hidden="true"></div>
</div>
```

Changes:

- Drops the `pull-xs-right` class from the favorite button — the new layout uses `margin-left: auto` in the meta row.
- Adds a two-column grid with an aesthetic gradient `article-thumb`.
- Adds a read-time badge next to the date.
- `data-testid="article-list-title"` preserved.

- [ ] **Step 6: Update `article-list-item.component.ts` with the read-time signal**

Replace the entire file content with:

```ts
import { Component, ChangeDetectionStrategy, computed, output, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass, DatePipe } from '@angular/common';
import { Article } from '@realworld/core/api-types';
import { AvatarComponent, TagChipComponent, readingTimeMinutes } from '@realworld/ui/components';

@Component({
  selector: 'cdt-article-list-item',
  templateUrl: './article-list-item.component.html',
  imports: [RouterModule, NgClass, DatePipe, AvatarComponent, TagChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListItemComponent {
  article = input.required<Article>();
  favorite = output<string>();
  unFavorite = output<string>();
  navigateToArticle = output<string>();

  readonly $readingTime = computed(() => readingTimeMinutes(this.article().body));

  toggleFavorite(article: Article) {
    if (article.favorited) {
      this.unFavorite.emit(article.slug);
    } else {
      this.favorite.emit(article.slug);
    }
  }
}
```

- [ ] **Step 7: Build + verify**

```bash
npx nx run conduit:build
```

- [ ] **Step 8: Run e2e to confirm selectors still work**

```bash
npx nx e2e conduit-e2e
```

Expected: the known pre-existing `frontend:serve-static` failure remains; no new failures. If other tests fail (e.g. the `global-feed` tab test), verify the `data-testid` is still on the matching element.

- [ ] **Step 9: Commit**

```bash
git add apps/conduit/src/styles/layouts/ apps/conduit/src/styles.scss libs/home/feature-home/ libs/articles/feature-articles-list/src/article-list-item/
git commit -m "feat(home): new slim-banner + tag-chips + stream layout"
```

---

## Task 9: Article page — side-rail layout

Drop the dark banner. Add a 50px sticky side rail with favorite / comment / share buttons. Body is centered in a 740px column. Comments section sits below. Remove the `.banner` block around the title. Preserve every `data-testid`.

**Files:**

- Create: `apps/conduit/src/styles/layouts/_page-article.scss`
- Modify: `apps/conduit/src/styles/layouts/_pages-legacy.scss`
- Modify: `apps/conduit/src/styles.scss`
- Modify: `libs/articles/feature-article/src/article.component.ts`
- Modify: `libs/articles/feature-article/src/article.component.html`

- [ ] **Step 1: Create `apps/conduit/src/styles/layouts/_page-article.scss`**

```scss
.article-page {
  display: block;
  max-width: 780px;
  margin: 0 auto;
  padding: 0 var(--sp-16);
}

.article-page .article-layout {
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: var(--sp-24);
  padding: var(--sp-32) 0;
}

.article-page .article-rail {
  position: sticky;
  top: 96px; // clears the sticky navbar
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: var(--sp-12);
  align-items: center;
}

.article-page .rail-btn {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border-strong);
  background: var(--paper-raised);
  color: var(--ink-500);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    color 150ms ease,
    background-color 150ms ease,
    border-color 150ms ease;
}

.article-page .rail-btn:hover {
  color: var(--brand-500);
  border-color: var(--brand-500);
}

.article-page .rail-btn.active {
  background-color: var(--brand-500);
  color: #fff;
  border-color: var(--brand-500);
}

.article-page .rail-count {
  font-size: var(--fs-12);
  color: var(--ink-400);
  margin-top: calc(-1 * var(--sp-8));
}

.article-page .article-kicker {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: var(--fs-12);
  color: var(--brand-500);
  font-weight: 700;
  margin-bottom: var(--sp-12);
}

.article-page .article-content {
  min-width: 0;
}

.article-page h1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--fs-44);
  line-height: var(--lh-tight);
  color: var(--ink-900);
  margin-bottom: var(--sp-16);
  letter-spacing: -0.02em;
}

.article-page .article-author-row {
  display: flex;
  align-items: center;
  gap: var(--sp-12);
  padding-bottom: var(--sp-16);
  margin-bottom: var(--sp-24);
  border-bottom: 1px solid var(--border);
}

.article-page .article-body {
  font-family: var(--font-display);
  font-size: var(--fs-18);
  line-height: var(--lh-relaxed);
  color: var(--ink-700);
}

.article-page .article-body p {
  margin-bottom: var(--sp-24);
}

.article-page .article-body h1,
.article-page .article-body h2,
.article-page .article-body h3,
.article-page .article-body h4,
.article-page .article-body h5,
.article-page .article-body h6 {
  font-family: var(--font-display);
  color: var(--ink-900);
  font-weight: 600;
  margin: var(--sp-32) 0 var(--sp-16) 0;
}

.article-page .article-body ul,
.article-page .article-body ol {
  margin-bottom: var(--sp-24);
  padding-left: var(--sp-32);
}

.article-page .article-body ul {
  list-style: disc;
}

.article-page .article-body ol {
  list-style: decimal;
}

.article-page .article-body pre,
.article-page .article-body code {
  font-family: var(--font-mono);
  background-color: var(--paper-sunken);
  border-radius: var(--radius-sm);
  padding: 2px 6px;
}

.article-page .article-body pre {
  padding: var(--sp-16);
  overflow-x: auto;
}

.article-page .article-body pre code {
  background: none;
  padding: 0;
}

.article-page .article-actions {
  display: flex;
  justify-content: center;
  gap: var(--sp-12);
  margin-top: var(--sp-32);
  padding-top: var(--sp-24);
  border-top: 1px solid var(--border);
}

.article-page .comments-section {
  margin-top: var(--sp-48);
}

.article-page .comments-heading {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--fs-24);
  color: var(--ink-900);
  margin-bottom: var(--sp-16);
}

.article-page .comment-signin-hint {
  padding: var(--sp-16) 0;
  color: var(--ink-500);
  font-size: var(--fs-14);
}

.article-page .comment-form .card-footer {
  background: transparent;
}

@media (max-width: 720px) {
  .article-page .article-layout {
    grid-template-columns: 1fr;
  }
  .article-page .article-rail {
    position: static;
    flex-direction: row;
    justify-content: center;
    order: 99;
    gap: var(--sp-24);
    border-top: 1px solid var(--border);
    padding-top: var(--sp-16);
    margin-top: var(--sp-24);
  }
  .article-page .rail-count {
    margin-top: 0;
  }
}
```

- [ ] **Step 2: Remove the `.article-page` block from `_pages-legacy.scss`**

In `_pages-legacy.scss`, delete the entire `// Article page` section (from `.article-page .banner` through the last `.article-page .card .mod-options i:hover` rule). Keep everything above and below.

- [ ] **Step 3: Add the new partial to `styles.scss`**

In the `// Layouts` section, insert the import after `page-home`:

```scss
@use 'styles/layouts/page-home';
@use 'styles/layouts/page-article';
@use 'styles/layouts/pages-legacy';
```

- [ ] **Step 4: Update `libs/articles/feature-article/src/article.component.ts`**

Replace the file with:

```ts
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, inject, input, signal } from '@angular/core';
import { ArticleStore } from '@realworld/articles/data-access';
import { ArticleMetaComponent } from './article-meta/article-meta.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@realworld/auth/data-access';
import { DatePipe } from '@angular/common';
import { AvatarComponent, CommentSkeletonComponent, readingTimeMinutes } from '@realworld/ui/components';

@Component({
  selector: 'cdt-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  imports: [
    ArticleMetaComponent,
    ArticleCommentComponent,
    MarkdownPipe,
    AddCommentComponent,
    RouterLink,
    DatePipe,
    AvatarComponent,
    CommentSkeletonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug = input<string>('');

  private readonly authStore = inject(AuthStore);
  private readonly articleStore = inject(ArticleStore);

  $article = this.articleStore.data;
  $comments = this.articleStore.comments;
  $commentsLoading = this.articleStore.getCommentsLoading;

  $authorUsername = this.articleStore.data.author.username;
  $isAuthenticated = this.authStore.loggedIn;
  $currentUser = this.authStore.user;
  $canModify = computed(() => this.authStore.user.username() === this.$authorUsername());

  $readingTime = computed(() => readingTimeMinutes(this.$article.body()));

  shareTooltip = signal<string | null>(null);

  ngOnInit() {
    this.articleStore.getArticle(this.slug());
    this.articleStore.getComments(this.slug());
  }

  follow(username: string) {
    this.articleStore.followUser(username);
  }
  unfollow(username: string) {
    this.articleStore.unfollowUser(username);
  }
  favorite(slug: string) {
    this.articleStore.favouriteArticle(slug);
  }
  unfavorite(slug: string) {
    this.articleStore.unFavouriteArticle(slug);
  }
  delete(slug: string) {
    this.articleStore.deleteArticle(slug);
  }

  submit(comment: string) {
    this.articleStore.addComment(comment);
  }

  deleteComment(data: { commentId: number; slug: string }) {
    this.articleStore.deleteComment(data);
  }

  ngOnDestroy() {
    this.articleStore.initializeArticle();
  }

  onRailFavorite() {
    const article = this.$article();
    if (article.favorited) {
      this.unfavorite(article.slug);
    } else {
      this.favorite(article.slug);
    }
  }

  onRailComment() {
    const el = document.getElementById('comments-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  async onRailShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      this.shareTooltip.set('Link copied');
    } catch {
      this.shareTooltip.set('Copy failed');
    }
    setTimeout(() => this.shareTooltip.set(null), 2000);
  }
}
```

Changes vs. before:

- Added `$readingTime`, `$commentsLoading`, `shareTooltip`.
- Added `onRailFavorite`, `onRailComment`, `onRailShare` helpers.
- `submit`, `deleteComment`, and `ngOnDestroy` kept with their existing implementations.
- Added imports: `AvatarComponent`, `CommentSkeletonComponent`, `readingTimeMinutes`, `DatePipe`, `signal`.

- [ ] **Step 5: Rewrite `article.component.html`**

Replace the entire file with:

```html
@if ($article(); as article) {
<div class="article-page">
  <div class="article-layout">
    <aside class="article-rail" aria-label="Article actions">
      <button
        type="button"
        class="rail-btn"
        [class.active]="article.favorited"
        (click)="onRailFavorite()"
        [attr.aria-pressed]="article.favorited"
        aria-label="Favorite article"
      >
        <i class="ion-heart"></i>
      </button>
      <div class="rail-count">{{ article.favoritesCount }}</div>

      <button type="button" class="rail-btn" (click)="onRailComment()" aria-label="Jump to comments">
        <i class="ion-chatbubble"></i>
      </button>
      <div class="rail-count">{{ $comments().length }}</div>

      <button type="button" class="rail-btn" (click)="onRailShare()" aria-label="Share article">
        <i class="ion-share"></i>
      </button>
      @if (shareTooltip(); as msg) {
      <div class="rail-count" role="status" aria-live="polite">{{ msg }}</div>
      }
    </aside>

    <article class="article-content">
      <div class="article-kicker">
        {{ $readingTime() }} min read @if (article.tagList.length) { · {{ article.tagList[0] }} }
      </div>
      <h1 data-testid="article-title">{{ article.title }}</h1>

      <div class="article-author-row">
        <cdt-article-meta
          [article]="article"
          (follow)="follow($event)"
          (unfollow)="unfollow($event)"
          (favorite)="favorite($event)"
          (unfavorite)="unfavorite($event)"
          (delete)="delete($event)"
          [canModify]="$canModify()"
        >
        </cdt-article-meta>
      </div>

      <div class="article-body" data-testid="article-body" [innerHTML]="article.body | markdown"></div>

      <hr />

      <div class="article-actions">
        <cdt-article-meta
          [article]="article"
          (follow)="follow($event)"
          (unfollow)="unfollow($event)"
          (favorite)="favorite($event)"
          (unfavorite)="unfavorite($event)"
          (delete)="delete($event)"
          [canModify]="$canModify()"
        ></cdt-article-meta>
      </div>

      <section id="comments-section" class="comments-section">
        <h2 class="comments-heading">Comments</h2>

        @if ($isAuthenticated()) {
        <cdt-add-comment [article]="article" [currentUser]="$currentUser()" (submitComment)="submit($event)" />
        } @else {
        <div class="comment-signin-hint">
          <a [routerLink]="['/login']">Sign in</a> or <a [routerLink]="['/register']">sign up</a> to add comments on
          this article.
        </div>
        } @if ($commentsLoading()) { @for (_ of [1, 2]; track $index) {
        <cdt-comment-skeleton></cdt-comment-skeleton>
        } } @else { @for (comment of $comments(); track comment.id) {
        <cdt-article-comment
          [currentUser]="$currentUser()"
          (delete)="deleteComment($event)"
          [article]="article"
          [comment]="comment"
        ></cdt-article-comment>
        } }
      </section>
    </article>
  </div>
</div>
}
```

Key points:

- `data-testid="article-title"` preserved on the `<h1>`.
- `data-testid="article-body"` preserved on the markdown container.
- The previous `<div class="banner">` wrapper around title + meta is gone. The dark banner is no more.
- Side rail mirrors the design spec (no reading progress bar).
- Comments section gets a proper heading and skeleton loaders.

- [ ] **Step 6: Build + e2e**

```bash
npx nx run conduit:build
npx nx e2e conduit-e2e
```

Expected: build passes; e2e either passes fully or only shows the known pre-existing `frontend` project bug. If any test asserting on `data-testid="article-title"` / `"article-body"` / `"article-author"` / `"global-feed"` fails, STOP and investigate.

- [ ] **Step 7: Commit**

```bash
git add apps/conduit/src/styles/layouts/ apps/conduit/src/styles.scss libs/articles/feature-article/src/article.component.ts libs/articles/feature-article/src/article.component.html
git commit -m "feat(article): side-rail layout with centered reading column"
```

---

## Task 10: Profile page — split hero + stats card

Layout C: avatar + bio + stats card in a three-column grid. Action row below. Tabs + feed stay below.

**Files:**

- Create: `apps/conduit/src/styles/layouts/_page-profile.scss`
- Modify: `apps/conduit/src/styles/layouts/_pages-legacy.scss`
- Modify: `apps/conduit/src/styles.scss`
- Modify: `libs/profile/feature-profile/src/profile.component.ts`
- Modify: `libs/profile/feature-profile/src/profile.component.html`

- [ ] **Step 1: Create `apps/conduit/src/styles/layouts/_page-profile.scss`**

```scss
.profile-page {
  display: block;
}

.profile-page .profile-hero {
  background: var(--paper-sunken);
  padding: var(--sp-32) var(--sp-16);
  border-bottom: 1px solid var(--border);
}

.profile-page .profile-hero-inner {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 96px 1fr auto;
  gap: var(--sp-24);
  align-items: center;
}

.profile-page .profile-bio {
  min-width: 0;
}

.profile-page .profile-bio h1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--fs-32);
  color: var(--ink-900);
  margin-bottom: var(--sp-4);
  letter-spacing: -0.01em;
}

.profile-page .profile-bio .handle {
  font-size: var(--fs-14);
  color: var(--ink-400);
  margin-bottom: var(--sp-8);
}

.profile-page .profile-bio p {
  font-size: var(--fs-14);
  color: var(--ink-500);
  line-height: 1.5;
  max-width: 480px;
  margin-bottom: 0;
}

.profile-page .profile-stats {
  background: var(--paper-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--sp-16);
  min-width: 140px;
  display: flex;
  flex-direction: column;
  gap: var(--sp-8);
}

.profile-page .profile-stats .stat-row {
  display: flex;
  justify-content: space-between;
  font-size: var(--fs-14);
}

.profile-page .profile-stats .stat-label {
  color: var(--ink-500);
}

.profile-page .profile-stats .stat-count {
  font-weight: 700;
  color: var(--ink-900);
}

.profile-page .profile-actions {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--sp-16) var(--sp-16);
  border-bottom: 1px solid var(--border);
  display: flex;
  gap: var(--sp-8);
}

.profile-page .profile-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--sp-16);
}

.profile-page .articles-toggle {
  padding: var(--sp-16) 0;
  border-bottom: 1px solid var(--border);
}

@media (max-width: 720px) {
  .profile-page .profile-hero-inner {
    grid-template-columns: 88px 1fr;
  }
  .profile-page .profile-stats {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-around;
  }
}
```

- [ ] **Step 2: Remove the `.profile-page` block from `_pages-legacy.scss`**

Delete the entire `// Profile page` section (from `.profile-page .user-info` through `.profile-page .articles-toggle`). Keep everything else.

- [ ] **Step 3: Add new partial to `styles.scss`**

```scss
@use 'styles/layouts/page-article';
@use 'styles/layouts/page-profile';
@use 'styles/layouts/pages-legacy';
```

- [ ] **Step 4: Update `profile.component.ts`**

Replace the entire file with:

```ts
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthStore } from '@realworld/auth/data-access';
import { ProfileStore } from '@realworld/profile/data-access';
import { ArticlesListStore } from '@realworld/articles/data-access';
import { AvatarComponent } from '@realworld/ui/components';

@Component({
  selector: 'cdt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [RouterModule, NgClass, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private readonly profileStore = inject(ProfileStore);
  private readonly authStore = inject(AuthStore);
  private readonly articlesListStore = inject(ArticlesListStore);

  $profileLoading = this.profileStore.getProfileLoading;
  $username = this.profileStore.username;
  $image = this.profileStore.image;
  $bio = this.profileStore.bio;
  $following = this.profileStore.following;
  $currentUser = this.authStore.user.username;

  $isUser = computed(() => this.$currentUser() === this.$username());

  /**
   * Articles count scoped to the currently-loaded feed (either "My Articles"
   * or "Favorited"). The API returns articlesCount for the active filter, so
   * this reflects the tab the user is on.
   */
  $articlesCount = computed(() => this.articlesListStore.articles.articlesCount());

  toggleFollowing() {
    if (this.$following()) {
      this.profileStore.unfollowUser(this.$username);
    } else {
      this.profileStore.followUser(this.$username);
    }
  }
}
```

- [ ] **Step 5: Rewrite `profile.component.html`**

Replace the entire file with:

```html
<div class="profile-page">
  <header class="profile-hero">
    <div class="profile-hero-inner">
      <cdt-avatar class="user-img" [src]="$image()" [username]="$username()" size="xl"></cdt-avatar>
      <div class="profile-bio">
        <h1 data-testid="article-author-profile" [hidden]="$profileLoading()">{{ $username() }}</h1>
        <div class="handle">{{ '@' + $username() }}</div>
        <p>{{ $bio() }}</p>
      </div>
      <div class="profile-stats" aria-label="Profile stats">
        <div class="stat-row">
          <span class="stat-label">Articles</span>
          <span class="stat-count">{{ $articlesCount() }}</span>
        </div>
      </div>
    </div>
  </header>

  <div class="profile-actions">
    <button
      [hidden]="$isUser()"
      class="btn btn-sm"
      [ngClass]="{
        'btn-outline-secondary': !$following(),
        'btn-secondary': $following()
      }"
      (click)="toggleFollowing()"
    >
      <i class="ion-plus-round"></i>
      &nbsp; {{ $following() ? 'Unfollow' : 'Follow' }} {{ $username() }}
    </button>
    <a [routerLink]="['/settings']" [hidden]="$isUser() === false" class="btn btn-sm btn-outline-secondary">
      <i class="ion-gear-a"></i> Edit Profile Settings
    </a>
  </div>

  <div class="profile-container">
    <div class="articles-toggle">
      <ul class="nav nav-pills outline-active">
        <li class="nav-item">
          <a
            class="nav-link"
            [routerLink]="['/profile', $username()]"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            >My Articles</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            [routerLink]="['/profile', $username(), 'favorites']"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            >Favorited Articles</a
          >
        </li>
      </ul>
    </div>

    <router-outlet></router-outlet>
  </div>
</div>
```

Changes:

- Structure flipped from `.user-info > .container > .row > .col-*` to the new hero/actions/container split.
- Follow / Edit Profile buttons moved out of the user-info header into their own `.profile-actions` row.
- Single stats row — Articles count only. The spec notes favorites-received is not cleanly derivable from the API; skipping to avoid fabricated data.
- `data-testid="article-author-profile"` preserved.

- [ ] **Step 6: Build + verify**

```bash
npx nx run conduit:build
```

- [ ] **Step 7: Commit**

```bash
git add apps/conduit/src/styles/layouts/ apps/conduit/src/styles.scss libs/profile/feature-profile/src/
git commit -m "feat(profile): split-hero layout with inline stats"
```

---

## Task 11: Auth pages — split-hero layout

Both login and register share the same split-hero layout: a warm `--paper-sunken` art panel on the left, a form on the right. No gradients.

**Files:**

- Create: `apps/conduit/src/styles/layouts/_page-auth.scss`
- Modify: `apps/conduit/src/styles.scss`
- Modify: `libs/auth/feature-auth/src/login/login.component.html`
- Modify: `libs/auth/feature-auth/src/register/register.component.html`

- [ ] **Step 1: Create `apps/conduit/src/styles/layouts/_page-auth.scss`**

```scss
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px); // navbar + footer approx
  padding: var(--sp-32) var(--sp-16);
  background-color: var(--paper);
}

.auth-page .auth-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 900px;
  min-height: 480px;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  background: var(--paper-raised);
}

.auth-page .auth-art {
  background: var(--paper-sunken);
  padding: var(--sp-32);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.auth-page .auth-art h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--fs-32);
  color: var(--ink-900);
  margin-bottom: var(--sp-12);
  letter-spacing: -0.02em;
}

.auth-page .auth-art p {
  font-size: var(--fs-14);
  color: var(--ink-500);
  line-height: 1.5;
  max-width: 280px;
  margin-bottom: var(--sp-24);
}

.auth-page .auth-quote {
  font-family: var(--font-display);
  font-style: italic;
  font-size: var(--fs-16);
  color: var(--ink-700);
  padding-top: var(--sp-16);
  border-top: 1px solid var(--border);
  max-width: 300px;
}

.auth-page .auth-form {
  padding: var(--sp-32);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.auth-page .auth-form h1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--fs-24);
  color: var(--ink-900);
  margin-bottom: var(--sp-4);
}

.auth-page .auth-sub {
  font-size: var(--fs-14);
  color: var(--ink-500);
  margin-bottom: var(--sp-24);
}

.auth-page .auth-form form .form-group {
  margin-bottom: var(--sp-12);
}

.auth-page .auth-form .btn-lg {
  width: 100%;
  margin-top: var(--sp-8);
}

.auth-page .auth-foot {
  margin-top: var(--sp-16);
  text-align: center;
  font-size: var(--fs-14);
  color: var(--ink-500);
}

@media (max-width: 720px) {
  .auth-page .auth-card {
    grid-template-columns: 1fr;
    min-height: unset;
  }
  .auth-page .auth-art {
    padding: var(--sp-24);
  }
}
```

- [ ] **Step 2: Add to `styles.scss`**

```scss
@use 'styles/layouts/page-profile';
@use 'styles/layouts/page-auth';
@use 'styles/layouts/pages-legacy';
```

- [ ] **Step 3: Rewrite `login.component.html`**

```html
<div class="auth-page">
  <div class="auth-card">
    <aside class="auth-art">
      <h2>Write, read,<br />connect</h2>
      <p>A place for your best thinking. Sign in to keep up with the writers you care about.</p>
      <div class="auth-quote">"Most of what I know I learned by reading."</div>
    </aside>

    <section class="auth-form">
      <h1>Welcome back</h1>
      <div class="auth-sub">Sign in to your account to continue.</div>

      <cdt-list-errors></cdt-list-errors>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <input
            formControlName="email"
            type="email"
            id="email"
            placeholder="Email"
            class="form-control form-control-lg"
          />
          <cdt-input-errors [control]="form.controls.email"></cdt-input-errors>
        </div>
        <div class="form-group">
          <input
            formControlName="password"
            type="password"
            id="password"
            placeholder="Password"
            class="form-control form-control-lg"
          />
          <cdt-input-errors [control]="form.controls.password"></cdt-input-errors>
        </div>
        <button
          data-testid="sign-in"
          class="btn btn-lg btn-primary"
          [disabled]="form.invalid || form.pending"
          type="submit"
        >
          Sign in
        </button>
      </form>

      <div class="auth-foot">New here? <a [routerLink]="['/register']">Create an account</a></div>
    </section>
  </div>
</div>
```

- [ ] **Step 4: Rewrite `register.component.html`**

```html
<div class="auth-page">
  <div class="auth-card">
    <aside class="auth-art">
      <h2>Join<br />Conduit</h2>
      <p>Create an account to publish your own articles and follow the writers whose work you love.</p>
      <div class="auth-quote">"Writing is thinking made visible."</div>
    </aside>

    <section class="auth-form">
      <h1>Create your account</h1>
      <div class="auth-sub">Takes about thirty seconds.</div>

      <cdt-list-errors></cdt-list-errors>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <input
            formControlName="username"
            type="text"
            id="username"
            placeholder="Username"
            class="form-control form-control-lg"
          />
          <cdt-input-errors [control]="form.controls.username" />
        </div>
        <div class="form-group">
          <input
            formControlName="email"
            type="email"
            id="email"
            placeholder="Email"
            class="form-control form-control-lg"
          />
          <cdt-input-errors [control]="form.controls.email" />
        </div>
        <div class="form-group">
          <input
            formControlName="password"
            type="password"
            id="password"
            placeholder="Password"
            class="form-control form-control-lg"
          />
          <cdt-input-errors [control]="form.controls.password" />
        </div>
        <button
          data-testid="sign-up"
          class="btn btn-lg btn-primary"
          [disabled]="form.invalid || form.pending"
          type="submit"
        >
          Sign up
        </button>
      </form>

      <div class="auth-foot">Have an account? <a [routerLink]="['/login']">Sign in</a></div>
    </section>
  </div>
</div>
```

`data-testid="sign-in"` and `data-testid="sign-up"` are preserved on the submit buttons.

- [ ] **Step 5: Build + e2e**

```bash
npx nx run conduit:build
npx nx e2e conduit-e2e
```

Expected: build passes; known pre-existing e2e bug only.

- [ ] **Step 6: Commit**

```bash
git add apps/conduit/src/styles/layouts/ apps/conduit/src/styles.scss libs/auth/feature-auth/src/
git commit -m "feat(auth): split-hero layout for login + register"
```

---

## Task 12: Editor — two-pane layout + chip tag input

Left pane: title/subtitle/body inputs, plus a chip tag input. Right pane: live markdown preview (debounced at 150ms).

**Files:**

- Create: `apps/conduit/src/styles/layouts/_page-editor.scss`
- Modify: `apps/conduit/src/styles.scss`
- Modify: `libs/articles/feature-article-edit/src/article-edit.component.ts`
- Modify: `libs/articles/feature-article-edit/src/article-edit.component.html`

- [ ] **Step 1: Create `apps/conduit/src/styles/layouts/_page-editor.scss`**

```scss
.editor-page {
  display: block;
}

.editor-page .editor-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 160px);
  max-width: 1200px;
  margin: 0 auto;
}

.editor-page .editor-write {
  padding: var(--sp-32);
  border-right: 1px solid var(--border);
  background: var(--paper);
  min-width: 0;
}

.editor-page .editor-preview {
  padding: var(--sp-32);
  background: var(--paper-sunken);
  min-width: 0;
  overflow-wrap: break-word;
}

.editor-page .editor-title-input {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--fs-32);
  color: var(--ink-900);
  background: transparent;
  border: none;
  padding: var(--sp-8) 0;
  width: 100%;
  outline: none;
  letter-spacing: -0.02em;
}

.editor-page .editor-title-input:focus {
  border-bottom: 1px solid var(--border);
}

.editor-page .editor-subtitle-input {
  font-family: var(--font-display);
  font-style: italic;
  font-size: var(--fs-16);
  color: var(--ink-500);
  background: transparent;
  border: none;
  padding: var(--sp-8) 0;
  width: 100%;
  outline: none;
  margin-bottom: var(--sp-16);
}

.editor-page .editor-body-input {
  font-family: var(--font-mono);
  font-size: var(--fs-14);
  line-height: 1.6;
  color: var(--ink-700);
  background: transparent;
  border: none;
  border-top: 1px dashed var(--border);
  padding: var(--sp-16) 0;
  width: 100%;
  min-height: 320px;
  resize: vertical;
  outline: none;
}

.editor-page .chip-input-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-4);
  padding: var(--sp-8) 0;
  align-items: center;
  border-top: 1px dashed var(--border);
}

.editor-page .chip-remove {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  margin-left: var(--sp-4);
  font-size: inherit;
  line-height: 1;
  padding: 0 4px;
}

.editor-page .chip-remove:hover {
  color: var(--brand-600);
}

.editor-page .chip-text-input {
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  min-width: 120px;
  padding: var(--sp-4) var(--sp-8);
  font-family: var(--font-body);
  font-size: var(--fs-14);
  color: var(--ink-700);
}

.editor-page .chip-text-input::placeholder {
  color: var(--ink-400);
}

.editor-page .preview-label {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: var(--fs-12);
  color: var(--brand-500);
  font-weight: 700;
  margin-bottom: var(--sp-16);
}

.editor-page .preview-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--fs-32);
  color: var(--ink-900);
  margin-bottom: var(--sp-8);
  line-height: var(--lh-tight);
  letter-spacing: -0.02em;
}

.editor-page .preview-subtitle {
  font-family: var(--font-display);
  font-style: italic;
  font-size: var(--fs-16);
  color: var(--ink-500);
  margin-bottom: var(--sp-24);
}

.editor-page .preview-body {
  font-family: var(--font-display);
  font-size: var(--fs-16);
  line-height: var(--lh-relaxed);
  color: var(--ink-700);
}

.editor-page .editor-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--sp-12);
  padding: var(--sp-16) var(--sp-32);
  background: var(--paper-sunken);
  border-top: 1px solid var(--border);
}

@media (max-width: 960px) {
  .editor-page .editor-layout {
    grid-template-columns: 1fr;
  }
  .editor-page .editor-write {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}
```

- [ ] **Step 2: Add to `styles.scss`**

```scss
@use 'styles/layouts/page-auth';
@use 'styles/layouts/page-editor';
@use 'styles/layouts/pages-legacy';
```

- [ ] **Step 3: Rewrite `article-edit.component.ts`**

```ts
import { InputErrorsComponent, ListErrorsComponent } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, startWith } from 'rxjs';
import { ArticleStore } from '@realworld/articles/data-access';
import { TagChipComponent } from '@realworld/ui/components';
import { MarkdownPipe } from '@realworld/articles/article';

@Component({
  selector: 'cdt-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css'],
  imports: [ListErrorsComponent, ReactiveFormsModule, InputErrorsComponent, TagChipComponent, MarkdownPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditComponent implements OnDestroy {
  private readonly articleStore = inject(ArticleStore);
  private readonly fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    body: ['', [Validators.required]],
  });

  /** Pending tag input (the text the user is currently typing). */
  tagInput = new FormControl('', { nonNullable: true });

  /** Accumulated tags. */
  readonly tags = signal<string[]>([]);

  // Debounced signals for the live preview.
  readonly $previewTitle = toSignal(this.form.controls.title.valueChanges.pipe(debounceTime(150), startWith('')), {
    initialValue: '',
  });
  readonly $previewSubtitle = toSignal(
    this.form.controls.description.valueChanges.pipe(debounceTime(150), startWith('')),
    { initialValue: '' },
  );
  readonly $previewBody = toSignal(this.form.controls.body.valueChanges.pipe(debounceTime(150), startWith('')), {
    initialValue: '',
  });

  readonly $previewHasContent = computed(() =>
    Boolean(this.$previewTitle() || this.$previewSubtitle() || this.$previewBody()),
  );

  readonly setArticleDataToForm = effect(() => {
    const articleLoaded = this.articleStore.getArticleLoaded();
    if (articleLoaded) {
      this.form.patchValue({
        title: this.articleStore.data.title(),
        description: this.articleStore.data.description(),
        body: this.articleStore.data.body(),
      });
      this.tags.set(this.articleStore.data.tagList());
    }
  });

  /** Called on Enter or comma keypress in the chip input. */
  onTagKey(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.commitPendingTag();
    } else if (event.key === 'Backspace' && !this.tagInput.value && this.tags().length) {
      // Let Backspace pop the last chip when the input is empty.
      event.preventDefault();
      this.tags.update((arr) => arr.slice(0, -1));
    }
  }

  private commitPendingTag(): void {
    const raw = this.tagInput.value.trim().replace(/,$/, '').trim();
    if (!raw) return;
    if (this.tags().includes(raw)) {
      this.tagInput.setValue('');
      return;
    }
    this.tags.update((arr) => [...arr, raw]);
    this.tagInput.setValue('');
  }

  removeTag(index: number): void {
    this.tags.update((arr) => arr.filter((_, i) => i !== index));
  }

  onSubmit() {
    // Commit any text still in the tag input before submitting.
    this.commitPendingTag();

    const article = {
      article: {
        ...this.form.getRawValue(),
        tagList: this.tags(),
      },
    };
    if (this.articleStore.data.slug()) {
      this.articleStore.editArticle({ editArticle: article, slug: this.articleStore.data.slug() });
    } else {
      this.articleStore.publishArticle(article);
    }
  }

  ngOnDestroy() {
    this.form.reset();
    this.tags.set([]);
    this.tagInput.reset('');
  }
}
```

Notes:

- The `tagList` key is dropped from the form; the new `tags` signal holds the canonical list, and `onSubmit` merges it in.
- The previous split-on-comma behavior is gone; tags are explicitly committed.
- The `MarkdownPipe` is imported from `@realworld/articles/article` — verify the barrel exports it (if not, import from the direct path `@realworld/articles/article/src/pipes/markdown.pipe`; most projects expose it via the feature lib's `index.ts`).

- [ ] **Step 4: Rewrite `article-edit.component.html`**

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()" class="editor-page">
  <div class="editor-layout">
    <div class="editor-write">
      <cdt-list-errors></cdt-list-errors>

      <input
        formControlName="title"
        type="text"
        placeholder="Article title..."
        class="editor-title-input"
        data-testid="title-input"
      />
      <cdt-input-errors data-testid="title-input-error" [control]="form.controls.title" />

      <input
        formControlName="description"
        type="text"
        placeholder="What's this article about?"
        class="editor-subtitle-input"
        data-testid="description-input"
      />
      <cdt-input-errors data-testid="description-input-error" [control]="form.controls.description" />

      <textarea
        formControlName="body"
        rows="12"
        placeholder="Write your article (in markdown)..."
        class="editor-body-input"
        data-testid="body-textarea"
      ></textarea>
      <cdt-input-errors data-testid="body-textarea-error" [control]="form.controls.body" />

      <div class="chip-input-wrapper" data-testid="tags-textarea-wrapper">
        @for (tag of tags(); track tag; let i = $index) {
        <cdt-tag-chip [tag]="tag" variant="default">
          <button type="button" class="chip-remove" aria-label="Remove tag" (click)="removeTag(i)">×</button>
        </cdt-tag-chip>
        }
        <input
          [formControl]="tagInput"
          type="text"
          placeholder="Add a tag — press Enter"
          class="chip-text-input"
          data-testid="tags-textarea"
          (keydown)="onTagKey($event)"
        />
      </div>
    </div>

    <aside class="editor-preview" aria-label="Live preview">
      <div class="preview-label">Live preview</div>
      @if ($previewTitle(); as title) {
      <div class="preview-title">{{ title }}</div>
      } @if ($previewSubtitle(); as subtitle) {
      <div class="preview-subtitle">{{ subtitle }}</div>
      } @if ($previewBody(); as body) {
      <div class="preview-body" [innerHTML]="body | markdown"></div>
      } @else if (!$previewHasContent()) {
      <div class="preview-body" style="color: var(--ink-400); font-style: italic;">
        Start writing — your preview will appear here.
      </div>
      }
    </aside>
  </div>

  <div class="editor-footer">
    <a class="btn btn-outline-secondary" routerLink="/">Cancel</a>
    <button
      data-testid="publish-article-button"
      class="btn btn-primary"
      [disabled]="form.invalid || form.pending"
      type="submit"
    >
      Publish Article
    </button>
  </div>
</form>
```

Every `data-testid` from the old template is preserved (`title-input`, `title-input-error`, `description-input`, `description-input-error`, `body-textarea`, `body-textarea-error`, `tags-textarea`, `publish-article-button`).

- [ ] **Step 5: Verify `MarkdownPipe` export**

Run:

```bash
grep -n "MarkdownPipe" libs/articles/feature-article/src/index.ts
```

If it doesn't appear, add the export to that file:

```ts
export * from './pipes/markdown.pipe';
```

- [ ] **Step 6: Update `article-edit.component.ts` import if the barrel name differs**

The current `tsconfig.base.json` has the alias `@realworld/articles/article` for `libs/articles/feature-article/src/index.ts`. Confirm the import in Step 3 (`import { MarkdownPipe } from '@realworld/articles/article';`) resolves. If the alias is different, adjust to match.

- [ ] **Step 7: Build + e2e**

```bash
npx nx run conduit:build
npx nx e2e conduit-e2e
```

- [ ] **Step 8: Commit**

```bash
git add apps/conduit/src/styles/layouts/ apps/conduit/src/styles.scss libs/articles/feature-article-edit/src/
git commit -m "feat(editor): two-pane layout with live markdown preview and chip tag input"
```

---

## Task 13: Settings — sectioned cards + theme toggle + logout

Three cards (Profile / Account / Preferences), with the `<cdt-theme-toggle>` in Preferences and a "Log out" button in the footer row.

**Files:**

- Create: `apps/conduit/src/styles/layouts/_page-settings.scss`
- Modify: `apps/conduit/src/styles.scss`
- Modify: `libs/settings/feature-settings/src/settings.component.ts`
- Modify: `libs/settings/feature-settings/src/settings.component.html`

- [ ] **Step 1: Create `apps/conduit/src/styles/layouts/_page-settings.scss`**

```scss
.settings-page {
  display: block;
  max-width: 640px;
  margin: 0 auto;
  padding: var(--sp-32) var(--sp-16);
}

.settings-page h1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--fs-32);
  color: var(--ink-900);
  margin-bottom: var(--sp-4);
  letter-spacing: -0.01em;
}

.settings-page .settings-sub {
  font-size: var(--fs-14);
  color: var(--ink-500);
  margin-bottom: var(--sp-24);
}

.settings-page .settings-section {
  background: var(--paper-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--sp-24);
  margin-bottom: var(--sp-16);
}

.settings-page .settings-section h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--fs-18);
  color: var(--ink-900);
  margin-bottom: var(--sp-4);
}

.settings-page .settings-section-desc {
  font-size: var(--fs-12);
  color: var(--ink-400);
  margin-bottom: var(--sp-16);
}

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

.settings-page .settings-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--sp-24);
  padding-top: var(--sp-16);
  border-top: 1px solid var(--border);
}
```

- [ ] **Step 2: Add to `styles.scss`**

```scss
@use 'styles/layouts/page-editor';
@use 'styles/layouts/page-settings';
@use 'styles/layouts/pages-legacy';
```

- [ ] **Step 3: Update `settings.component.ts`**

```ts
import { InputErrorsComponent, ListErrorsComponent } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { AuthStore } from '@realworld/auth/data-access';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThemeToggleComponent } from '@realworld/ui/components';

@Component({
  selector: 'cdt-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  imports: [ListErrorsComponent, ReactiveFormsModule, InputErrorsComponent, ThemeToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    image: [''],
    username: ['', [Validators.required]],
    bio: [''],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  readonly setUserDataToForm = effect(() => {
    const userLoaded = this.authStore.getUserLoaded();
    if (userLoaded) {
      this.form.patchValue(this.authStore.user());
    }
  });

  onSubmit() {
    this.authStore.updateUser(this.form.getRawValue());
  }

  logout() {
    this.authStore.logout();
  }
}
```

- [ ] **Step 4: Rewrite `settings.component.html`**

```html
<div class="settings-page">
  <h1>Settings</h1>
  <div class="settings-sub">Manage your profile, account, and preferences.</div>

  <cdt-list-errors />

  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <section class="settings-section">
      <h2>Profile</h2>
      <div class="settings-section-desc">This is how others will see you on Conduit.</div>

      <fieldset class="form-group">
        <input
          formControlName="image"
          type="text"
          id="image"
          placeholder="URL of profile picture"
          class="form-control"
        />
      </fieldset>
      <fieldset class="form-group required">
        <input formControlName="username" type="text" id="username" placeholder="Your username" class="form-control" />
        <cdt-input-errors [control]="form.controls.username" />
      </fieldset>
      <fieldset class="form-group">
        <textarea
          class="form-control"
          rows="5"
          id="bio"
          formControlName="bio"
          placeholder="Short bio about you"
        ></textarea>
      </fieldset>
    </section>

    <section class="settings-section">
      <h2>Account</h2>
      <div class="settings-section-desc">Private — only you can see these.</div>

      <fieldset class="form-group required">
        <input formControlName="email" type="email" id="email" placeholder="Email" class="form-control" />
        <cdt-input-errors [control]="form.controls.email" />
      </fieldset>
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

    <section class="settings-section">
      <h2>Preferences</h2>
      <div class="settings-section-desc">Customize how Conduit feels.</div>

      <div class="settings-pref-row">
        <div>
          <div class="settings-pref-label">Appearance</div>
          <div class="settings-pref-sub">Light, dark, or follow your system.</div>
        </div>
        <cdt-theme-toggle></cdt-theme-toggle>
      </div>
    </section>

    <div class="settings-footer">
      <button type="button" class="btn btn-outline-danger" (click)="logout()">Log out</button>
      <button
        data-testid="edit-button-container"
        class="btn btn-primary"
        [disabled]="form.invalid || form.pending"
        type="submit"
      >
        Save changes
      </button>
    </div>
  </form>
</div>
```

`data-testid="edit-button-container"` preserved on the save button.

- [ ] **Step 5: Build + e2e**

```bash
npx nx run conduit:build
npx nx e2e conduit-e2e
```

- [ ] **Step 6: Commit**

```bash
git add apps/conduit/src/styles/layouts/ apps/conduit/src/styles.scss libs/settings/feature-settings/src/
git commit -m "feat(settings): sectioned cards + theme toggle + log out"
```

---

## Task 14: Remove `_pages-legacy.scss`

Every page-specific block has now been migrated. Delete the legacy file and its import. The `--content-width` and `--content-breakpoint` custom properties at the top of the file migrate to a new `_layout-vars.scss` partial in `tokens/` since footer and the old article content reference them.

**Files:**

- Delete: `apps/conduit/src/styles/layouts/_pages-legacy.scss`
- Create: `apps/conduit/src/styles/tokens/_layout-vars.scss`
- Modify: `apps/conduit/src/styles/tokens/_tokens.scss`
- Modify: `apps/conduit/src/styles.scss`

- [ ] **Step 1: Check the remaining contents of `_pages-legacy.scss`**

After Tasks 7–13, this file should only contain:

- The `:root { --content-width: 720px; --content-breakpoint: 1080px; }` block
- The shared `.banner`, `.preview-link`, `.article-meta`, `.article-preview`, `.btn .counter` rules
- The `.editor-page .tag-list i` rule (dead — editor no longer has that structure)

Anything from `// Footer`, `// Home page`, `// Article page`, `// Profile page` should be gone. Anything still present from those sections is a migration miss — go back and move it into the right `_page-*.scss` partial.

Also dead after the new home feed layout: the `.article-meta`, `.article-preview`, `.preview-link`, `.btn .counter` rules in `_pages-legacy.scss` are now overridden by `_page-home.scss` (which handles the feed card styling). Delete those rules too.

Also dead: the `.banner` rule — no page uses `.banner` anymore (the old home page banner is now `.home-banner`, article page has no banner).

- [ ] **Step 2: Create `apps/conduit/src/styles/tokens/_layout-vars.scss`**

```scss
:root {
  --content-width: 720px;
  --content-breakpoint: 1080px;
}
```

- [ ] **Step 3: Update `apps/conduit/src/styles/tokens/_tokens.scss`**

```scss
@forward 'colors';
@forward 'typography';
@forward 'spacing';
@forward 'elevation';
@forward 'layout-vars';
```

- [ ] **Step 4: Delete `_pages-legacy.scss`**

```bash
rm apps/conduit/src/styles/layouts/_pages-legacy.scss
```

- [ ] **Step 5: Remove it from `styles.scss`**

Remove the line `@use 'styles/layouts/pages-legacy';`. Add the new layout-vars import to the `// Design tokens` block, after `elevation`:

```scss
// Design tokens
@use 'styles/tokens/colors';
@use 'styles/tokens/typography';
@use 'styles/tokens/spacing';
@use 'styles/tokens/elevation';
@use 'styles/tokens/layout-vars';
```

The `// Layouts` block should now read:

```scss
// Layouts
@use 'styles/layouts/container';
@use 'styles/layouts/page-home';
@use 'styles/layouts/page-article';
@use 'styles/layouts/page-profile';
@use 'styles/layouts/page-auth';
@use 'styles/layouts/page-editor';
@use 'styles/layouts/page-settings';
```

`container` is still needed since the navbar template uses `.container` in its outer wrapper; Plan 2 can optionally replace that with a simpler flex container in Plan 3 cleanup, but leave it for now.

- [ ] **Step 6: Build**

```bash
npx nx run conduit:build
```

Expected: build succeeds. The app renders as expected.

- [ ] **Step 7: Smoke-test every page**

Start the dev server:

```bash
npx nx run conduit:serve --port=4200
```

Manually load (or curl) each route to check the HTML loads and has no console errors:

- `/` home
- `/login`
- `/register`
- `/article/some-slug` (will 404 on a slug that doesn't exist — that's fine, just check the SPA routes render the placeholder)
- `/editor`
- `/settings` (requires auth — won't be reachable without logging in, but `/settings` → redirect-to-login should render)
- `/profile/some-user`

Stop the server.

- [ ] **Step 8: Run e2e**

```bash
npx nx e2e conduit-e2e
```

Expected: known pre-existing bug only. Every functional test passes.

- [ ] **Step 9: Commit**

```bash
git add apps/conduit/src/styles/tokens/_layout-vars.scss apps/conduit/src/styles/tokens/_tokens.scss apps/conduit/src/styles/layouts/_pages-legacy.scss apps/conduit/src/styles.scss
git commit -m "refactor(styles): remove _pages-legacy.scss, move content-width tokens to layout-vars"
```

---

## Task 15: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Run lint**

```bash
npx nx affected -t lint
```

Expected: no new lint errors. Fix any that reference files this plan touched.

- [ ] **Step 2: Run unit tests**

```bash
npx nx affected -t test
```

Expected: `ui-components` tests (now 19 + readingTime) all pass. `core-theme` 12 pass. Pre-existing `conduit:test` zone.js failure remains.

- [ ] **Step 3: Production build**

```bash
npx nx run conduit:build --configuration=production
```

Expected: succeeds. Note any new bundle size warnings.

- [ ] **Step 4: e2e**

```bash
npx nx e2e conduit-e2e
```

Expected: only the pre-existing `frontend:serve-static` config bug. All functional tests pass.

- [ ] **Step 5: Manual smoke — light + dark + routes**

```bash
npx nx run conduit:serve --port=4200
```

Open `http://localhost:4200/` in a browser. Walk through:

1. Home page renders with new layout (slim banner, tag chip rail, stream cards with gradient thumb)
2. Click "Global Feed" → tab switches, feed re-renders
3. Click a tag chip → feed filters by tag
4. Click a card → article page opens with side-rail
5. Click the favorite icon in the side-rail → count updates
6. Click the share icon → toast/status appears with "Link copied"
7. Scroll up to nav → sticky navbar with subtle blur
8. DevTools → Rendering → Emulate `prefers-color-scheme: dark` → page flips to dark mode smoothly
9. Sign in flow: `/login` shows split-hero layout. Sign in with a test account.
10. Navigate to `/settings` → 3 card sections visible. Try the Appearance toggle: Light / Dark / System.
11. `/editor` → two-pane layout. Type something; preview updates after ~150ms. Type a tag + Enter → chip appears. Click × → chip removed.
12. `/profile/<your-user>` → split-hero with Articles count; feed shows cards.

If any step fails visibly (broken layout, missing data, console error), investigate. If a pure regression is found, report as BLOCKED.

Stop the server.

- [ ] **Step 6: Confirm `_pages-legacy.scss` is gone**

```bash
ls apps/conduit/src/styles/layouts/ | sort
```

Expected output:

```
_container.scss
_page-article.scss
_page-auth.scss
_page-editor.scss
_page-home.scss
_page-profile.scss
_page-settings.scss
```

No `_pages-legacy.scss`.

- [ ] **Step 7: Final commit if any fixes landed during verification**

If Steps 1–6 surfaced issues that required code changes, commit them now:

```bash
git status
git add -A
git commit -m "chore: fix issues discovered during plan-2 verification"
```

---

## Done

Plan 2 is complete when Task 15 passes. At that point:

- Every page renders in the new Warm & Friendly layouts with terracotta accent.
- Dark mode works across every page.
- `cdt-avatar`, `cdt-tag-chip`, `cdt-skeleton`, `cdt-theme-toggle`, and `readingTimeMinutes` are live in templates.
- `_pages-legacy.scss` is removed; each page has its own dedicated layout partial.
- All existing `data-testid` attributes are intact; e2e remains green.

**Known follow-ups for Plan 3:**

- Migrate every `<i class="ion-*">` to `<cdt-icon>` and remove the ionicons CDN link from `index.html`.
- Fix `cdt-icon` to use named `provideIcons([…])` imports from `lucide-angular` so the production bundle ships only the icons actually used (currently it pulls the full ~1500-icon map via dynamic lookup).
- Accessibility pass: tab-order check, color-contrast check across light + dark, aria-live for the side-rail share toast, skip-to-content link on navbar.
- Consider a 404 route.
- Tidy any one-off `color: var(--ink-700)` vs `color: var(--ink-900)` inconsistencies noticed during Plan 2 QA.
