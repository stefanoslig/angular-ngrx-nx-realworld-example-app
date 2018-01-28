import { Article, ArticleState } from './article.interfaces';
import { ArticleAction } from './article.actions';
import { articleInitialState } from '@angular-ngrx-nx/article/src/+state/article.init';

export function articleReducer(state: Article = articleInitialState, action: ArticleAction): Article {
	switch (action.type) {
		case '[article] LOAD_ARTICLE_SUCCESS': {
			return action.payload;
		}
		case '[article] LOAD_ARTICLE_FAIL': {
			return articleInitialState;
		}
		default: {
			return state;
		}
	}
}

export const getArticle = (state: ArticleState) => state.article;
