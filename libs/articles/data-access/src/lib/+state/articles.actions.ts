import { createAction, props } from '@ngrx/store';
import { Article } from '@realworld/core/api-types';

export const favorite = createAction('[article] FAVORITE', props<{ slug: string }>());

export const favoriteSuccess = createAction('[article] FAVORITE_SUCCESS', props<{ article: Article }>());

export const favoriteFail = createAction('[article] FAVORITE_FAIL', props<{ error: Error }>());

export const unFavorite = createAction('[article] UNFAVORITE', props<{ slug: string }>());

export const unFavoriteSuccess = createAction('[article] UNFAVORITE_SUCCESS', props<{ article: Article }>());

export const unFavoriteFail = createAction('[article] UNFAVORITE_FAIL', props<{ error: Error }>());
