import { ArticleData } from '@angular-ngrx-nx-realworld-example-app/api';

import { ArticleListAction, ArticleListActionTypes } from './article-list.actions';

export interface ArticleList {
  listConfig: ArticleListConfig;
  articles: Articles;
}

export interface ArticleListState {
  readonly articleList: ArticleList;
}

export interface ArticleListConfig {
  type: ListType;
  currentPage: number;
  filters: Filters;
}

export interface Filters {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export type ListType = 'ALL' | 'FEED';

export interface Articles {
  entities: ArticleData[];
  articlesCount: number;
  loaded: boolean;
  loading: boolean;
}

export const articleListInitialState: ArticleList = {
  listConfig: {
    type: 'ALL',
    currentPage: 1,
    filters: {
      limit: 10
    }
  },
  articles: {
    entities: [],
    articlesCount: 0,
    loaded: false,
    loading: false
  }
};

export function articleListReducer(state: ArticleList, action: ArticleListAction): ArticleList {
  switch (action.type) {
    case ArticleListActionTypes.SET_LIST_PAGE: {
      const filters = { ...state.listConfig.filters, offset: state.listConfig.filters.limit * (action.payload - 1) };
      const listConfig = { ...state.listConfig, currentPage: action.payload, filters };
      return { ...state, listConfig };
    }
    case ArticleListActionTypes.SET_LIST_CONFIG: {
      return { ...state, listConfig: action.payload };
    }
    case ArticleListActionTypes.LOAD_ARTICLES: {
      const articles = { ...state.articles, loading: true };
      return { ...state, articles };
    }
    case ArticleListActionTypes.LOAD_ARTICLES_SUCCESS: {
      const articles = {
        ...state.articles,
        entities: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        loading: false,
        loaded: true
      };
      return { ...state, articles };
    }
    case ArticleListActionTypes.LOAD_ARTICLES_FAIL: {
      const articles = { ...state.articles, entities: [], articlesCount: 0, loading: false, loaded: true };
      return { ...state, articles };
    }
    case ArticleListActionTypes.FAVORITE_SUCCESS:
    case ArticleListActionTypes.UNFAVORITE_SUCCESS: {
      return { ...state, articles: replaceArticle(state.articles, action.payload) };
    }
    default: {
      return state;
    }
  }
}

function replaceArticle(articles: Articles, payload: ArticleData): Articles {
  const articleIndex = articles.entities.findIndex(a => a.slug === payload.slug);
  const entities = [
    ...articles.entities.slice(0, articleIndex),
    Object.assign({}, articles.entities[articleIndex], payload),
    ...articles.entities.slice(articleIndex + 1)
  ];
  return { ...articles, entities, loading: false, loaded: true };
}
