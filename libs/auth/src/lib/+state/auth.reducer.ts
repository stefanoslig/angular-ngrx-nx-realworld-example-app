import { User } from '@angular-ngrx-nx-realworld-example-app/api';

import { AuthAction, AuthActionTypes } from './auth.actions';

export interface Auth {
  loggedIn: boolean;
  user: User;
  status: Status;
}

export interface AuthState {
  readonly auth: Auth;
}

export type Status = 'INIT' | 'IN_PROGRESS';

export const authInitialState: Auth = {
  loggedIn: false,
  status: 'INIT',
  user: {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: ''
  }
};

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
