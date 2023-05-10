import { createActionGroup, props } from '@ngrx/store';
import { Article } from '@realworld/core/api-types';

export const articlesActions = createActionGroup({
  source: 'Articles',
  events: {
    favorite: props<{ slug: string }>(),
    favoriteFailure: props<{ error: Error }>(),
    favoriteSuccess: props<{ article: Article }>(),
    unfavorite: props<{ slug: string }>(),
    unfavoriteFailure: props<{ error: Error }>(),
    unfavoriteSuccess: props<{ article: Article }>(),
  },
});
