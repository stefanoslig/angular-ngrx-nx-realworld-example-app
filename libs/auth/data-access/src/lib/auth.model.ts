import { User } from '@realworld/core/api-types';

type UserState = User & { token: string };

export type AuthState = {
  loggedIn: boolean;
  user: UserState;
};

export const initialUserValue: UserState = {
  email: '',
  username: '',
  password: '',
  bio: '',
  image: '',
  token: '',
};

export const authInitialState: AuthState = {
  loggedIn: false,
  user: initialUserValue,
};
