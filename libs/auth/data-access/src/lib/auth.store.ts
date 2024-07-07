import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthState, authInitialState, initialUserValue } from './auth.model';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { exhaustMap, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { formsActions } from '@realworld/core/forms';
import { LocalStorageJwtService } from './services/local-storage-jwt.service';
import { Router } from '@angular/router';
import { LoginUser, NewUser, User } from '@realworld/core/api-types';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(authInitialState),
  withMethods(
    (
      store,
      reduxStore = inject(Store),
      authService = inject(AuthService),
      localStorageService = inject(LocalStorageJwtService),
      router = inject(Router),
    ) => ({
      getUser: rxMethod<void>(
        pipe(
          switchMap(() => authService.user()),
          tap(({ user }) => patchState(store, { user, loggedIn: true })),
        ),
      ),
      login: rxMethod<LoginUser>(
        pipe(
          exhaustMap((credentials) =>
            authService.login(credentials).pipe(
              tapResponse({
                next: ({ user }) => {
                  patchState(store, { user, loggedIn: true });
                  localStorageService.setItem(user.token);
                  router.navigateByUrl('/');
                },
                error: ({ error }) => reduxStore.dispatch(formsActions.setErrors({ errors: error.errors })),
              }),
            ),
          ),
        ),
      ),
      register: rxMethod<NewUser>(
        pipe(
          exhaustMap((newUserData) =>
            authService.register(newUserData).pipe(
              tapResponse({
                next: ({ user }) => {
                  patchState(store, { user, loggedIn: true });
                  localStorageService.setItem(user.token);
                  router.navigateByUrl('/');
                },
                error: ({ error }) => reduxStore.dispatch(formsActions.setErrors({ errors: error.errors })),
              }),
            ),
          ),
        ),
      ),
      updateUser: rxMethod<User>(
        pipe(
          exhaustMap((user) =>
            authService.update(user).pipe(
              tapResponse({
                next: ({ user }) => {
                  patchState(store, { user });
                  localStorageService.setItem(user.token);
                  router.navigate(['profile', user.username]);
                },
                error: ({ error }) => reduxStore.dispatch(formsActions.setErrors({ errors: error.errors })),
              }),
            ),
          ),
        ),
      ),
      logout: () => {
        patchState(store, { user: initialUserValue, loggedIn: false });
        localStorageService.removeItem();
        router.navigateByUrl('login');
      },
    }),
  ),
);
