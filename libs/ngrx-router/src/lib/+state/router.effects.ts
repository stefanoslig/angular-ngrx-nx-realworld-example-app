import { Back, Forward, Go } from './router.actions';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  navigate$ = this.action$.pipe(
    ofType<Go>('[router] Go'),
    map((action: Go) => action.payload),
    tap(({ path, query: queryParams, extras }) =>
      this.router.navigate(path, { queryParams, ...extras })
    )
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.action$.pipe(
    ofType<Back>('[router] Back'),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.action$.pipe(
    ofType<Forward>('[router] Forward'),
    tap(() => this.location.forward())
  );

  constructor(
    private action$: Actions,
    private router: Router,
    private location: Location
  ) {}
}
