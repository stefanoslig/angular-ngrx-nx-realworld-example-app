import { AuthService } from '../auth.service';
import { NgrxFormsFacade, setErrors } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import * as fromNgrxForms from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { LocalStorageJwtService } from '../local-storage-jwt.service';

@Injectable()
export class AuthEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(item =>
        this.authService.user().pipe(
          map(data => AuthActions.getUserSuccess({ user: data.user })),
          catchError(error => of(AuthActions.getUserFail(error))),
        ),
      ),
    ),
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      withLatestFrom(this.ngrxFormsFacade.data$),
      exhaustMap(([action, data]) =>
        this.authService.login(data).pipe(
          map(response => AuthActions.loginSuccess({ user: response.user })),
          catchError(result => of(fromNgrxForms.setErrors({ errors: result.error.errors }))),
        ),
      ),
    ),
  );

  loginOrRegisterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(action => {
          this.localStorageJwtService.setItem(action.user.token);
          this.router.navigateByUrl('/');
        }),
      ),
    { dispatch: false },
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      withLatestFrom(this.ngrxFormsFacade.data$),
      exhaustMap(([action, data]) =>
        this.authService.register(data).pipe(
          map(response => AuthActions.registerSuccess({ user: response.user })),
          catchError(result => of(setErrors({ errors: result.error.errors }))),
        ),
      ),
    ),
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(action => {
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
