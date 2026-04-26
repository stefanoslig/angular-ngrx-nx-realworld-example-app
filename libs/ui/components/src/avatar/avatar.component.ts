import { ChangeDetectionStrategy, Component, computed, HostBinding, input, signal } from '@angular/core';
import { getAvatarColor, getInitials } from './avatar.utils';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'cdt-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
