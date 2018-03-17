import { Auth, AuthState } from './auth.interfaces';
import { AuthAction, AuthActionTypes } from './auth.actions';
import { authInitialState } from './auth.init';

export function authReducer(state: Auth, action: AuthAction): Auth {
	switch (action.type) {
		case AuthActionTypes.SET_USER: {
			return {
				...state,
				loggedIn: true,
				user: action.payload
			};
		}
		case AuthActionTypes.INITIALIZE_USER:
		case AuthActionTypes.GET_USER_FAIL: {
			return authInitialState;
		}
		case AuthActionTypes.LOGIN: {
			return { ...state, status: 'IN_PROGRESS' };
		}
		case AuthActionTypes.LOGIN_SUCCESS: {
			return { ...state, status: 'INIT' };
		}
		case AuthActionTypes.LOGIN_FAIL: {
			return { ...state, status: 'INIT' };
		}
		case AuthActionTypes.REGISTER: {
			return { ...state, status: 'IN_PROGRESS' };
		}
		case AuthActionTypes.REGISTER_SUCCESS: {
			return { ...state, status: 'INIT' };
		}
		case AuthActionTypes.REGISTER_FAIL: {
			return { ...state, status: 'INIT' };
		}
		default: {
			return state;
		}
	}
}

export const getAuth = (state: AuthState) => state.auth;
export const getLoggedIn = (state: AuthState) => state.auth.loggedIn;
export const getUser = (state: AuthState) => state.auth.user;
