import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonComponent } from './skeleton.component';
import { ArticleMetaSkeletonComponent } from './article-meta-skeleton.component';

@Component({
  selector: 'cdt-article-card-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SkeletonComponent, ArticleMetaSkeletonComponent],
  template: `
    <div class="card-skeleton">
      <cdt-article-meta-skeleton></cdt-article-meta-skeleton>
      <cdt-skeleton width="80%" height="1.4em" radius="6px"></cdt-skeleton>
      <cdt-skeleton width="100%" height="0.9em"></cdt-skeleton>
      <cdt-skeleton width="60%" height="0.9em"></cdt-skeleton>
      <div class="tags">
        <cdt-skeleton width="60px" height="1.2em" radius="999px"></cdt-skeleton>
        <cdt-skeleton width="80px" height="1.2em" radius="999px"></cdt-skeleton>
      </div>
    </div>
  `,
  styles: [
    `
      .card-skeleton {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        padding: 1.2rem 0;
        border-top: 1px solid var(--border);
      }
      .tags {
        display: flex;
        gap: 0.4rem;
        margin-top: 0.4rem;
      }
    `,
  ],
})
export class ArticleCardSkeletonComponent {}
