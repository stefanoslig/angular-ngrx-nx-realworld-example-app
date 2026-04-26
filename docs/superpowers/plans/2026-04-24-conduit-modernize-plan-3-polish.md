# Conduit Modernize — Plan 3: Icon Migration + Polish

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the Conduit modernization by migrating every `<i class="ion-*">` to `<cdt-icon>`, removing the ionicons CDN, switching the Lucide integration to tree-shakable named imports, adding a 404 route, and addressing the small polish items carried forward from Plans 1 and 2.

**Architecture:** `cdt-icon` is rewired from a full-bundle dynamic lookup to a compile-time registry of individually-imported Lucide icons — the bundler then ships only the ~9 icons we actually use. Templates are swept file-by-file replacing the ion-font classes with `<cdt-icon name="…">`. A catch-all `**` route renders a small 404 component in the same Warm & Friendly language.

**Tech Stack:** Angular 21.2.5 (zoneless, standalone components), Lucide Angular 1.0.0, SCSS with CSS custom properties. No new deps.

**Out of scope (explicitly):**

- Any further page-layout changes (Plan 2 shipped the final layouts).
- Changes to the `Conduit` API.
- New features.
- Visual regression tests.

---

## File structure

**Created:**

```
apps/conduit/src/app/layout/not-found/
├── not-found.component.ts              # NEW — 404 page component
└── not-found.component.html            # NEW — template
```

**Modified:**

- `libs/ui/components/src/icon/icon.component.ts` — replace `icons` dynamic map lookup with a named-import registry. Only imports the 9 icons the app actually uses.
- `apps/conduit/src/index.html` — remove the ionicons CDN `<link>`.
- `apps/conduit/src/app/layout/navbar/navbar.component.html` — `<i class="ion-*">` → `<cdt-icon>` (2 icons: compose/pen-line + settings).
- `libs/home/feature-home/src/home.component.html` — hash icon (tag filter indicator).
- `libs/articles/feature-articles-list/src/article-list-item/article-list-item.component.ts` + `.html` — heart icon in the favorite button.
- `libs/articles/feature-article/src/article.component.ts` + `.html` — heart, chat-bubble, share in the side-rail.
- `libs/articles/feature-article/src/article-meta/article-meta.component.ts` + `.html` — heart, pencil, trash, plus (4 icons).
- `libs/articles/feature-article/src/article-comment/article-comment.component.ts` + `.html` — trash (delete).
- `libs/profile/feature-profile/src/profile.component.ts` + `.html` — plus, settings.
- `apps/conduit/src/styles/tokens/_colors.scss` — new `--paper-translucent` token (light + dark).
- `apps/conduit/src/styles/components/_nav.scss` — navbar uses `var(--paper-translucent)` instead of hardcoded `rgba(…)`.
- `libs/articles/feature-article/src/article.component.ts` — clear pending `setTimeout` handle on destroy.
- `apps/conduit/src/app/app.config.ts` — add the catch-all `**` route.

---

## Task 1: Rework `cdt-icon` with named-import registry (tree-shakable)

The current implementation imports the full `icons` bag from `lucide-angular`, which pulls every icon (~1500) into the bundle. Replace the dynamic lookup with a closed registry populated via named imports; the bundler drops any icon not imported.

**Files:**

- Modify: `libs/ui/components/src/icon/icon.component.ts`

- [ ] **Step 1: Replace `libs/ui/components/src/icon/icon.component.ts` with:**

