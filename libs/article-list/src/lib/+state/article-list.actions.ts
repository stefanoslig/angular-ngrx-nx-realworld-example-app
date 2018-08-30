import { ArticleData } from '@angular-ngrx-nx-realworld-example-app/api';
import { Action } from '@ngrx/store';

import { ArticleListConfig } from './article-list.reducer';

export enum ArticleListActionTypes {
  SET_LIST_PAGE = '[article-list] SET_LIST_PAGE',
  SET_LIST_CONFIG = '[article-list] SET_LIST_CONFIG',
  LOAD_ARTICLES = '[article-list] LOAD_ARTICLES',
  LOAD_ARTICLES_SUCCESS = '[article-list] LOAD_ARTICLES_SUCCESS',
  LOAD_ARTICLES_FAIL = '[article-list] LOAD_ARTICLES_FAIL',
  FAVORITE = '[article-list] FAVORITE',
  FAVORITE_SUCCESS = '[article-list] FAVORITE_SUCCESS',
  FAVORITE_FAIL = '[article-list] FAVORITE_FAIL',
  UNFAVORITE = '[article-list] UNFAVORITE',
  UNFAVORITE_SUCCESS = '[article-list] UNFAVORITE_SUCCESS',
  UNFAVORITE_FAIL = '[article-list] UNFAVORITE_FAIL'
}

export class SetListPage implements Action {
  readonly type = '[article-list] SET_LIST_PAGE';
  constructor(public payload: number) {}
}

export class SetListConfig implements Action {
  readonly type = '[article-list] SET_LIST_CONFIG';
  constructor(public payload: ArticleListConfig) {}
}

export class LoadArticles implements Action {
  readonly type = '[article-list] LOAD_ARTICLES';
  constructor() {}
}

export class LoadArticlesSuccess implements Action {
  readonly type = '[article-list] LOAD_ARTICLES_SUCCESS';
  constructor(public payload: { articles: ArticleData[]; articlesCount: number }) {}
}

export class LoadArticlesFail implements Action {
  readonly type = '[article-list] LOAD_ARTICLES_FAIL';
  constructor(public payload: Error) {}
}

export class Favorite implements Action {
  readonly type = '[article-list] FAVORITE';
  constructor(public payload: string) {}
}

export class FavoriteSuccess implements Action {
  readonly type = '[article-list] FAVORITE_SUCCESS';
  constructor(public payload: ArticleData) {}
}

export class FavoriteFail implements Action {
  readonly type = '[article-list] FAVORITE_FAIL';
  constructor(public payload: Error) {}
}

export class UnFavorite implements Action {
  readonly type = '[article-list] UNFAVORITE';
  constructor(public payload: string) {}
}

export class UnFavoriteSuccess implements Action {
  readonly type = '[article-list] UNFAVORITE_SUCCESS';
  constructor(public payload: ArticleData) {}
}

export class UnFavoriteFail implements Action {
  readonly type = '[article-list] UNFAVORITE_FAIL';
  constructor(public payload: Error) {}
}

export type ArticleListAction =
  | SetListPage
  | SetListConfig
  | LoadArticles
  | LoadArticlesSuccess
  | LoadArticlesFail
  | Favorite
  | FavoriteSuccess
  | FavoriteFail
  | UnFavorite
  | UnFavoriteSuccess
  | UnFavoriteFail;
