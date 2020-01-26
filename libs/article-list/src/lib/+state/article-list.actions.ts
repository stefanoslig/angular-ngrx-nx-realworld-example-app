import { createAction, props } from '@ngrx/store';
import { Article } from '@angular-ngrx-nx-realworld-example-app/api';

import { ArticleListConfig } from './article-list.reducer';

export const setListPage = createAction('[article-list] SET_LIST_PAGE', props<{ page: number }>());

export const setListConfig = createAction('[article-list] SET_LIST_CONFIG', props<{ config: ArticleListConfig }>());

export const loadArticles = createAction('[article-list] LOAD_ARTICLES');

export const loadArticlesSuccess = createAction(
  '[article-list] LOAD_ARTICLES_SUCCESS',
  props<{ articles: Article[]; articlesCount: number }>(),
);

export const loadArticlesFail = createAction('[article-list] LOAD_ARTICLES_FAIL', props<{ error: Error }>());

export const favorite = createAction('[article-list] FAVORITE', props<{ slug: string }>());

export const favoriteSuccess = createAction('[article-list] FAVORITE_SUCCESS', props<{ article: Article }>());

export const favoriteFail = createAction('[article-list] FAVORITE_FAIL', props<{ error: Error }>());

export const unFavorite = createAction('[article-list] UNFAVORITE', props<{ slug: string }>());

export const unFavoriteSuccess = createAction('[article-list] UNFAVORITE_SUCCESS', props<{ article: Article }>());

export const unFavoriteFail = createAction('[article-list] UNFAVORITE_FAIL', props<{ error: Error }>());
