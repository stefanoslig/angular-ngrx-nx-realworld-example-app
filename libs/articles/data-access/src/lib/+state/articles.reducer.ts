import { articleFeature, articleInitialState, ArticleState } from './article/article.reducer';
import { articleListFeature, articleListInitialState, ArticleListState } from './article-list/article-list.reducer';

export interface ArticlesState {
  article: ArticleState;
  'article-list': ArticleListState;
}

export const articlesInitialState: ArticlesState = {
  article: articleInitialState,
  'article-list': articleListInitialState,
};

export const articlesFeatureReducer = {
  article: articleFeature,
  'article-list': articleListFeature,
};
