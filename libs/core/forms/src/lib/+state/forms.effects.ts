import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { formsActions } from './forms.actions';

export const setData$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(formsActions.setData, formsActions.updateData),
      map(() => formsActions.initializeErrors()),
    );
  },
  { functional: true },
);
