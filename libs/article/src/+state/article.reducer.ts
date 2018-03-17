import { Article, ArticleState, ArticleData, ArticleComment } from './article.interfaces';
import { ArticleAction, ArticleActionTypes } from './article.actions';
import { articleInitialState } from './article.init';

export function articleReducer(state: Article = articleInitialState, action: ArticleAction): Article {
	switch (action.type) {
		case ArticleActionTypes.LOAD_ARTICLE_SUCCESS: {
			return { ...state, data: action.payload, loaded: true, loading: false };
		}
		case ArticleActionTypes.LOAD_ARTICLE_FAIL: {
			return { ...state, data: articleInitialState.data, loaded: false, loading: false };
		}
		case ArticleActionTypes.ADD_COMMENT_SUCCESS: {
			const comments: ArticleComment[] = [action.payload, ...state.comments];
			return { ...state, comments };
		}
		case ArticleActionTypes.DELETE_COMMENT_SUCCESS: {
			const comments: ArticleComment[] = state.comments.filter(item => item.id !== action.payload);
			return { ...state, comments };
		}
		case ArticleActionTypes.INITIALIZE_ARTICLE: {
			return articleInitialState;
		}
		case ArticleActionTypes.DELETE_ARTICLE_FAIL: {
			return articleInitialState;
		}
		case ArticleActionTypes.LOAD_COMMENTS_SUCCESS: {
			return { ...state, comments: action.payload };
		}
		case ArticleActionTypes.LOAD_COMMENTS_FAIL: {
			return { ...state, comments: articleInitialState.comments };
		}
		case ArticleActionTypes.FOLLOW_SUCCESS:
		case ArticleActionTypes.UNFOLLOW_SUCCESS: {
			const data: ArticleData = { ...state.data, author: action.payload };
			return { ...state, data };
		}
		case ArticleActionTypes.FAVORITE_SUCCESS:
		case ArticleActionTypes.UNFAVORITE_SUCCESS: {
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
