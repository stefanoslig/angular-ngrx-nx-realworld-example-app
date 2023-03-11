import { articleListActions, articleListInitialState } from '@realworld/articles/data-access';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

export const profileArticlesResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const username = route.params['username'];
  const store = inject(Store);

  store.dispatch(
    articleListActions.setListConfig({
      config: {
        ...articleListInitialState.listConfig,
        filters: {
          ...articleListInitialState.listConfig.filters,
          author: username,
        },
      },
    }),
  );

  return of(true);
};
