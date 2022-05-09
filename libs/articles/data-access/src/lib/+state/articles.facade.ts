import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { articleListQuery } from './article-list/article-list.selectors';

import { articleActions } from './article/article.actions';
import { articlesActions } from './articles.actions';
import { articleListActions } from './article-list/article-list.actions';
import { articleEditActions } from './article-edit/article-edit.actions';
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
    this.store.dispatch(articleActions.loadArticle({ slug }));
  }
  loadComments(slug: string) {
    this.store.dispatch(articleActions.loadComments({ slug }));
  }
  follow(username: string) {
    this.store.dispatch(articleActions.follow({ username }));
  }
  unfollow(username: string) {
    this.store.dispatch(articleActions.unfollow({ username }));
  }
  favorite(slug: string) {
    this.store.dispatch(articlesActions.favorite({ slug }));
  }
  unfavorite(slug: string) {
    this.store.dispatch(articlesActions.unfavorite({ slug }));
  }
  delete(slug: string) {
    this.store.dispatch(articleActions.deleteArticle({ slug }));
  }
  deleteComment(data: { commentId: number; slug: string }) {
    this.store.dispatch(articleActions.deleteComment(data));
  }
  submit(slug: string) {
    this.store.dispatch(articleActions.addComment({ slug }));
  }
  initializeArticle() {
    this.store.dispatch(articleActions.initializeArticle());
  }
  setPage(page: number) {
    this.store.dispatch(articleListActions.setListPage({ page }));
  }
  setListConfig(config: ArticleListConfig) {
    this.store.dispatch(articleListActions.setListConfig({ config }));
  }
  publishArticle() {
    this.store.dispatch(articleEditActions.publishArticle());
  }
}