```ts
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  LucideAngularModule,
  Hash,
  Heart,
  MessageCircle,
  Pencil,
  PenLine,
  Plus,
  Settings,
  Share2,
  Trash2,
  type LucideIconData,
} from 'lucide-angular';

export type IconSize = 12 | 14 | 16 | 18 | 20 | 24 | 32;

/**
 * Registry of every Lucide icon this app actually uses.
 *
 * Adding a new icon is a two-step process:
 *   1. Add the named import above (so the bundler ships it).
 *   2. Add a kebab-case alias below.
 *
 * Only icons present in this map are bundled; the rest of Lucide is
 * tree-shaken away.
 */
const ICON_REGISTRY: Readonly<Record<string, LucideIconData>> = {
  hash: Hash,
  heart: Heart,
  'message-circle': MessageCircle,
  pencil: Pencil,
  'pen-line': PenLine,
  plus: Plus,
  settings: Settings,
  'share-2': Share2,
  'trash-2': Trash2,
};

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
  /** Lucide icon name in kebab-case. Must be registered in ICON_REGISTRY. */
  readonly name = input.required<string>();
  readonly size = input<IconSize>(16);
  readonly strokeWidth = input<number>(2);
  readonly ariaLabel = input<string | null>(null);

  readonly iconData = computed<LucideIconData>(() => {
    const data = ICON_REGISTRY[this.name()];
    if (!data) {
      throw new Error(
        `cdt-icon: unknown name '${this.name()}'. ` + `Add a named import for it in icon.component.ts's ICON_REGISTRY.`,
      );
    }
    return data;
  });
}
```

- [ ] **Step 2: Verify build**

```bash
npx nx run conduit:build
```

Expected: succeeds. No type errors.

- [ ] **Step 3: Sanity-check the import surface**

```bash
grep -E "^import" libs/ui/components/src/icon/icon.component.ts
```

Expected: exactly one import line from `lucide-angular`, listing the 9 named icons and `LucideAngularModule` / `LucideIconData`.

- [ ] **Step 4: Commit**

```bash
git add libs/ui/components/src/icon/icon.component.ts
git commit -m "refactor(ui): make cdt-icon tree-shakable via named icon imports"
```

---

## Task 2: Migrate every `<i class="ion-*">` to `<cdt-icon>`

Seven templates get touched. Every template swap follows the same pattern: remove the `<i class="ion-*">` element, drop in a `<cdt-icon name="…">` with the matching name from the Plan 3 mapping table.

**Mapping (reference):**

| ionicons class   | Lucide `cdt-icon` name |
| ---------------- | ---------------------- |
| `ion-heart`      | `heart`                |
| `ion-plus-round` | `plus`                 |
| `ion-gear-a`     | `settings`             |
| `ion-edit`       | `pencil`               |
| `ion-trash-a`    | `trash-2`              |
| `ion-pound`      | `hash`                 |
| `ion-compose`    | `pen-line`             |
| `ion-chatbubble` | `message-circle`       |
| `ion-share`      | `share-2`              |

**Files:**

- Modify: `apps/conduit/src/app/layout/navbar/navbar.component.html`
- Modify: `libs/home/feature-home/src/home.component.html`
- Modify: `libs/home/feature-home/src/home.component.ts`
- Modify: `libs/articles/feature-articles-list/src/article-list-item/article-list-item.component.html`
- Modify: `libs/articles/feature-articles-list/src/article-list-item/article-list-item.component.ts` (already imports AvatarComponent + TagChipComponent — add IconComponent too)
- Modify: `libs/articles/feature-article/src/article.component.ts`
- Modify: `libs/articles/feature-article/src/article.component.html`
- Modify: `libs/articles/feature-article/src/article-meta/article-meta.component.ts`
- Modify: `libs/articles/feature-article/src/article-meta/article-meta.component.html`
- Modify: `libs/articles/feature-article/src/article-comment/article-comment.component.ts`
- Modify: `libs/articles/feature-article/src/article-comment/article-comment.component.html`
- Modify: `libs/profile/feature-profile/src/profile.component.ts`
- Modify: `libs/profile/feature-profile/src/profile.component.html`

- [ ] **Step 1: Update `navbar.component.ts` imports**

Add `IconComponent` to the imports. Change the current imports line from `[RouterModule, AvatarComponent]` to `[RouterModule, AvatarComponent, IconComponent]`.

Add the import at the top (next to `AvatarComponent`):

```ts
import { AvatarComponent, IconComponent } from '@realworld/ui/components';
```

(Replace the existing single-name import of `AvatarComponent`.)

- [ ] **Step 2: Update `navbar.component.html`**

Find:

```html
<a class="nav-link" routerLink="/editor" routerLinkActive="active"> <i class="ion-compose"></i>&nbsp;New Post </a>
```

Replace with:

```html
<a class="nav-link" routerLink="/editor" routerLinkActive="active">
  <cdt-icon name="pen-line"></cdt-icon>&nbsp;New Post
</a>
```

Find:

```html
<a class="nav-link" routerLink="/settings" routerLinkActive="active"> <i class="ion-gear-a"></i>&nbsp;Settings </a>
```

Replace with:

```html
<a class="nav-link" routerLink="/settings" routerLinkActive="active">
  <cdt-icon name="settings"></cdt-icon>&nbsp;Settings
