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
