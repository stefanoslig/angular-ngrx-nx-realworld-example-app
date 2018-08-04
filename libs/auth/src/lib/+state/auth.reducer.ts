import { Auth, AuthState } from './auth.interfaces';
import { AuthAction, AuthActionTypes } from './auth.actions';
import { authInitialState } from './auth.init';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export function authReducer(state: Auth, action: AuthAction): Auth {
  switch (action.type) {
    case AuthActionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      };
    }
    case AuthActionTypes.GET_USER_FAIL: {
      return authInitialState;
    }
    case AuthActionTypes.LOGIN:
    case AuthActionTypes.REGISTER: {
      return { ...state, status: 'IN_PROGRESS' };
    }
    case AuthActionTypes.REGISTER_SUCCESS:
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        status: 'INIT',
        user: action.payload
      };
    }
    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.REGISTER_FAIL: {
      return { ...state, status: 'INIT' };
    }
    case AuthActionTypes.LOGOUT: {
      return authInitialState;
    }
    default: {
      return state;
    }
  }
}

export const getAuth = createFeatureSelector<Auth>('auth');
export const getLoggedIn = createSelector(getAuth, (auth: Auth) => auth.loggedIn);
export const getUser = createSelector(getAuth, (auth: Auth) => auth.user);
