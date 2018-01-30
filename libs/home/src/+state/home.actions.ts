import { ArticleListConfig } from './home.interfaces';
import { Article } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

export interface SetListConfig {
  type: '[home] SET_LIST_CONFIG';
  payload: ArticleListConfig;
}

export interface LoadArticles {
  type: '[home] LOAD_ARTICLES';
}

export interface LoadArticlesSuccess {
  type: '[home] LOAD_ARTICLES_SUCCESS';
  payload: Article[];
}

export interface LoadArticlesFail {
  type: '[home] LOAD_ARTICLES_FAIL';
  payload: Error;
}

export interface LoadTags {
  type: '[home] LOAD_TAGS';
}

export interface LoadTagsSuccess {
  type: '[home] LOAD_TAGS_SUCCESS';
  payload: string[];
}

export interface LoadTagsFail {
  type: '[home] LOAD_TAGS_FAIL';
  payload: Error;
}

export type HomeAction =
  | SetListConfig
  | LoadArticles
  | LoadArticlesSuccess
  | LoadArticlesFail
  | LoadTags
  | LoadTagsSuccess
  | LoadTagsFail;
