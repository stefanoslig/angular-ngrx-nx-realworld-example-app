import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleState } from './article.reducer';

const getArticle = createFeatureSelector<ArticleState>('article');
export const getArticleData = createSelector(
  getArticle,
  (state: ArticleState) => state.data,
);
export const getComments = createSelector(
  getArticle,
  (state: ArticleState) => state.comments,
);
export const getArticleLoaded = createSelector(
  getArticle,
  (state: ArticleState) => state.loaded,
);
export const getAuthorUsername = createSelector(
  getArticle,
  (state: ArticleState) => state.data.author.username,
);

export const articleQuery = {
  getArticleData,
  getComments,
  getArticleLoaded,
  getAuthorUsername,
};
