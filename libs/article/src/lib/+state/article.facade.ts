import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  AddComment,
  DeleteArticle,
  DeleteComment,
  Favorite,
  Follow,
  UnFavorite,
  UnFollow,
  LoadArticle,
  LoadComments
} from './article.actions';
import { ArticleState } from './article.reducer';
import { articleQuery } from './article.selectors';
import { InitializeArticle } from '@angular-ngrx-nx-realworld-example-app/editor/src/lib/+state/editor.actions';

@Injectable()
export class ArticleFacade {
  article$ = this.store.select(articleQuery.getArticleData);
  comments$ = this.store.select(articleQuery.getComments);
  articleLoaded$ = this.store.select(articleQuery.getArticleLoaded);
  authorUsername$ = this.store.select(articleQuery.getAuthorUsername);

  constructor(private store: Store<ArticleState>) {}

  loadArticle(slug: string) {
    this.store.dispatch(new LoadArticle(slug));
  }
  loadComments(slug: string) {
    this.store.dispatch(new LoadComments(slug));
  }
  follow(username: string) {
    this.store.dispatch(new Follow(username));
  }
  unfollow(username: string) {
    this.store.dispatch(new UnFollow(username));
  }
  favorite(slug: string) {
    this.store.dispatch(new Favorite(slug));
  }
  unfavorite(slug: string) {
    this.store.dispatch(new UnFavorite(slug));
  }
  delete(slug: string) {
    this.store.dispatch(new DeleteArticle(slug));
  }
  deleteComment(data: { commentId: number; slug: string }) {
    this.store.dispatch(new DeleteComment(data));
  }
  submit(slug: string) {
    this.store.dispatch(new AddComment(slug));
  }
  initializeArticle() {
    this.store.dispatch(new InitializeArticle());
  }
}
