import { Article, ArticleData } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

export interface PublishArticle {
  type: '[editor] PUBLISH_ARTICLE';
  payload: Article;
}

export interface LoadArticle {
  type: '[editor] LOAD_ARTICLE';
  payload: string;
}

export interface InitializeArticle {
  type: '[editor] INITIALIZE_ARTICLE';
}

export interface LoadArticleSuccess {
  type: '[editor] LOAD_ARTICLE_SUCCESS';
  payload: ArticleData;
}

export interface LoadArticleFail {
  type: '[editor] LOAD_ARTICLE_FAIL';
  payload: Error;
}

export type EditorAction = PublishArticle | LoadArticle | InitializeArticle | LoadArticleSuccess | LoadArticleFail;
