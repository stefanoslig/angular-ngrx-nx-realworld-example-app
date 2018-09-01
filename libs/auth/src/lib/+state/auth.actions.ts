import { User } from '@angular-ngrx-nx-realworld-example-app/api';
import { Action } from '@ngrx/store';

export const enum AuthActionTypes {
  GET_USER = '[auth] GET_USER',
  GET_USER_SUCCESS = '[auth] GET_USER_SUCCESS',
  GET_USER_FAIL = '[auth] GET_USER_FAIL',
  LOGIN = '[auth] LOGIN',
  LOGIN_SUCCESS = '[auth] LOGIN_SUCCESS',
  LOGIN_FAIL = '[auth] LOGIN_FAIL',
  REGISTER = '[auth] REGISTER',
  REGISTER_SUCCESS = '[auth] REGISTER_SUCCESS',
  REGISTER_FAIL = '[auth] REGISTER_FAIL',
  LOGOUT = '[auth] LOGOUT'
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GET_USER;
}

export class GetUserSuccess implements Action {
  readonly type = AuthActionTypes.GET_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class GetUserFail implements Action {
  readonly type = AuthActionTypes.GET_USER_FAIL;
  constructor(public payload: Error) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: User) {}
}

export class LoginFail implements Action {
  readonly type = AuthActionTypes.LOGIN_FAIL;
}

export class Register implements Action {
  readonly type = AuthActionTypes.REGISTER;
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.REGISTER_SUCCESS;

  constructor(public payload: User) {}
}

export class RegisterFail implements Action {
  readonly type = AuthActionTypes.REGISTER_FAIL;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export type AuthAction =
  | GetUser
  | GetUserFail
  | GetUserSuccess
  | Login
  | LoginSuccess
  | LoginFail
  | Register
  | RegisterSuccess
  | RegisterFail
  | Logout;
