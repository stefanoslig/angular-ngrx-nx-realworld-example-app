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
