import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleState, Article } from './article.reducer';

const getArticle = createFeatureSelector<Article>('article');
export const getArticleData = createSelector(getArticle, (state: Article) => state.data);
export const getComments = createSelector(getArticle, (state: Article) => state.comments);
export const getArticleLoaded = createSelector(getArticle, (state: Article) => state.loaded);
export const getAuthorUsername = createSelector(getArticle, (state: Article) => state.data.author.username);

export const articleQuery = {
  getArticleData,
  getComments,
  getArticleLoaded,
  getAuthorUsername
};
