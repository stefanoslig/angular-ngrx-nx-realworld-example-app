import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  CirclePlus,
  Hash,
  Heart,
  LucideAngularModule,
  LucideIconData,
  Pencil,
  Settings,
  SquarePen,
  Trash2,
} from 'lucide-angular';

export const Icon = {
  CirclePlus,
  Hash,
  Heart,
  Pencil,
  Settings,
  SquarePen,
  Trash2,
} as const;

@Component({
  selector: 'cdt-icon',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<lucide-angular [img]="name()" [size]="size()"></lucide-angular>`,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      vertical-align: -0.2em;
      line-height: 0;
      color: currentColor;
    }
  `,
})
export class IconComponent {
  name = input.required<LucideIconData>();
  size = input<number>(16);
}
