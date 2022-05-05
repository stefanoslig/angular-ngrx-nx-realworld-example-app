import { AuthService } from '../services/auth.service';
import { NgrxFormsFacade, setErrors } from '@realworld/core/forms';
import * as fromNgrxForms from '@realworld/core/forms';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import { authActions } from './auth.actions';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';

@Injectable()
export class AuthEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getUser),
      switchMap(() =>
        this.authService.user().pipe(
          map((data) => authActions.getUserSuccess({ user: data.user })),
          catchError((error) => of(authActions.getUserFailure(error))),
        ),
      ),
    ),
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      concatLatestFrom(() => this.ngrxFormsFacade.data$),
      exhaustMap(([, data]) =>
        this.authService.login(data).pipe(
          map((response) => authActions.loginSuccess({ user: response.user })),
          catchError((result) => of(fromNgrxForms.setErrors({ errors: result.error.errors }))),
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
      concatLatestFrom(() => this.ngrxFormsFacade.data$),
      exhaustMap(([, data]) =>
        this.authService.register(data).pipe(
          map((response) => authActions.registerSuccess({ user: response.user })),
          catchError((result) => of(setErrors({ errors: result.error.errors }))),
        ),
      ),
    ),
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        tap(() => {
          this.localStorageJwtService.removeItem();
          this.router.navigateByUrl('login');
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private localStorageJwtService: LocalStorageJwtService,
    private ngrxFormsFacade: NgrxFormsFacade,
    private authService: AuthService,
    private router: Router,
  ) {}
}
