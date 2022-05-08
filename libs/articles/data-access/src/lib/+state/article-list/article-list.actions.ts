import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from '@realworld/core/api-types';

import { ArticleListConfig } from './article-list.reducer';

export const articleListActions = createActionGroup({
  source: 'Article List',
  events: {
    'Set List Page': props<{ page: number }>(),
    'Set List Config': props<{ config: ArticleListConfig }>(),
    'Load Articles': emptyProps(),
    'Load Articles Failure': props<{ error: Error }>(),
    'Load Articles Success': props<{ articles: Article[]; articlesCount: number }>(),
  },
});
