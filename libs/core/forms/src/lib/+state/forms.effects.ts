import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as NgrxFormsActions from './forms.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class NgrxFormsEffects {
  setData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxFormsActions.setData, NgrxFormsActions.updateData),
      map(() => NgrxFormsActions.initializeErrors()),
    ),
  );

  constructor(private actions$: Actions) {}
}
