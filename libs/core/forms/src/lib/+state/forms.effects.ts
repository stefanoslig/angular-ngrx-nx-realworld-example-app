import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import * as ngrxFormsActions from './forms.actions';

export const setData$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ngrxFormsActions.setData, ngrxFormsActions.updateData),
      map(() => ngrxFormsActions.initializeErrors()),
    );
  },
  { functional: true },
);
