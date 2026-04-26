import { ChangeDetectionStrategy, Component, HostBinding, input, output } from '@angular/core';

export type TagChipVariant = 'default' | 'outline';

@Component({
  selector: 'cdt-tag-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span>{{ tag() }}</span
    ><ng-content></ng-content>`,
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
