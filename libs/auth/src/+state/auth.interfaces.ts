export interface Auth {
  user: User;
  token: string;
}

export interface AuthState {
  readonly auth: Auth;
}

export interface User {
  email: string;
  username: string;
  bio: string;
  image: string;
}
