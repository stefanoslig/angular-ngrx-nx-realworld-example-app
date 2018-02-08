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

export interface Favorite {
  type: '[article] FAVORITE';
  payload: string;
}

export interface FavoriteSuccess {
  type: '[article] FAVORITE_SUCCESS';
  payload: ArticleData;
}

export interface FavoriteFail {
  type: '[article] FAVORITE_FAIL';
  payload: Error;
}

export interface UnFavorite {
  type: '[article] UNFAVORITE';
  payload: string;
}

export interface UnFavoriteSuccess {
  type: '[article] UNFAVORITE_SUCCESS';
  payload: ArticleData;
}

export interface UnFavoriteFail {
  type: '[article] UNFAVORITE_FAIL';
  payload: Error;
}

export interface Follow {
  type: '[article] FOLLOW';
  payload: string;
}

export interface FollowSuccess {
  type: '[article] FOLLOW_SUCCESS';
  payload: ArticleData;
}

export interface FollowFail {
  type: '[article] FOLLOW_FAIL';
  payload: Error;
}

export interface UnFollow {
  type: '[article] UNFOLLOW';
  payload: string;
}

export interface UnFollowSuccess {
  type: '[article] UNFOLLOW_SUCCESS';
  payload: ArticleData;
}

export interface UnFollowFail {
  type: '[article] UNFOLLOW_FAIL';
  payload: Error;
}

export type ArticleAction =
  | LoadArticle
  | LoadArticleSuccess
  | LoadArticleFail
  | LoadComments
  | LoadCommentsSuccess
  | LoadCommentsFail
  | Favorite
  | FavoriteSuccess
  | FavoriteFail
  | UnFavorite
  | UnFavoriteSuccess
  | UnFavoriteFail
  | Follow
  | FollowSuccess
  | FollowFail
  | UnFollow
  | UnFollowSuccess
  | UnFollowFail;
