import { User } from '@realworld/core/api-types';
import { createReducer, on, createFeature } from '@ngrx/store';
import { authActions } from './auth.actions';

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
    on(authActions.getUserSuccess, (state, action) => ({
      ...state,
      loggedIn: true,
      user: action.user,
    })),
    on(authActions.getUserFailure, authActions.logout, () => authInitialState),
    on(authActions.login, authActions.register, (state) => ({
      ...state,
      status: Status.IN_PROGRESS,
    })),
    on(authActions.registerSuccess, authActions.loginSuccess, (state, action) => ({
      ...state,
      loggedIn: true,
      status: Status.INIT,
      user: action.user,
    })),
    on(authActions.registerFailure, authActions.loginFailure, (state) => ({
      ...state,
      status: Status.INIT,
    })),
  ),
});
