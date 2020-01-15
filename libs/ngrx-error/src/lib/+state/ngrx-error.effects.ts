import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as NgrxErrorActions from './ngrx-error.actions';
import { go } from '@angular-ngrx-nx-realworld-example-app/ngrx-router';

@Injectable()
export class NgrxErrorEffects {
  error401$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxErrorActions.throw401Error),
      map(_ => go({ to: { path: ['/login'] } })),
    ),
  );

  error404$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxErrorActions.throw404Error),
      map(_ => go({ to: { path: ['/'] } })),
    ),
  );

  constructor(private actions$: Actions) {}
}
