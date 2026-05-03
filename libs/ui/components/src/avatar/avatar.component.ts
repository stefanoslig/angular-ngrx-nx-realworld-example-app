import { ChangeDetectionStrategy, Component, HostBinding, computed, input, signal } from '@angular/core';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'cdt-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  src = input<string | null | undefined>(null);
  username = input.required<string>();
  size = input<AvatarSize>('md');

  private imageBroken = signal(false);

  showImage = computed(() => {
    const s = this.src();
    return !!s && !this.imageBroken();
  });

  initials = computed(() => {
    const name = (this.username() || '').trim();
    if (!name) return '?';
    if (name.includes(' ')) {
      const [first, ...rest] = name.split(/\s+/);
      const last = rest[rest.length - 1] ?? '';
      return ((first.charAt(0) || '') + (last.charAt(0) || '')).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  });

  @HostBinding('attr.aria-label')
  get ariaLabel(): string {
    return this.username();
  }

  onLoad(): void {
    this.imageBroken.set(false);
  }

  onError(): void {
    this.imageBroken.set(true);
  }
}