</a>
```

- [ ] **Step 3: Update `home.component.ts`**

Currently the imports are `[NgClass, TagsListComponent, ArticleListComponent]`. Add `IconComponent`:

```ts
imports: [NgClass, TagsListComponent, ArticleListComponent, IconComponent],
```

Add the import:

```ts
import { IconComponent } from '@realworld/ui/components';
```

- [ ] **Step 4: Update `home.component.html`**

Find:

```html
<li class="nav-item" [hidden]="!model.listConfig.filters.tag">
  <a class="nav-link active">
    <i class="ion-pound"></i>
    {{ model.listConfig.filters.tag }}
  </a>
</li>
```

Replace with:

```html
<li class="nav-item" [hidden]="!model.listConfig.filters.tag">
  <a class="nav-link active">
    <cdt-icon name="hash"></cdt-icon>
    {{ model.listConfig.filters.tag }}
  </a>
</li>
```

- [ ] **Step 5: Update `article-list-item.component.ts`**

Add `IconComponent` to imports. The current imports block is `[RouterModule, NgClass, DatePipe, AvatarComponent, TagChipComponent]`. Change to:

```ts
imports: [RouterModule, NgClass, DatePipe, AvatarComponent, TagChipComponent, IconComponent],
```

Update the `@realworld/ui/components` import to include `IconComponent`:

```ts
import { AvatarComponent, TagChipComponent, IconComponent, readingTimeMinutes } from '@realworld/ui/components';
```

- [ ] **Step 6: Update `article-list-item.component.html`**

Find:

```html
<i class="ion-heart"></i> {{ article().favoritesCount }}
```

Replace with:

```html
<cdt-icon name="heart"></cdt-icon> {{ article().favoritesCount }}
```

- [ ] **Step 7: Update `article.component.ts`**

The current imports block after Plan 2 is:

```ts
imports: [
  ArticleMetaComponent,
  ArticleCommentComponent,
  MarkdownPipe,
  AddCommentComponent,
  RouterLink,
  CommentSkeletonComponent,
],
```

Add `IconComponent`:

```ts
imports: [
  ArticleMetaComponent,
  ArticleCommentComponent,
  MarkdownPipe,
  AddCommentComponent,
  RouterLink,
  CommentSkeletonComponent,
  IconComponent,
],
```

Update the `@realworld/ui/components` import to include `IconComponent`:

```ts
import { CommentSkeletonComponent, IconComponent, readingTimeMinutes } from '@realworld/ui/components';
```

- [ ] **Step 8: Update `article.component.html`**

Three replacements in the side-rail.

Find:

```html
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
```

Replace with:

```html
<button
  type="button"
  class="rail-btn"
  [class.active]="article.favorited"
  (click)="onRailFavorite()"
  [attr.aria-pressed]="article.favorited"
  aria-label="Favorite article"
>
  <cdt-icon name="heart" [size]="18"></cdt-icon>
</button>
```

Find:

```html
<button type="button" class="rail-btn" (click)="onRailComment()" aria-label="Jump to comments">
  <i class="ion-chatbubble"></i>
</button>
```

Replace with:

```html
<button type="button" class="rail-btn" (click)="onRailComment()" aria-label="Jump to comments">
  <cdt-icon name="message-circle" [size]="18"></cdt-icon>
</button>
```

Find:

```html
<button type="button" class="rail-btn" (click)="onRailShare()" aria-label="Share article">
  <i class="ion-share"></i>
</button>
```

Replace with:

```html
<button type="button" class="rail-btn" (click)="onRailShare()" aria-label="Share article">
  <cdt-icon name="share-2" [size]="18"></cdt-icon>
</button>
```

- [ ] **Step 9: Update `article-meta.component.ts`**

The existing imports block is `[RouterModule, NgClass, DatePipe, AvatarComponent]`. Change to:

```ts
imports: [RouterModule, NgClass, DatePipe, AvatarComponent, IconComponent],
```

Update the `@realworld/ui/components` import:

```ts
import { AvatarComponent, IconComponent } from '@realworld/ui/components';
```

- [ ] **Step 10: Update `article-meta.component.html`**

Find:

```html
<a class="btn btn-sm btn-outline-secondary" [routerLink]="['/editor', article().slug]">
  <i class="ion-edit"></i> Edit Article
