import { Auth } from './auth.interfaces';
import { AuthAction } from './auth.actions';

export function authReducer(state: Auth, action: AuthAction): Auth {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: Auth) => state.loggedIn;
export const getUser = (state: Auth) => state.user;
