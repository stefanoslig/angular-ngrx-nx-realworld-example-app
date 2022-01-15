import { Article } from '@angular-ngrx-nx-realworld-example-app/api';
import { Action, createFeature, createReducer, on } from '@ngrx/store';
import * as ArticleListActions from './article-list.actions';

export const articleListFeatureKey = 'articles-list';

export interface ArticleListState {
  listConfig: ArticleListConfig;
  articles: Articles;
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
  entities: Article[];
  articlesCount: number;
  loaded: boolean;
  loading: boolean;
}

export const articleListInitialState: ArticleListState = {
  listConfig: {
    type: 'ALL',
    currentPage: 1,
    filters: {
      limit: 10,
    },
  },
  articles: {
    entities: [],
    articlesCount: 0,
    loaded: false,
    loading: false,
  },
};

export const articleListFeature = createFeature({
  name: 'articlesList',
  reducer: createReducer(
    articleListInitialState,
    on(ArticleListActions.setListPage, (state, { page }) => {
      const filters = {
        ...state.listConfig.filters,
        offset: state.listConfig.filters.limit * (page - 1),
      };
      const listConfig = {
        ...state.listConfig,
        currentPage: page,
        filters,
      };
      return { ...state, listConfig };
    }),
    on(ArticleListActions.setListConfig, (state, { config }) => ({
      ...state,
      listConfig: config,
    })),
    on(ArticleListActions.loadArticles, (state) => {
      const articles = { ...state.articles, loading: true };
      return { ...state, articles };
    }),
    on(ArticleListActions.loadArticlesSuccess, (state, { articles, articlesCount }) => {
      return { ...state, entities: articles, articlesCount, loading: false, loaded: true };
    }),
    on(ArticleListActions.loadArticlesFail, (state) => {
      return { ...state, entities: [], articlesCount: 0, loading: false, loaded: true };
    }),
    on(ArticleListActions.unFavoriteSuccess, ArticleListActions.favoriteSuccess, (state, { article }) => ({
      ...state,
      articles: replaceArticle(state.articles, article),
    })),
  ),
});

function replaceArticle(articles: Articles, payload: Article): Articles {
  const articleIndex = articles.entities.findIndex((a) => a.slug === payload.slug);
  const entities = [
    ...articles.entities.slice(0, articleIndex),
    Object.assign({}, articles.entities[articleIndex], payload),
    ...articles.entities.slice(articleIndex + 1),
  ];
  return { ...articles, entities, loading: false, loaded: true };
}
