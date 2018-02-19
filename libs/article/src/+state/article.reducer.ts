import { Article, ArticleState, ArticleData, ArticleComment } from './article.interfaces';
import { ArticleAction } from './article.actions';
import { articleInitialState } from '@angular-ngrx-nx/article/src/+state/article.init';

export function articleReducer(state: Article = articleInitialState, action: ArticleAction): Article {
	switch (action.type) {
		case '[article] LOAD_ARTICLE_SUCCESS': {
			return { ...state, data: action.payload, loaded: true, loading: false };
		}
		case '[article] LOAD_ARTICLE_FAIL': {
			return { ...state, data: articleInitialState.data, loaded: false, loading: false };
		}
		case '[article] DELETE_COMMENT_SUCCESS': {
			const comments: ArticleComment[] = state.comments.filter(item => item.id !== action.payload)
			return { ...state, comments };
		}
		case '[article] INITIALIZE_ARTICLE': {
			return articleInitialState;
		}
		case '[article] DELETE_ARTICLE_FAIL': {
			return articleInitialState;
		}
		case '[article] LOAD_COMMENTS_SUCCESS': {
			return { ...state, comments: action.payload };
		}
		case '[article] LOAD_COMMENTS_FAIL': {
			return { ...state, comments: articleInitialState.comments };
		}
		case '[article] FOLLOW_SUCCESS':
		case '[article] UNFOLLOW_SUCCESS': {
			const data: ArticleData = { ...state.data, author: action.payload }
			return { ...state, data };
		}
		case '[article] FAVORITE_SUCCESS':
		case '[article] UNFAVORITE_SUCCESS': {
			return { ...state, data: action.payload };
		}
		default: {
			return state;
		}
	}
}

export const getArticle = (state: ArticleState) => state.article.data;
export const getComments = (state: ArticleState) => state.article.comments;
export const getArticleLoaded = (state: ArticleState) => state.article.loaded;