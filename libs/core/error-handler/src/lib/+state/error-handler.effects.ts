import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { errorHandlerActions } from './error-handler.actions';

export const error401$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(errorHandlerActions.throw401Error),
      tap(() => {
        router.navigate(['/login']);
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const error404$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(errorHandlerActions.throw404Error),
      tap(() => {
        router.navigate(['/']);
      }),
    );
  },
  { functional: true, dispatch: false },
);
