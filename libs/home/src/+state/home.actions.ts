import { ArticleListConfig, Article } from './home.interfaces';

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

export type HomeAction = SetListConfig | LoadArticles | LoadArticlesSuccess | LoadArticlesFail;
