import { User } from '@angular-ngrx-nx-realworld-example-app/api/src/lib/shared.interfaces';

export interface UserResponse {
  user: User;
}

export interface NewUserRequest {
  user: NewUser;
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserRequest {
  user: LoginUser;
}

export interface LoginUser {
  email: string;
  password: string;
}
