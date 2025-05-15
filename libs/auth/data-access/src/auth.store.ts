import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthState, authInitialState, initialUserValue } from './auth.model';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { exhaustMap, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';
import { LoginUser, NewUser, User } from '@realworld/core/api-types';
import { setLoaded, setLoading, withCallState } from '@realworld/core/data-access';
import { FormErrorsStore } from '@realworld/core/forms';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(authInitialState),
  withMethods(
    (store, formErrorsStore = inject(FormErrorsStore), authService = inject(AuthService), router = inject(Router)) => ({
      getUser: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loggedIn: false, ...setLoading('getUser') })),
          switchMap(() =>
            authService.user().pipe(
              tapResponse({
                next: ({ user }) => patchState(store, { user, loggedIn: true, ...setLoaded('getUser') }),
                error: () => patchState(store, { loggedIn: false, ...setLoaded('getUser') }),
              }),
            ),
          ),
        ),
      ),
      login: rxMethod<LoginUser>(
        pipe(
          exhaustMap((credentials) =>
            authService.login(credentials).pipe(
              tapResponse({
                next: ({ user }) => {
                  patchState(store, { user, loggedIn: true });
                  router.navigateByUrl('/');
                },
                error: ({ error }) => formErrorsStore.setErrors(error.errors),
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
                next: (user) => {
                  patchState(store, { user, loggedIn: true });
                  router.navigateByUrl('/');
                },
                error: ({ error }) => formErrorsStore.setErrors(error.errors),
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
                  router.navigate(['profile', user.username]);
                },
                error: ({ error }) => formErrorsStore.setErrors(error.errors),
              }),
            ),
          ),
        ),
      ),
      logout: rxMethod<void>(
        pipe(
          exhaustMap(() =>
            authService.logout().pipe(
              tapResponse({
                next: () => {
                  patchState(store, { user: initialUserValue, loggedIn: false });
                  router.navigateByUrl('login');
                },
                error: ({ error }) => formErrorsStore.setErrors(error.errors),
              }),
            ),
          ),
        ),
      ),
    }),
  ),
  withCallState({ collection: 'getUser' }),
);
