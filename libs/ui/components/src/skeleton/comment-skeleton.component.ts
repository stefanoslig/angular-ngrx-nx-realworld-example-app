import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonComponent } from './skeleton.component';

@Component({
  selector: 'cdt-comment-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SkeletonComponent],
  template: `
    <div class="comment-skeleton">
      <div class="body">
        <cdt-skeleton width="100%" height="0.9em"></cdt-skeleton>
        <cdt-skeleton width="80%" height="0.9em"></cdt-skeleton>
      </div>
      <div class="meta">
        <cdt-skeleton width="20px" height="20px" radius="50%"></cdt-skeleton>
        <cdt-skeleton width="100px" height="0.7em"></cdt-skeleton>
        <cdt-skeleton width="60px" height="0.7em"></cdt-skeleton>
      </div>
    </div>
  `,
  styles: [
    `
      .comment-skeleton {
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        padding: 1rem;
        margin-bottom: 0.75rem;
      }
      .body {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        margin-bottom: 0.8rem;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid var(--border);
      }
      .meta {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    `,
  ],
})
export class CommentSkeletonComponent {}
