import { ListType, Filters, ArticleListConfig } from '@angular-ngrx-nx/article-list/src/+state/article-list.interfaces';
import { ArticleData } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

export interface SetListPage {
  type: '[article-list] SET_LIST_PAGE';
  payload: number;
}

export interface SetListConfig {
  type: '[article-list] SET_LIST_CONFIG';
  payload: ArticleListConfig;
}

export interface LoadArticles {
  type: '[article-list] LOAD_ARTICLES';
}

export interface LoadArticlesSuccess {
  type: '[article-list] LOAD_ARTICLES_SUCCESS';
  payload: { articles: ArticleData[]; articlesCount: number };
}

export interface LoadArticlesFail {
  type: '[article-list] LOAD_ARTICLES_FAIL';
  payload: Error;
}

export interface Favorite {
  type: '[article-list] FAVORITE';
  payload: string;
}

export interface FavoriteSuccess {
  type: '[article-list] FAVORITE_SUCCESS';
  payload: ArticleData;
}

export interface FavoriteFail {
  type: '[article-list] FAVORITE_FAIL';
  payload: Error;
}

export interface UnFavorite {
  type: '[article-list] UNFAVORITE';
  payload: string;
}

export interface UnFavoriteSuccess {
  type: '[article-list] UNFAVORITE_SUCCESS';
  payload: ArticleData;
}

export interface UnFavoriteFail {
  type: '[article-list] UNFAVORITE_FAIL';
  payload: Error;
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
