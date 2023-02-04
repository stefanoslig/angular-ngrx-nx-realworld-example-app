import { AuthService } from '../services/auth.service';
import { ngrxFormsQuery } from '@realworld/core/forms';
import { formsActions } from '@realworld/core/forms';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import { authActions } from './auth.actions';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getUser),
      switchMap(() =>
        this.authService.user().pipe(
          map((data) => authActions.getUserSuccess({ user: data.user })),
          catchError((error) => of(authActions.getUserFailure({ error }))),
        ),
      ),
    ),
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      concatLatestFrom(() => this.store.select(ngrxFormsQuery.selectData)),
      exhaustMap(([, data]) =>
        this.authService.login(data).pipe(
          map((response) => authActions.loginSuccess({ user: response.user })),
          catchError((result) => of(formsActions.setErrors({ errors: result.error.errors }))),
        ),
      ),
    ),
  );

  loginOrRegisterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess, authActions.registerSuccess),
        tap((action) => {
          this.localStorageJwtService.setItem(action.user.token);
          this.router.navigateByUrl('/');
        }),
      ),
    { dispatch: false },
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      concatLatestFrom(() => this.store.select(ngrxFormsQuery.selectData)),
      exhaustMap(([, data]) =>
        this.authService.register(data).pipe(
          map((response) => authActions.registerSuccess({ user: response.user })),
          catchError((result) => of(formsActions.setErrors({ errors: result.error.errors }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private localStorageJwtService: LocalStorageJwtService,
    private store: Store,
    private authService: AuthService,
    private router: Router,
  ) {}
}
