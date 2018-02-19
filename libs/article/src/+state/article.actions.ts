import { ArticleData, ArticleComment } from '@angular-ngrx-nx/article/src/+state/article.interfaces';
import { Profile } from '@angular-ngrx-nx/profile/src/+state/profile.interfaces';

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

export interface DeleteArticle {
	type: '[article] DELETE_ARTICLE';
	payload: string;
}

export interface DeleteArticleFail {
	type: '[article] DELETE_ARTICLE_FAIL';
	payload: Error;
}

export interface InitializeArticle {
	type: '[article] INITIALIZE_ARTICLE';
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
	payload: Profile;
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
	payload: Profile;
}

export interface UnFollowFail {
	type: '[article] UNFOLLOW_FAIL';
	payload: Error;
}

export interface DeleteComment {
	type: '[article] DELETE_COMMENT';
	payload: { commentId: number, slug: string };
}

export interface DeleteCommentFail {
	type: '[article] DELETE_COMMENT_FAIL';
	payload: Error;
}

export interface DeleteCommentSuccess {
	type: '[article] DELETE_COMMENT_SUCCESS';
	payload: number
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
	| UnFollowFail;
