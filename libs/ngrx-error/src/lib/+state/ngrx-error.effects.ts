import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import * as NgrxErrorActions from './ngrx-error.actions';

@Injectable()
export class NgrxErrorEffects {
  error401$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NgrxErrorActions.throw401Error),
        tap(() => this.router.navigate(['/login'])),
      ),
    { dispatch: false },
  );

  error404$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NgrxErrorActions.throw404Error),
        tap(() => this.router.navigate(['/'])),
      ),
    { dispatch: false },
  );

  constructor(private readonly actions$: Actions, private readonly router: Router) {}
}
