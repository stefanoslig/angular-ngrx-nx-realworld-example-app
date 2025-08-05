import { Article } from '@realworld/core/api-types';

export interface ArticlesListState {
  listConfig: ArticlesListConfig;
  articles: Articles;
}

export interface ArticlesListConfig {
  type: ListType;
  currentPage: number;
  filters: Filters;
}

export interface Filters {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
  search?: string;
}

export type ListType = 'ALL' | 'FEED';

export interface Articles {
  entities: Article[];
  articlesCount: number;
}

export const articlesListInitialState: ArticlesListState = {
  listConfig: {
    type: 'ALL',
    currentPage: 1,
    filters: {
      limit: 10,
    },
  },
  articles: {
    entities: [],
    articlesCount: 0,
  },
};
