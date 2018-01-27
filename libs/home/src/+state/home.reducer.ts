import { homeInitialState } from '../+state/home.init';
import { HomeAction } from './home.actions';
import { Home, HomeState } from './home.interfaces';

export function homeReducer(state: Home = homeInitialState, action: HomeAction): Home {
	switch (action.type) {
		case '[home] SET_LIST_CONFIG': {
			return { ...state, listConfig: action.payload };
		}
		case '[home] LOAD_ARTICLES': {
			const articles = { ...state.articles, loading: true };
			return { ...state, articles };
		}
		case '[home] LOAD_ARTICLES_SUCCESS': {
			const articles = { ...state.articles, entities: action.payload, loading: false, loaded: true };
			return { ...state, articles };
		}
		case '[home] LOAD_ARTICLES_FAIL': {
			const articles = { ...state.articles, entities: [], loading: false, loaded: true };
			return { ...state, articles };
		}
		default: {
			return state;
		}
	}
}

export const getListConfig = (state: HomeState) => state.home.listConfig;
export const getArticles = (state: HomeState) => state.home.articles.entities;