</a>
```

Replace with:

```html
<a class="btn btn-sm btn-outline-secondary" [routerLink]="['/editor', article().slug]">
  <cdt-icon name="pencil" [size]="14"></cdt-icon> Edit Article
</a>
```

Find:

```html
<button class="btn btn-sm btn-outline-danger" (click)="deleteArticle()">
  <i class="ion-trash-a"></i> Delete Article
</button>
```

Replace with:

```html
<button class="btn btn-sm btn-outline-danger" (click)="deleteArticle()">
  <cdt-icon name="trash-2" [size]="14"></cdt-icon> Delete Article
</button>
```

Find:

```html
<i class="ion-plus-round"></i> &nbsp; {{ article().author.following ? 'Unfollow' : 'Follow' }}
```

Replace with:

```html
<cdt-icon name="plus" [size]="14"></cdt-icon> &nbsp; {{ article().author.following ? 'Unfollow' : 'Follow' }}
```

Find:

```html
<i class="ion-heart"></i> &nbsp; {{ article().favorited ? 'Unfavorite' : 'Favorite' }} Post
```

Replace with:

```html
<cdt-icon name="heart" [size]="14"></cdt-icon> &nbsp; {{ article().favorited ? 'Unfavorite' : 'Favorite' }} Post
```

- [ ] **Step 11: Update `article-comment.component.ts`**

The existing imports block is `[DatePipe, RouterModule, AvatarComponent]`. Change to:

```ts
imports: [DatePipe, RouterModule, AvatarComponent, IconComponent],
```

Update the `@realworld/ui/components` import:

```ts
import { AvatarComponent, IconComponent } from '@realworld/ui/components';
```

- [ ] **Step 12: Update `article-comment.component.html`**

Find:

```html
<i class="ion-trash-a" (click)="delete.emit({ commentId: comment().id, slug: article().slug })"></i>
```

Replace with:

```html
<button
  type="button"
  class="comment-delete-btn"
  (click)="delete.emit({ commentId: comment().id, slug: article().slug })"
  aria-label="Delete comment"
>
  <cdt-icon name="trash-2" [size]="14"></cdt-icon>
</button>
```

The old `<i>` had a click handler, which is a poor accessibility pattern. Wrap the icon in a proper `<button>` so keyboard users can activate it. Add a simple style in the `_page-article.scss` partial so the button matches the previous icon-only presentation.

- [ ] **Step 13: Swap the dead `mod-options i` rules for `.comment-delete-btn` in `_page-article.scss`**

Open `apps/conduit/src/styles/layouts/_page-article.scss`. Find these two existing rules (ported over in the Task 9 fix of Plan 2):

```scss
.article-page .card .mod-options i {
  margin-left: var(--sp-4);
  opacity: 0.6;
  cursor: pointer;
}

.article-page .card .mod-options i:hover {
  opacity: 1;
}
```

These target the old `<i class="ion-trash-a">` element, which no longer exists. Replace both rules with the following:

```scss
.article-page .card .mod-options .comment-delete-btn {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  opacity: 0.6;
  padding: 0;
  margin-left: var(--sp-4);
  display: inline-flex;
  align-items: center;
  transition: opacity 150ms ease;
}

