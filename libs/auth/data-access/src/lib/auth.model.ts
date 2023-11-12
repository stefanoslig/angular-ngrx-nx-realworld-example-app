import { User } from '@realworld/core/api-types';

export type AuthState = {
  loggedIn: boolean;
  user: User;
};
