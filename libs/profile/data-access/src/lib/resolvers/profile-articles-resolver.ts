import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ArticleStore, ArticlesListStore, articlesListInitialState } from '@realworld/articles/data-access';
import { of } from 'rxjs';

export const profileArticlesResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const username = route.params['username'];
  const articlesListStore = inject(ArticlesListStore);

  const config = {
    ...articlesListInitialState.listConfig,
    filters: {
      ...articlesListInitialState.listConfig.filters,
      author: username,
    },
  };

  articlesListStore.setListConfig(config);
  articlesListStore.loadArticles(config);

  return of(true);
};
