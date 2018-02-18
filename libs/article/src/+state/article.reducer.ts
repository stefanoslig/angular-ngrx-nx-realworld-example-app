import { Article, ArticleState } from './article.interfaces';
import { ArticleAction } from './article.actions';
import { articleInitialState } from '@angular-ngrx-nx/article/src/+state/article.init';

export function articleReducer(state: Article = articleInitialState, action: ArticleAction): Article {
	switch (action.type) {
		case '[article] LOAD_ARTICLE_SUCCESS': {
			return { ...state, data: action.payload };
		}
		case '[article] LOAD_ARTICLE_FAIL': {
			return { ...state, data: articleInitialState.data };
		}
		case '[article] LOAD_COMMENTS_SUCCESS': {
			return { ...state, comments: action.payload };
		}
		case '[article] LOAD_COMMENTS_FAIL': {
			return { ...state, comments: articleInitialState.comments };
		}
		default: {
			return state;
		}
	}
}

export const getArticle = (state: ArticleState) => state.article.data;
export const getComments = (state: ArticleState) => state.article.comments;