.article-page .card .mod-options .comment-delete-btn:hover {
  opacity: 1;
}
```

Leave the `.article-page .card .mod-options { float: right; … }` wrapper rule intact — it still applies to the `<span>` that contains the new button.

- [ ] **Step 14: Update `profile.component.ts`**

The existing imports block is `[RouterModule, NgClass, AvatarComponent]`. Change to:

```ts
imports: [RouterModule, NgClass, AvatarComponent, IconComponent],
```

Update the `@realworld/ui/components` import:

```ts
import { AvatarComponent, IconComponent } from '@realworld/ui/components';
```

- [ ] **Step 15: Update `profile.component.html`**

Find:

```html
<i class="ion-plus-round"></i> &nbsp; {{ $following() ? 'Unfollow' : 'Follow' }}
```

Replace with:

```html
<cdt-icon name="plus" [size]="14"></cdt-icon> &nbsp; {{ $following() ? 'Unfollow' : 'Follow' }}
```

Find:

```html
<i class="ion-gear-a"></i> Edit Profile Settings
```

Replace with:

```html
<cdt-icon name="settings" [size]="14"></cdt-icon> Edit Profile Settings
```

- [ ] **Step 16: Build + smoke-grep**

```bash
npx nx run conduit:build
```

Then confirm no `ion-*` classes remain in any template:

```bash
grep -rn "ion-" libs apps --include="*.html" | grep -v node_modules | grep -v ".spec.ts"
```

Expected: zero results (ignoring any `ion-` substrings that happen to appear inside words like `action-btn` — review each hit manually to confirm).

- [ ] **Step 17: Commit**

```bash
git add libs apps/conduit/src/app/layout/navbar/navbar.component.html apps/conduit/src/app/layout/navbar/navbar.component.ts apps/conduit/src/styles/layouts/_page-article.scss
git commit -m "feat(icons): migrate all ion-* classes to <cdt-icon>"
```

If prettier complains, run `npx prettier --write <paths>` and retry.

---

## Task 3: Remove the ionicons CDN link

With every `<i class="ion-*">` replaced, the external stylesheet is dead weight. Drop the `<link>`.

**Files:**

- Modify: `apps/conduit/src/index.html`

- [ ] **Step 1: Remove the ionicons `<link>`**

Open `apps/conduit/src/index.html`. Delete this line:

```html
<link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css" />
```

Leave every other `<link>` (Fraunces + Nunito Sans preconnect/stylesheet) intact.

- [ ] **Step 2: Serve the app and smoke-test**

```bash
npx nx run conduit:serve --port=4200 &
SERVER_PID=$!
sleep 12
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4200/)
HAS_IONICONS=$(curl -s http://localhost:4200/ | grep -c "ionicons" || true)
echo "HTTP: $STATUS / ionicons link references: $HAS_IONICONS"
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null
```

Expected: `HTTP: 200 / ionicons link references: 0`.

- [ ] **Step 3: Commit**

```bash
git add apps/conduit/src/index.html
git commit -m "chore: remove ionicons CDN link"
```

---

## Task 4: Polish — `--paper-translucent` token and `setTimeout` cleanup

Two small carry-forward items from the Plan 2 final review.

**Files:**

- Modify: `apps/conduit/src/styles/tokens/_colors.scss`
- Modify: `apps/conduit/src/styles/components/_nav.scss`
- Modify: `libs/articles/feature-article/src/article.component.ts`

- [ ] **Step 1: Add `--paper-translucent` to `_colors.scss`**

Open `apps/conduit/src/styles/tokens/_colors.scss`. In the `:root` block, after `--paper-sunken: #fff7f0;`, add:

```scss
--paper-translucent: rgba(255, 252, 247, 0.82);
```

In the `[data-theme='dark']` block, after `--paper-sunken: #22180f;`, add:

```scss
--paper-translucent: rgba(26, 20, 16, 0.82);
```

The rgba values are the same `--paper` hex at 82% alpha, kept in sync with the base palette.

- [ ] **Step 2: Use `--paper-translucent` in the navbar**

Open `apps/conduit/src/styles/components/_nav.scss`. Find:

```scss
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

Replace the two `background-color: rgba(…)` lines so the block reads:

```scss
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: var(--sp-12) var(--sp-16);
  background-color: var(--paper-translucent);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--border);
}
```

The `[data-theme='dark'] .navbar` override block can be deleted — the dark-mode token handles it.

- [ ] **Step 3: Clean up `setTimeout` in `onRailShare`**

Open `libs/articles/feature-article/src/article.component.ts`. Add a private field for the timer handle and clear it in `ngOnDestroy`.

Find the class property block (after the field declarations, before `ngOnInit`). The current signals are:

```ts
$readingTime = computed(() => readingTimeMinutes(this.$article.body()));

shareTooltip = signal<string | null>(null);
```

Add a timer field after `shareTooltip`:

```ts
$readingTime = computed(() => readingTimeMinutes(this.$article.body()));

