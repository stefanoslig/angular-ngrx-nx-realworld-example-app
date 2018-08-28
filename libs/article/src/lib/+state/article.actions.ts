import { Action } from '@ngrx/store';
import { ArticleData, ArticleComment, Profile } from '@angular-ngrx-nx-realworld-example-app/api';

export enum ArticleActionTypes {
  LOAD_ARTICLE = '[article] LOAD_ARTICLE',
  LOAD_ARTICLE_SUCCESS = '[article] LOAD_ARTICLE_SUCCESS',
  LOAD_ARTICLE_FAIL = '[article] LOAD_ARTICLE_FAIL',
  DELETE_ARTICLE = '[article] DELETE_ARTICLE',
  DELETE_ARTICLE_FAIL = '[article] DELETE_ARTICLE_FAIL',
  INITIALIZE_ARTICLE = '[article] INITIALIZE_ARTICLE',
  LOAD_COMMENTS = '[article] LOAD_COMMENTS',
  LOAD_COMMENTS_SUCCESS = '[article] LOAD_COMMENTS_SUCCESS',
  LOAD_COMMENTS_FAIL = '[article] LOAD_COMMENTS_FAIL',
  FAVORITE = '[article] FAVORITE',
  FAVORITE_SUCCESS = '[article] FAVORITE_SUCCESS',
  FAVORITE_FAIL = '[article] FAVORITE_FAIL',
  UNFAVORITE = '[article] UNFAVORITE',
  UNFAVORITE_SUCCESS = '[article] UNFAVORITE_SUCCESS',
  UNFAVORITE_FAIL = '[article] UNFAVORITE_FAIL',
  FOLLOW = '[article] FOLLOW',
  FOLLOW_SUCCESS = '[article] FOLLOW_SUCCESS',
  FOLLOW_FAIL = '[article] FOLLOW_FAIL',
  UNFOLLOW = '[article] UNFOLLOW',
  UNFOLLOW_SUCCESS = '[article] UNFOLLOW_SUCCESS',
  UNFOLLOW_FAIL = '[article] UNFOLLOW_FAIL',
  ADD_COMMENT = '[article] ADD_COMMENT',
  ADD_COMMENT_FAIL = '[article] ADD_COMMENT_FAIL',
  ADD_COMMENT_SUCCESS = '[article] ADD_COMMENT_SUCCESS',
  DELETE_COMMENT = '[article] DELETE_COMMENT',
  DELETE_COMMENT_FAIL = '[article] DELETE_COMMENT_FAIL',
  DELETE_COMMENT_SUCCESS = '[article] DELETE_COMMENT_SUCCESS'
}

export class LoadArticle implements Action {
  readonly type = ArticleActionTypes.LOAD_ARTICLE;
  constructor(public payload: string) {}
}

export class LoadArticleSuccess implements Action {
  readonly type = ArticleActionTypes.LOAD_ARTICLE_SUCCESS;
  constructor(public payload: ArticleData) {}
}

export class LoadArticleFail implements Action {
  readonly type = ArticleActionTypes.LOAD_ARTICLE_FAIL;
  constructor(public payload: Error) {}
}

export class DeleteArticle implements Action {
  readonly type = ArticleActionTypes.DELETE_ARTICLE;
  constructor(public payload: string) {}
}

export class DeleteArticleFail implements Action {
  readonly type = ArticleActionTypes.DELETE_ARTICLE_FAIL;
  constructor(public payload: Error) {}
}

export class InitializeArticle implements Action {
  readonly type = ArticleActionTypes.INITIALIZE_ARTICLE;
}

export class LoadComments implements Action {
  readonly type = ArticleActionTypes.LOAD_COMMENTS;
  constructor(public payload: string) {}
}

export class LoadCommentsSuccess implements Action {
  readonly type = ArticleActionTypes.LOAD_COMMENTS_SUCCESS;
  constructor(public payload: ArticleComment[]) {}
}

export class LoadCommentsFail implements Action {
  readonly type = ArticleActionTypes.LOAD_COMMENTS_FAIL;
  constructor(public payload: Error) {}
}

export class Favorite implements Action {
  readonly type = ArticleActionTypes.FAVORITE;
  constructor(public payload: string) {}
}

export class FavoriteSuccess implements Action {
  readonly type = ArticleActionTypes.FAVORITE_SUCCESS;
  constructor(public payload: ArticleData) {}
}

export class FavoriteFail implements Action {
  readonly type = ArticleActionTypes.FAVORITE_FAIL;
  constructor(public payload: Error) {}
}

export class UnFavorite implements Action {
  readonly type = ArticleActionTypes.UNFAVORITE;
  constructor(public payload: string) {}
}

export class UnFavoriteSuccess implements Action {
  readonly type = ArticleActionTypes.UNFAVORITE_SUCCESS;
  constructor(public payload: ArticleData) {}
}

export class UnFavoriteFail implements Action {
  readonly type = ArticleActionTypes.UNFAVORITE_FAIL;
  constructor(public payload: Error) {}
}

export class Follow implements Action {
  readonly type = ArticleActionTypes.FOLLOW;
  constructor(public payload: string) {}
}

export class FollowSuccess implements Action {
  readonly type = ArticleActionTypes.FOLLOW_SUCCESS;
  constructor(public payload: Profile) {}
}

export class FollowFail implements Action {
  readonly type = ArticleActionTypes.FOLLOW_FAIL;
  constructor(public payload: Error) {}
}

export class UnFollow implements Action {
  readonly type = ArticleActionTypes.UNFOLLOW;
  constructor(public payload: string) {}
}

export class UnFollowSuccess implements Action {
  readonly type = ArticleActionTypes.UNFOLLOW_SUCCESS;
  constructor(public payload: Profile) {}
}

export class UnFollowFail implements Action {
  readonly type = ArticleActionTypes.UNFOLLOW_FAIL;
  constructor(public payload: Error) {}
}

export class AddComment implements Action {
  readonly type = ArticleActionTypes.ADD_COMMENT;
  constructor(public payload: string) {}
}

export class AddCommentFail implements Action {
  readonly type = ArticleActionTypes.ADD_COMMENT_FAIL;
  constructor(public payload: Error) {}
}

export class AddCommentSuccess implements Action {
  readonly type = ArticleActionTypes.ADD_COMMENT_SUCCESS;
  constructor(public payload: ArticleComment) {}
}

export class DeleteComment implements Action {
  readonly type = ArticleActionTypes.DELETE_COMMENT;
  constructor(public payload: { commentId: number; slug: string }) {}
}

export class DeleteCommentFail implements Action {
  readonly type = ArticleActionTypes.DELETE_COMMENT_FAIL;
  constructor(public payload: Error) {}
}

export class DeleteCommentSuccess implements Action {
  readonly type = ArticleActionTypes.DELETE_COMMENT_SUCCESS;
  constructor(public payload: number) {}
}

export type ArticleAction =
  | InitializeArticle
  | LoadArticle
  | LoadArticleSuccess
  | LoadArticleFail
  | DeleteComment
  | DeleteCommentFail
  | DeleteCommentSuccess
  | DeleteArticle
  | DeleteArticleFail
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
  | UnFollowFail
  | AddComment
  | AddCommentFail
  | AddCommentSuccess;
