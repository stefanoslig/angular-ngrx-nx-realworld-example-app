import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { articleListQuery } from './article-list/article-list.selectors';

import * as ArticleActions from './article/article.actions';
import * as ArticlesActions from './articles.actions';
import * as ArticleListActions from './article-list/article-list.actions';
import * as ArticleEditActions from './article-edit/article-edit.actions';
import { articleQuery } from './article/article.selectors';
import { ArticleListConfig } from './article-list/article-list.reducer';

@Injectable({ providedIn: 'root' })
export class ArticlesFacade {
  article$ = this.store.select(articleQuery.selectData);
  comments$ = this.store.select(articleQuery.selectComments);
  articleLoaded$ = this.store.select(articleQuery.selectLoaded);
  authorUsername$ = this.store.select(articleQuery.getAuthorUsername);
  listConfig$ = this.store.select(articleListQuery.selectListConfig);
  articles$ = this.store.select(articleListQuery.selectArticleEntities);
  isLoading$ = this.store.select(articleListQuery.isLoading);
  articlesCount$ = this.store.select(articleListQuery.selectArticlesCount);
  totalPages$ = this.store.select(articleListQuery.selectTotalPages);

  constructor(private store: Store) {}

  loadArticle(slug: string) {
    this.store.dispatch(ArticleActions.loadArticle({ slug }));
  }
  loadComments(slug: string) {
    this.store.dispatch(ArticleActions.loadComments({ slug }));
  }
  follow(username: string) {
    this.store.dispatch(ArticleActions.follow({ username }));
  }
  unfollow(username: string) {
    this.store.dispatch(ArticleActions.unFollow({ username }));
  }
  favorite(slug: string) {
    this.store.dispatch(ArticlesActions.favorite({ slug }));
  }
  unfavorite(slug: string) {
    this.store.dispatch(ArticlesActions.unFavorite({ slug }));
  }
  delete(slug: string) {
    this.store.dispatch(ArticleActions.deleteArticle({ slug }));
  }
  deleteComment(data: { commentId: number; slug: string }) {
    this.store.dispatch(ArticleActions.deleteComment(data));
  }
  submit(slug: string) {
    this.store.dispatch(ArticleActions.addComment({ slug }));
  }
  initializeArticle() {
    this.store.dispatch(ArticleActions.initializeArticle());
  }
  setPage(page: number) {
    this.store.dispatch(ArticleListActions.setListPage({ page }));
  }
  setListConfig(config: ArticleListConfig) {
    this.store.dispatch(ArticleListActions.setListConfig({ config }));
  }
  publishArticle() {
    this.store.dispatch(ArticleEditActions.publishArticle());
  }
}