shareTooltip = signal<string | null>(null);
private shareTimer: ReturnType<typeof setTimeout> | null = null;
```

Find the current `onRailShare`:

```ts
async onRailShare() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    this.shareTooltip.set('Link copied');
  } catch {
    this.shareTooltip.set('Copy failed');
  }
  setTimeout(() => this.shareTooltip.set(null), 2000);
}
```

Replace with:

```ts
async onRailShare() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    this.shareTooltip.set('Link copied');
  } catch {
    this.shareTooltip.set('Copy failed');
  }
  if (this.shareTimer) {
    clearTimeout(this.shareTimer);
  }
  this.shareTimer = setTimeout(() => {
    this.shareTooltip.set(null);
    this.shareTimer = null;
  }, 2000);
}
```

Update `ngOnDestroy`:

```ts
ngOnDestroy() {
  if (this.shareTimer) {
    clearTimeout(this.shareTimer);
    this.shareTimer = null;
  }
  this.articleStore.initializeArticle();
}
```

Leave every other method intact.

- [ ] **Step 4: Build**

```bash
npx nx run conduit:build
```

- [ ] **Step 5: Commit**

```bash
git add apps/conduit/src/styles/tokens/_colors.scss apps/conduit/src/styles/components/_nav.scss libs/articles/feature-article/src/article.component.ts
git commit -m "feat(polish): --paper-translucent token + cancel share timer on destroy"
```

---

## Task 5: 404 catch-all route

Add a small `cdt-not-found` component and wire it up to a wildcard `**` route. Same visual language as the rest of the redesign.

**Files:**

- Create: `apps/conduit/src/app/layout/not-found/not-found.component.ts`
- Create: `apps/conduit/src/app/layout/not-found/not-found.component.html`
- Modify: `apps/conduit/src/app/app.config.ts`

- [ ] **Step 1: Create folder**

```bash
mkdir -p apps/conduit/src/app/layout/not-found
```

- [ ] **Step 2: Write `apps/conduit/src/app/layout/not-found/not-found.component.ts`**

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cdt-not-found',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - 160px);
        padding: var(--sp-32) var(--sp-16);
      }
      .not-found {
        max-width: 560px;
        text-align: center;
      }
      .not-found h1 {
        font-family: var(--font-display);
        font-weight: 700;
        font-size: var(--fs-44);
        color: var(--ink-900);
        letter-spacing: -0.02em;
        margin-bottom: var(--sp-8);
      }
      .not-found p {
        font-family: var(--font-display);
        font-style: italic;
        font-size: var(--fs-18);
        color: var(--ink-500);
        margin-bottom: var(--sp-24);
      }
    `,
  ],
})
export class NotFoundComponent {}
```

- [ ] **Step 3: Write `apps/conduit/src/app/layout/not-found/not-found.component.html`**

```html
<div class="not-found">
  <h1>That page wandered off</h1>
  <p>We couldn't find what you were looking for.</p>
  <a class="btn btn-primary" routerLink="/">Back home</a>
