//import { Profile } from './profile.model';

export interface Article {
  data: ArticleData;
  comments: ArticleComment[];
}

export interface ArticleState {
  readonly article: Article;
}

export interface ArticleComment {
  id: number;
  body: string;
  createdAt: string;
  author: any; //Profile;
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
  author: any; //Profile;
}
