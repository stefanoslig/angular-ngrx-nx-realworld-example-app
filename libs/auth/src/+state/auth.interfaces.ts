export interface Auth {
  loggedIn: boolean;
  user: User;
  status: Status;
}

export interface AuthState {
  readonly auth: Auth;
}

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export type FormType = 'LOGIN' | 'REGISTER';
export type Status = 'INIT' | 'IN_PROGRESS';
