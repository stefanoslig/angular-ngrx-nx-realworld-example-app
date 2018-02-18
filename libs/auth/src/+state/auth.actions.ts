import { User } from './auth.interfaces';

export interface GetUser {
	type: '[auth] GET_USER';
}

export interface InializeUser {
	type: '[auth] INITIALIZE_USER';
}

export interface SetUser {
	type: '[auth] SET_USER';
	payload: User;
}

export interface GetUserFail {
	type: '[auth] GET_USER_FAIL';
	payload: Error;
}

export interface Login {
	type: '[auth] LOGIN';
}

export interface LoginSuccess {
	type: '[auth] LOGIN_SUCCESS';
}

export interface LoginFail {
	type: '[auth] LOGIN_FAIL';
}

export interface Register {
	type: '[auth] REGISTER';
}

export interface RegisterSuccess {
	type: '[auth] REGISTER_SUCCESS';
}

export interface RegisterFail {
	type: '[auth] REGISTER_FAIL';
}

export interface SetLocalStorage {
	type: '[auth] SET_LOCAL_STORAGE';
	payload: string
}

export interface RemoveLocalStorage {
	type: '[auth] REMOVE_LOCAL_STORAGE';
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
