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
