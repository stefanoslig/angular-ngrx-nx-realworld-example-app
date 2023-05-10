import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from '@realworld/core/api-types';

import { ArticleListConfig } from './article-list.reducer';

export const articleListActions = createActionGroup({
  source: 'Article List',
  events: {
    setListPage: props<{ page: number }>(),
    setListConfig: props<{ config: ArticleListConfig }>(),
    loadArticles: emptyProps(),
    loadArticlesFailure: props<{ error: Error }>(),
    loadArticlesSuccess: props<{ articles: Article[]; articlesCount: number }>(),
  },
});
