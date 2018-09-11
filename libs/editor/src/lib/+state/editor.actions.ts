import { Action } from '@ngrx/store';
import { ArticleData } from '@angular-ngrx-nx-realworld-example-app/api';

export enum EditorActionsType {
  PUBLISH_ARTICLE = '[editor] PUBLISH_ARTICLE',
  LOAD_ARTICLE = '[editor] LOAD_ARTICLE',
  INITIALIZE_ARTICLE = '[editor] INITIALIZE_ARTICLE',
  LOAD_ARTICLE_SUCCESS = '[editor] LOAD_ARTICLE_SUCCESS',
  LOAD_ARTICLE_FAIL = '[editor] LOAD_ARTICLE_FAIL'
}

export class PublishArticle implements Action {
  readonly type = EditorActionsType.PUBLISH_ARTICLE;
}

export class LoadArticle implements Action {
  readonly type = EditorActionsType.LOAD_ARTICLE;
  constructor(public payload: string) {}
}

export class InitializeArticle implements Action {
  readonly type = EditorActionsType.INITIALIZE_ARTICLE;
}

export class LoadArticleSuccess implements Action {
  readonly type = EditorActionsType.LOAD_ARTICLE_SUCCESS;
  constructor(public payload: ArticleData) {}
}

export class LoadArticleFail implements Action {
  readonly type = EditorActionsType.LOAD_ARTICLE_FAIL;
  constructor(public payload: Error) {}
}

export type EditorAction = PublishArticle | LoadArticle | InitializeArticle | LoadArticleSuccess | LoadArticleFail;
