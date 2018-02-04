import { ArticleListConfig, Articles } from './home.interfaces';
import { ArticleData } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

export interface SetListConfig {
	type: '[home] SET_LIST_CONFIG';
	payload: ArticleListConfig;
}

export interface LoadArticles {
	type: '[home] LOAD_ARTICLES';
}

export interface LoadArticlesSuccess {
	type: '[home] LOAD_ARTICLES_SUCCESS';
	payload: { articles: ArticleData[], articlesCount: number };
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

export interface Favorite {
	type: '[home] FAVORITE';
	payload: string;
}

export interface FavoriteSuccess {
	type: '[home] FAVORITE_SUCCESS';
	payload: ArticleData;
}

export interface FavoriteFail {
	type: '[home] FAVORITE_FAIL';
	payload: Error;
}

export interface UnFavorite {
	type: '[home] UNFAVORITE';
	payload: string;
}

export interface UnFavoriteSuccess {
	type: '[home] UNFAVORITE_SUCCESS';
	payload: ArticleData;
}

export interface UnFavoriteFail {
	type: '[home] UNFAVORITE_FAIL';
	payload: Error;
}

export type HomeAction =
	| SetListConfig
	| LoadArticles
	| LoadArticlesSuccess
	| LoadArticlesFail
	| LoadTags
	| LoadTagsSuccess
	| LoadTagsFail
	| Favorite
	| FavoriteSuccess
	| FavoriteFail
	| UnFavorite
	| UnFavoriteSuccess
	| UnFavoriteFail;
