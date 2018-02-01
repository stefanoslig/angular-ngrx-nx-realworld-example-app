import { User } from './auth.interfaces';

export interface GetUser {
  type: '[auth] GET_USER';
}

export interface SetUser {
  type: '[auth] SET_USER';
  payload: User;
}

export type AuthAction = GetUser | SetUser;
