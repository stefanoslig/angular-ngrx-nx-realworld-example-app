import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ArticlesListStore, articlesListInitialState } from '@realworld/articles/data-access';
import { of } from 'rxjs';

export const profileArticlesResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const username = route.params['username'];
  const articlesListStore = inject(ArticlesListStore);

  articlesListStore.setListConfig({
    ...articlesListInitialState.listConfig,
    filters: {
      ...articlesListInitialState.listConfig.filters,
      author: username,
    },
  });

  return of(true);
};
