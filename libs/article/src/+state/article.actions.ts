import { Article } from "@angular-ngrx-nx/article/src/+state/article.interfaces";

export interface LoadArticle {
	type: '[article] LOAD_ARTICLE';
	payload: string;
}

export interface LoadArticleSuccess {
	type: '[article] LOAD_ARTICLE_SUCCESS';
	payload: Article;
}

export interface LoadArticleFail {
	type: '[article] LOAD_ARTICLE_FAIL';
	payload: Error;
}

export type ArticleAction = LoadArticle | LoadArticleSuccess | LoadArticleFail;
