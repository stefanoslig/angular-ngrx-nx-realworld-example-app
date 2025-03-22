import { User } from '@realworld/core/api-types';

export type AuthState = {
  loggedIn: boolean;
  user: User;
};

export const initialUserValue: User = {
  email: '',
  username: '',
  password: '',
  bio: '',
  image: '',
};

export const authInitialState: AuthState = {
  loggedIn: false,
  user: initialUserValue,
};
