import { Profile } from './profile';

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

export interface CreateArticle {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

export type EditArticle = CreateArticle;

export interface ArticleResponse {
  article: Article;
}
