export interface Auth {
  user: User;
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
