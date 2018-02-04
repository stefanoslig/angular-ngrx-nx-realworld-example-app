import { homeInitialState } from '../+state/home.init';
import { HomeAction } from './home.actions';
import { Home, HomeState, Articles, ListType } from './home.interfaces';
import { ArticleData } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

export function homeReducer(state: Home = homeInitialState, action: HomeAction): Home {
  switch (action.type) {
    case '[home] SET_LIST_TYPE': {
      const listConfig = { ...state.listConfig, type: action.payload };
      return { ...state, listConfig };
    }
    case '[home] SET_LIST_PAGE': {
      const filters = { ...state.listConfig.filters, offset: state.listConfig.filters.limit * (action.payload - 1) };
      const listConfig = { ...state.listConfig, currentPage: action.payload, filters };
      return { ...state, listConfig };
    }
    case '[home] SET_LIST_TAG': {
      const filters = { ...state.listConfig.filters, tag: action.payload };
      const listConfig = { ...state.listConfig, type: 'ALL' as ListType, filters };
      return { ...state, listConfig };
    }
    case '[home] LOAD_ARTICLES': {
      const articles = { ...state.articles, loading: true };
      return { ...state, articles };
    }
    case '[home] LOAD_ARTICLES_SUCCESS': {
      const articles = {
        ...state.articles,
        entities: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        loading: false,
        loaded: true
      };
      return { ...state, articles };
    }
    case '[home] LOAD_ARTICLES_FAIL': {
      const articles = { ...state.articles, entities: [], articlesCount: 0, loading: false, loaded: true };
      return { ...state, articles };
    }
    case '[home] LOAD_TAGS_SUCCESS': {
      return { ...state, tags: action.payload };
    }
    case '[home] LOAD_TAGS_FAIL': {
      return { ...state, tags: [] };
    }
    case '[home] FAVORITE_SUCCESS':
    case '[home] UNFAVORITE_SUCCESS': {
      return { ...state, articles: replaceArticle(state.articles, action.payload) };
    }
    default: {
      return state;
    }
  }
}

const replaceArticle = (articles: Articles, payload: ArticleData): Articles => {
  const articleIndex = articles.entities.findIndex(a => a.slug === payload.slug);
  const entities = [
    ...articles.entities.slice(0, articleIndex),
    Object.assign({}, articles.entities[articleIndex], payload),
    ...articles.entities.slice(articleIndex + 1)
  ];
  return { ...articles, entities, loading: false, loaded: true };
};

export const getListConfig = (state: HomeState) => state.home.listConfig;
export const getArticles = (state: HomeState) => state.home.articles.entities;
export const getArticlesCount = (state: HomeState) => state.home.articles.articlesCount;
export const getTags = (state: HomeState) => state.home.tags;
export const getHome = (state: HomeState) => state.home;
