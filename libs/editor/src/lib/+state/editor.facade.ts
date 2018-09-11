import { ArticleData } from '@angular-ngrx-nx-realworld-example-app/api';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { InitializeArticle, LoadArticle, LoadArticleFail, LoadArticleSuccess, PublishArticle } from './editor.actions';
import { EditorState } from './editor.reducer';
import { editorQuery } from './editor.selectors';

@Injectable()
export class EditorFacade {
  article$ = this.store.select(editorQuery.getArticle);

  constructor(private store: Store<EditorState>) {}

  loadArticle(slug: string) {
    this.store.dispatch(new LoadArticle(slug));
  }

  loadArticleSuccess(results: ArticleData) {
    this.store.dispatch(new LoadArticleSuccess(results));
  }

  loadArticleFail(error: Error) {
    this.store.dispatch(new LoadArticleFail(error));
  }

  publishArticle() {
    this.store.dispatch(new PublishArticle());
  }

  initializeArticle() {
    this.store.dispatch(new InitializeArticle());
  }
}
