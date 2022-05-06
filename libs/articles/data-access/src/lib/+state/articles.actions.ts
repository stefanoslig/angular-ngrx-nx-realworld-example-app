import { createActionGroup, props } from '@ngrx/store';
import { Article } from '@realworld/core/api-types';

export const articlesActions = createActionGroup({
  source: 'Articles',
  events: {
    Favorite: props<{ slug: string }>(),
    'Favorite Failure': props<{ error: Error }>(),
    'Favorite Success': props<{ article: Article }>(),
    Unfavorite: props<{ slug: string }>(),
    'Unfavorite Failure': props<{ error: Error }>(),
    'Unfavorite Success': props<{ article: Article }>(),
  },
});
