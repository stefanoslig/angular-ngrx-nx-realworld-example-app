import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as NgrxErrorActions from './ngrx-error.actions';

@Injectable()
export class NgrxErrorEffects {
  error401$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxErrorActions.throw401Error),
      map(_ => ({ type: '[router] Go', payload: { path: ['/login'] } })),
    ),
  );

  error404$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxErrorActions.throw404Error),
      map(_ => ({ type: '[router] Go', payload: { path: ['/'] } })),
    ),
  );

  constructor(private actions$: Actions) {}
}
