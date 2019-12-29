export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
  loading: boolean;
}

export interface ArticleComment {
  comment: {
    id: number;
    body: string;
    createdAt: string;
    author: Profile;
  };
}

export interface ArticleCommentPost {
  comment: {
    body: string;
  };
}

export interface ArticleData {
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

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
}
