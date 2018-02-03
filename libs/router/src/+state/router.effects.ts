import 'rxjs/add/operator/switchMap';

import { Back, Forward, Go } from '@angular-ngrx-nx/router/src/+state/router.actions';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  navigate$ = this.action$
    .ofType<Go>('[Router] Go')
    .pipe(
      map((action: Go) => action.payload),
      tap(({ path, query: queryParams, extras }) => this.router.navigate(path, { queryParams, ...extras }))
    );

  @Effect({ dispatch: false })
  navigateBack$ = this.action$.ofType<Back>('[Router] Back').pipe(tap(() => this.location.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.action$.ofType<Forward>('[Router] Forward').pipe(tap(() => this.location.forward()));

  constructor(private action$: Actions, private router: Router, private location: Location) {}
}
