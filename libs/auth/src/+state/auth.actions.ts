import { User } from './auth.interfaces';
import { Action } from '@ngrx/store';

export const enum AuthActionTypes {
	GET_USER = '[auth] GET_USER',
	INITIALIZE_USER = '[auth] INITIALIZE_USER',
	SET_USER = '[auth] SET_USER',
	GET_USER_FAIL = '[auth] GET_USER_FAIL',
	LOGIN = '[auth] LOGIN',
	LOGIN_SUCCESS = '[auth] LOGIN_SUCCESS',
	LOGIN_FAIL = '[auth] LOGIN_FAIL',
	REGISTER = '[auth] REGISTER',
	REGISTER_SUCCESS = '[auth] REGISTER_SUCCESS',
	REGISTER_FAIL = '[auth] REGISTER_FAIL',
	SET_LOCAL_STORAGE = '[auth] SET_LOCAL_STORAGE',
	REMOVE_LOCAL_STORAGE = '[auth] REMOVE_LOCAL_STORAGE'
}

export class GetUser implements Action {
	readonly type = '[auth] GET_USER';
}

export class InializeUser implements Action {
	readonly type = '[auth] INITIALIZE_USER';
}

export class SetUser implements Action {
	readonly type = '[auth] SET_USER';
	constructor(public payload: User) { };
}

export class GetUserFail implements Action {
	readonly type = '[auth] GET_USER_FAIL';
	constructor(public payload: Error) { };
}

export class Login implements Action {
	readonly type = '[auth] LOGIN';
}

export class LoginSuccess implements Action {
	readonly type = '[auth] LOGIN_SUCCESS';
}

export class LoginFail implements Action {
	readonly type = '[auth] LOGIN_FAIL';
}

export class Register implements Action {
	readonly type = '[auth] REGISTER';
}

export class RegisterSuccess implements Action {
	readonly type = '[auth] REGISTER_SUCCESS';
}

export class RegisterFail implements Action {
	readonly type = '[auth] REGISTER_FAIL';
}

export class SetLocalStorage implements Action {
	readonly type = '[auth] SET_LOCAL_STORAGE';
	constructor(public payload: string) { };
}

export class RemoveLocalStorage implements Action {
	readonly type = '[auth] REMOVE_LOCAL_STORAGE';
}

export type AuthAction =
	| GetUser
	| InializeUser
	| GetUserFail
	| SetUser
	| Login
	| LoginSuccess
	| LoginFail
	| Register
	| RegisterSuccess
	| RegisterFail
	| SetLocalStorage
	| RemoveLocalStorage;
