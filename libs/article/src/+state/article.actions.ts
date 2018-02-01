import { ArticleData, ArticleComment } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

export interface LoadArticle {
  type: '[article] LOAD_ARTICLE';
  payload: string;
}

export interface LoadArticleSuccess {
  type: '[article] LOAD_ARTICLE_SUCCESS';
  payload: ArticleData;
}

export interface LoadArticleFail {
  type: '[article] LOAD_ARTICLE_FAIL';
  payload: Error;
}

export interface LoadComments {
  type: '[article] LOAD_COMMENTS';
  payload: string;
}

export interface LoadCommentsSuccess {
  type: '[article] LOAD_COMMENTS_SUCCESS';
  payload: ArticleComment[];
}

export interface LoadCommentsFail {
  type: '[article] LOAD_COMMENTS_FAIL';
  payload: Error;
}

export type ArticleAction =
  | LoadArticle
  | LoadArticleSuccess
  | LoadArticleFail
  | LoadComments
  | LoadCommentsSuccess
  | LoadCommentsFail;