</div>
```

- [ ] **Step 4: Wire the wildcard route into `app.config.ts`**

Open `apps/conduit/src/app/app.config.ts`. Find the existing `provideRouter([…])` call — there's an array of route objects. Add a final catch-all route object AFTER the existing `profile` route (or wherever the last route in the array is) but BEFORE the closing `]` of the `provideRouter` array:

```ts
{
  path: '**',
  loadComponent: () =>
    import('../app/layout/not-found/not-found.component').then((m) => m.NotFoundComponent),
},
```

The route order matters — `**` must be last so it only fires when nothing else matches.

- [ ] **Step 5: Verify build**

```bash
npx nx run conduit:build
```

- [ ] **Step 6: Smoke test**

```bash
npx nx run conduit:serve --port=4200 &
SERVER_PID=$!
sleep 12
# Root route returns 200 with app shell
ROOT=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4200/)
# Unknown path also returns 200 (SPA) — the NotFoundComponent renders client-side
UNKNOWN=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4200/this-route-does-not-exist)
echo "/ → $ROOT, /unknown → $UNKNOWN"
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null
```

Expected: both return `200` (Angular SPA serves index.html for any path; the 404 component renders client-side based on the routing match).

- [ ] **Step 7: Commit**

```bash
git add apps/conduit/src/app/layout/not-found/ apps/conduit/src/app/app.config.ts
git commit -m "feat(router): add 404 catch-all route with cdt-not-found component"
```

---

## Task 6: Final verification

**Files:** none (verification only).

- [ ] **Step 1: Lint**

```bash
npx nx affected -t lint 2>&1 | tail -20
```

Expected: all affected projects pass.

- [ ] **Step 2: Unit tests**

```bash
npx nx affected -t test 2>&1 | tail -20
```

Expected: `ui-components` (19 tests) + `core-theme` (12 tests) pass. Pre-existing `conduit:test` zone.js failure remains — unrelated to this plan.

- [ ] **Step 3: Production build + bundle size sanity check**

```bash
npx nx run conduit:build --configuration=production 2>&1 | tee /tmp/conduit-build.log | tail -20
```

Expected: succeeds. Note the reported bundle sizes for the initial chunk.

Optional deeper check — look at the Lucide contribution:

```bash
ls -lh dist/apps/conduit/*.js 2>/dev/null | head -10
```

The initial chunk (usually ~300–500KB gzipped for a modest Angular app) should not have grown due to icon-full imports. If a specific chunk spiked by hundreds of KB, Lucide may still be pulling the full map — inspect the diff in `lucide-angular` output and confirm the registry change took effect.

- [ ] **Step 4: Confirm no `ion-*` classes and no ionicons CDN remain**

```bash
grep -rn "ion-" libs apps --include="*.html" | grep -v node_modules | grep -v ".spec.ts" | grep -v "action-btn" || echo "OK — no ion-* classes left"
grep "ionicons\|code.ionicframework.com" apps/conduit/src/index.html || echo "OK — no ionicons references in index.html"
```

Expected output: "OK — no ion-\* classes left" and "OK — no ionicons references in index.html".

- [ ] **Step 5: e2e**

```bash
npx nx e2e conduit-e2e 2>&1 | tail -15
```

Expected: only the pre-existing `frontend:serve-static` config bug. All functional tests pass (the article title / body / testid expectations are still met).

- [ ] **Step 6: Manual smoke — every page in light and dark**

```bash
npx nx run conduit:serve --port=4200
```

Walk through:

1. `/` — home page. Tag chips and favorite heart icon render.
2. Click the heart on a card → toggles favorite state visually.
3. Click an article → article page loads. Side-rail shows heart + message-circle + share-2 icons. Click each — favorite toggles, comment jumps to section, share copies URL and shows toast.
4. `/editor` → edit icons show on the meta row when editing an existing article (verify via an existing article's edit path).
5. `/profile/<user>` → follow icon (plus) and settings icon (gear-equivalent) render.
6. `/settings` → theme toggle still works; Log out + Save changes buttons render.
7. `/some-random-path` → 404 page renders with "That page wandered off".
8. DevTools → Rendering → Emulate `prefers-color-scheme: dark` → every page flips smoothly. Navbar uses the dark translucent paper token.
9. DevTools → Network → filter by CSS → confirm no network request goes to `code.ionicframework.com`.

Stop the server with Ctrl+C.

- [ ] **Step 7: Commit anything that surfaced during verification**

If Steps 1–6 needed a fix, commit it now. If everything was clean, no commit required.

```bash
git status
# If clean: done.
# If fixes needed:
git add -A
git commit -m "chore: fix issues discovered in plan-3 verification"
```

---

## Done

Plan 3 is complete when Task 6 passes. At that point:

- Every `<i class="ion-*">` in the codebase has become `<cdt-icon name="…">`.
- The ionicons CDN link is gone from `index.html`.
- `cdt-icon` uses named Lucide imports — only the 9 icons we actually use ship in the bundle.
- The navbar's translucent background is token-driven via `--paper-translucent`.
- The article page's share timer is cleaned up on navigation away.
- An unknown route renders a small, on-brand 404 page with a "Back home" button.
- All e2e `data-testid` selectors still resolve (the icons were always cosmetic — no testids were on the `<i>` elements).

**The Conduit modernization is done.** Three plans shipped:

- Plan 1 — design tokens, SCSS architecture, ThemeService, shared UI components.
- Plan 2 — page redesigns across every route, navbar/footer, legacy removal.
- Plan 3 — icon migration, 404, polish.

Follow-ups beyond this plan (nothing blocking merge):

- Accessibility sweep with a screen reader or `axe-core` run — not in this plan's scope.
- Visual regression tests — not introduced; the project chose not to own a baseline.
- Profile page "articles count" reflecting the current tab rather than a user total — requires a RealWorld API extension.
