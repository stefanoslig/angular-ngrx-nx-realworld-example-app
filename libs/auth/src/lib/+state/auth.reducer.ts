import { User } from '@angular-ngrx-nx-realworld-example-app/api';
import { createReducer, on, createFeature } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  loggedIn: boolean;
  user: User;
  status: Status;
}

export enum Status {
  INIT = 'INIT',
  IN_PROGRESS = 'IN_PROGRESS',
}

export const authInitialState: AuthState = {
  loggedIn: false,
  status: Status.INIT,
  user: {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  },
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    authInitialState,
    on(AuthActions.getUserSuccess, (state, action) => ({
      ...state,
      loggedIn: true,
      user: action.user,
    })),
    on(AuthActions.getUserFail, AuthActions.logout, () => authInitialState),
    on(AuthActions.login, AuthActions.register, (state) => ({
      ...state,
      status: Status.IN_PROGRESS,
    })),
    on(AuthActions.registerSuccess, AuthActions.loginSuccess, (state, action) => ({
      ...state,
      loggedIn: true,
      status: Status.INIT,
      user: action.user,
    })),
    on(AuthActions.registerFail, AuthActions.loginFail, (state) => ({
      ...state,
      status: Status.INIT,
    })),
  ),
});
