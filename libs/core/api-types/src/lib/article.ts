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

export interface NewArticle {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

export interface ArticleResponse {
  article: Article;
}
