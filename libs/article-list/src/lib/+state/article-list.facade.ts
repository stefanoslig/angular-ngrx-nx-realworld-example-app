import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ArticleListState, ArticleListConfig } from './article-list.reducer';
import { articleListQuery } from './article-list.selectors';
import { Favorite, UnFavorite, SetListPage, SetListConfig } from './article-list.actions';
import { withLatestFrom, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    })
  );

  constructor(private store: Store<ArticleListState>) {}

  favorite(slug: string) {
    this.store.dispatch(new Favorite(slug));
  }

  unFavorite(slug: string) {
    this.store.dispatch(new UnFavorite(slug));
  }

  navigateToArticle(slug: string) {
    this.store.dispatch({ type: '[router] Go', payload: { path: ['/article', slug] } });
  }

  setPage(page: number) {
    this.store.dispatch(new SetListPage(page));
  }

  setListConfig(config: ArticleListConfig) {
    this.store.dispatch(new SetListConfig(config));
  }
}
