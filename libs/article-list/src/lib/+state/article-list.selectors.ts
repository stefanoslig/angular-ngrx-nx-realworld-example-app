import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleListState, ArticleList } from './article-list.reducer';

const getArticleList = createFeatureSelector<ArticleList>('articleList');
export const getListConfig = createSelector(getArticleList, (state: ArticleList) => state.listConfig);
export const getArticles = createSelector(getArticleList, (state: ArticleList) => state.articles.entities);
export const getArticlesCount = createSelector(getArticleList, (state: ArticleList) => state.articles.articlesCount);
export const isLoading = createSelector(getArticleList, (state: ArticleList) => state.articles.loading);

export const articleListQuery = {
  getListConfig,
  getArticles,
  getArticlesCount,
  isLoading
};
