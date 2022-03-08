import { createAction, props } from '@ngrx/store';
import { Article } from '@realworld/core/api-types';

import { ArticleListConfig } from './article-list.reducer';

export const setListPage = createAction('[article-list] SET_LIST_PAGE', props<{ page: number }>());

export const setListConfig = createAction('[article-list] SET_LIST_CONFIG', props<{ config: ArticleListConfig }>());

export const loadArticles = createAction('[article-list] LOAD_ARTICLES');

export const loadArticlesSuccess = createAction(
  '[article-list] LOAD_ARTICLES_SUCCESS',
  props<{ articles: Article[]; articlesCount: number }>(),
);

export const loadArticlesFail = createAction('[article-list] LOAD_ARTICLES_FAIL', props<{ error: Error }>());
