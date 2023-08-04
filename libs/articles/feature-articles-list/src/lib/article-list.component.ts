import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { articleListActions, articleListQuery, articlesActions } from '@realworld/articles/data-access';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import { PagerComponent } from '@realworld/ui/components';

@Component({
  selector: 'cdt-article-list',
  standalone: true,
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  imports: [CommonModule, ArticleListItemComponent, PagerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent {
  totalPages$ = this.store.select(articleListQuery.selectTotalPages);
  articles$ = this.store.select(articleListQuery.selectArticleEntities);
  listConfig$ = this.store.select(articleListQuery.selectListConfig);
  isLoading$ = this.store.select(articleListQuery.isLoading);

  constructor(private readonly store: Store, private readonly router: Router) {}

  favorite(slug: string) {
    this.store.dispatch(articlesActions.favorite({ slug }));
  }

  unFavorite(slug: string) {
    this.store.dispatch(articlesActions.unfavorite({ slug }));
  }

  navigateToArticle(slug: string) {
    this.router.navigate(['/article', slug]);
  }

  setPage(page: number) {
    this.store.dispatch(articleListActions.setListPage({ page }));
  }
}
