import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { articleListActions } from './article-list.actions';
import { map } from 'rxjs';

export const setListPage$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(articleListActions.setListPage),
      map(() => articleListActions.loadArticles()),
    );
  },
  { functional: true },
);

export const setListTag$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(articleListActions.setListConfig),
      map(() => articleListActions.loadArticles()),
    );
  },
  { functional: true },
);
