import { createAction, props } from '@ngrx/store';
import { Article } from '@realworld/core/api-types';

export const favorite = createAction('[articles] FAVORITE', props<{ slug: string }>());

export const favoriteSuccess = createAction('[articles] FAVORITE_SUCCESS', props<{ article: Article }>());

export const favoriteFail = createAction('[articles] FAVORITE_FAIL', props<{ error: Error }>());

export const unFavorite = createAction('[articles] UNFAVORITE', props<{ slug: string }>());

export const unFavoriteSuccess = createAction('[articles] UNFAVORITE_SUCCESS', props<{ article: Article }>());

export const unFavoriteFail = createAction('[articles] UNFAVORITE_FAIL', props<{ error: Error }>());
