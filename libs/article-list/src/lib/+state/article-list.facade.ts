import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ArticleListState, ArticleListConfig } from './article-list.reducer';
import { articleListQuery } from './article-list.selectors';
import * as ArticleListActions from './article-list.actions';
import { withLatestFrom, map } from 'rxjs/operators';
import { go } from '@angular-ngrx-nx-realworld-example-app/ngrx-router';
@Injectable()
export class ArticleListFacade {
  articles$ = this.store.select(articleListQuery.getArticles);
  listConfig$ = this.store.select(articleListQuery.getListConfig);
  isLoading$ = this.store.select(articleListQuery.isLoading);
  articlesCount$ = this.store.select(articleListQuery.getArticlesCount);
  totalPages$ = this.articlesCount$.pipe(
    withLatestFrom(this.listConfig$),
    map(([articlesCount, config]) => {
      return Array.from(new Array(Math.ceil(articlesCount / config.filters.limit)), (val, index) => index + 1);
    }),
  );

  constructor(private store: Store<ArticleListState>) {}

  favorite(slug: string) {
    this.store.dispatch(ArticleListActions.favorite({ slug }));
  }

  unFavorite(slug: string) {
    this.store.dispatch(ArticleListActions.unFavorite({ slug }));
  }

  navigateToArticle(slug: string) {
    this.store.dispatch(go({ to: { path: ['/article', slug] } }));
  }

  setPage(page: number) {
    this.store.dispatch(ArticleListActions.setListPage({ page }));
  }

  setListConfig(config: ArticleListConfig) {
    this.store.dispatch(ArticleListActions.setListConfig({ config }));
  }
}
