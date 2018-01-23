import { User } from './auth.interfaces';

export interface GetUser {
  type: 'GET_USER';
}

export interface SetUser {
  type: 'SET_USER';
  payload: User;
}

export type AuthAction = GetUser | SetUser;

