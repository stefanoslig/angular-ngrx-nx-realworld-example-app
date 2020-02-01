export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
  loading: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface SingleArticleResponse {
  article: Article;
}

export interface UserResponse {
  user: User;
}

export interface ProfileResponse {
  profile: Profile;
}
