import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthState, authInitialState, initialUserValue } from './auth.model';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { exhaustMap, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';
import { LoginUser, NewUser, User } from '@realworld/core/api-types';
import { setLoaded, withCallState } from '@realworld/core/data-access';
import { FormErrorsStore } from '@realworld/core/forms';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(authInitialState),
  withProps(() => ({
    _formErrorsStore: inject(FormErrorsStore),
    _authService: inject(AuthService),
    _router: inject(Router),
  })),
  withMethods((store) => ({
    getUser: rxMethod<void>(
      pipe(
        switchMap(() => store._authService.user()),
        tap(({ user }) => patchState(store, { user, loggedIn: true, ...setLoaded('getUser') })),
      ),
    ),
    login: rxMethod<LoginUser>(
      pipe(
        exhaustMap((credentials) =>
          store._authService.login(credentials).pipe(
            tapResponse({
              next: ({ user }) => {
                patchState(store, { user, loggedIn: true });
                store._router.navigateByUrl('/');
              },
              error: ({ error }) => store._formErrorsStore.setErrors(error.errors),
            }),
          ),
        ),
      ),
    ),
    register: rxMethod<NewUser>(
      pipe(
        exhaustMap((newUserData) =>
          store._authService.register(newUserData).pipe(
            tapResponse({
              next: ({ user }) => {
                patchState(store, { user, loggedIn: true });
                store._router.navigateByUrl('/');
              },
              error: ({ error }) => store._formErrorsStore.setErrors(error.errors),
            }),
          ),
        ),
      ),
    ),
    updateUser: rxMethod<User>(
      pipe(
        exhaustMap((user) =>
          store._authService.update(user).pipe(
            tapResponse({
              next: ({ user }) => {
                patchState(store, { user });
                store._router.navigate(['profile', user.username]);
              },
              error: ({ error }) => store._formErrorsStore.setErrors(error.errors),
            }),
          ),
        ),
      ),
    ),
    logout: rxMethod<void>(
      pipe(
        exhaustMap(() =>
          store._authService.logout().pipe(
            tapResponse({
              next: () => {
                patchState(store, { user: initialUserValue, loggedIn: false });
                store._router.navigateByUrl('login');
              },
              error: ({ error }) => store._formErrorsStore.setErrors(error.errors),
            }),
          ),
        ),
      ),
    ),
  })),
  withCallState({ collection: 'getUser' }),
);
