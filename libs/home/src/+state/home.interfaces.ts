//import { Profile } from './profile.model';

export type ListType = 'ALL' | 'FEED';

export interface Filters {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export interface ArticleListConfig {
  type: ListType;
  currentPage: number;
  filters: Filters;
}

export interface Home {
  listConfig: ArticleListConfig;
  articles: {
    entities: Article[];
    loaded: boolean;
    loading: boolean;
  };
  tags: string[];
}

export interface HomeState {
  readonly home: Home;
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
  author: any; //Profile;
}
