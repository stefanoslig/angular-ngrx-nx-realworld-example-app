export interface User {
  email: string;
  password: string;
  username: string;
  bio: string;
  image: string;
}

export interface UserResponse {
  user: User & { token: string };
}
