import { ArticleList } from './article-list.interfaces';

export const articleListInitialState: ArticleList = {
  listConfig: {
    type: 'ALL',
    currentPage: 1,
    filters: {
      limit: 10
    }
  },
  articles: {
    entities: [],
    articlesCount: 0,
    loaded: false,
    loading: false
  }
};
