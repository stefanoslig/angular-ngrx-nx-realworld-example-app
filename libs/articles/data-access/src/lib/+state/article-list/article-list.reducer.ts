import { Article } from '@realworld/core/api-types';
import { createFeature, createReducer, on } from '@ngrx/store';
import { articleListActions } from './article-list.actions';
import { articlesActions } from '../articles.actions';

export const articleListFeatureKey = 'articles-list';

export const articleListFeature = createFeature({
  name: 'articlesList',
  reducer: createReducer(
    articleListInitialState,
    on(articleListActions.setListPage, (state, { page }) => {
      const filters = {
        ...state.listConfig.filters,
        offset: (state?.listConfig?.filters?.limit ?? 10) * (page - 1),
      };
      const listConfig = {
        ...state.listConfig,
        currentPage: page,
        filters,
      };
      return { ...state, listConfig };
    }),
    on(articleListActions.setListConfig, (state, { config }) => ({
      ...state,
      listConfig: config,
    })),

    on(articlesActions.unfavoriteSuccess, articlesActions.favoriteSuccess, (state, { article }) => ({
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
