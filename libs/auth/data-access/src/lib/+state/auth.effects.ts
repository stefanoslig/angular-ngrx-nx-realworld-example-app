import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';
import { authActions } from './auth.actions';
import { formsActions, ngrxFormsQuery } from '@realworld/core/forms';
import { Store } from '@ngrx/store';

export const logout$ = createEffect(
  (actions$ = inject(Actions), localStorageJwtService = inject(LocalStorageJwtService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        localStorageJwtService.removeItem();
        router.navigateByUrl('login');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const loginOrRegisterSuccess$ = createEffect(
  (actions$ = inject(Actions), localStorageJwtService = inject(LocalStorageJwtService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess, authActions.registerSuccess),
      tap((action) => {
        localStorageJwtService.setItem(action.user.token);
        router.navigateByUrl('/');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const register$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(authActions.register),
      concatLatestFrom(() => store.select(ngrxFormsQuery.selectData)),
      exhaustMap(([, data]) =>
        authService.register(data).pipe(
          map((response) => authActions.registerSuccess({ user: response.user })),
          catchError((result) => of(formsActions.setErrors({ errors: result.error.errors }))),
        ),
      ),
    );
  },
  { functional: true },
);
