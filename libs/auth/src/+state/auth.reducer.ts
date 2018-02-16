import { Auth, AuthState } from './auth.interfaces';
import { AuthAction } from './auth.actions';
import { authInitialState } from '@angular-ngrx-nx/auth/src/+state/auth.init';

export function authReducer(state: Auth, action: AuthAction): Auth {
	switch (action.type) {
		case '[auth] SET_USER': {
			return {
				...state,
				loggedIn: true,
				user: action.payload
			};
		}
		case '[auth] GET_USER_ERROR': {
			return authInitialState;
		}
		case '[auth] LOGIN': {
			return { ...state, status: 'IN_PROGRESS' };
		}
		case '[auth] LOGIN_SUCCESS': {
			return { ...state, status: 'INIT' };
		}
		case '[auth] LOGIN_FAIL': {
			return { ...state, status: 'INIT' };
		}
		case '[auth] REGISTER': {
			return { ...state, status: 'IN_PROGRESS' };
		}
		case '[auth] REGISTER_SUCCESS': {
			return { ...state, status: 'INIT' };
		}
		case '[auth] REGISTER_FAIL': {
			return { ...state, status: 'INIT' };
		}
		default: {
			return state;
		}
	}
}

export const getLoggedIn = (state: AuthState) => state.auth.loggedIn;
export const getUser = (state: AuthState) => state.auth.user;
