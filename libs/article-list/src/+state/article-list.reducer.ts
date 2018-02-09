import { ArticleList, ListType, Articles, ArticleListState } from './article-list.interfaces';
import { ArticleListAction } from './article-list.actions';
import { ArticleData } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

export function articleListReducer(state: ArticleList, action: ArticleListAction): ArticleList {
  switch (action.type) {
    case '[article-list] SET_LIST_TYPE': {
      const listConfig = { ...state.listConfig, type: action.payload };
      return { ...state, listConfig };
    }
    case '[article-list] SET_LIST_PAGE': {
      const filters = { ...state.listConfig.filters, offset: state.listConfig.filters.limit * (action.payload - 1) };
      const listConfig = { ...state.listConfig, currentPage: action.payload, filters };
      return { ...state, listConfig };
    }
    case '[article-list] SET_LIST_TAG': {
      const filters = { ...state.listConfig.filters, tag: action.payload };
      const listConfig = { ...state.listConfig, type: 'ALL' as ListType, filters };
      return { ...state, listConfig };
    }
    case '[article-list] LOAD_ARTICLES': {
      const articles = { ...state.articles, loading: true };
      return { ...state, articles };
    }
    case '[article-list] LOAD_ARTICLES_SUCCESS': {
      const articles = {
        ...state.articles,
        entities: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        loading: false,
        loaded: true
      };
      return { ...state, articles };
    }
    case '[article-list] LOAD_ARTICLES_FAIL': {
      const articles = { ...state.articles, entities: [], articlesCount: 0, loading: false, loaded: true };
      return { ...state, articles };
    }
    case '[article-list] FAVORITE_SUCCESS':
    case '[article-list] UNFAVORITE_SUCCESS': {
      return { ...state, articles: replaceArticle(state.articles, action.payload) };
    }
    default: {
      return state;
    }
  }
}

const replaceArticle = (articles: Articles, payload: ArticleData): Articles => {
  const articleIndex = articles.entities.findIndex(a => a.slug === payload.slug);
  const entities = [
    ...articles.entities.slice(0, articleIndex),
    Object.assign({}, articles.entities[articleIndex], payload),
    ...articles.entities.slice(articleIndex + 1)
  ];
  return { ...articles, entities, loading: false, loaded: true };
};

export const getListConfig = (state: ArticleListState) => state.articleList.listConfig;
export const getArticles = (state: ArticleListState) => state.articleList.articles.entities;
export const getArticlesCount = (state: ArticleListState) => state.articleList.articles.articlesCount;
