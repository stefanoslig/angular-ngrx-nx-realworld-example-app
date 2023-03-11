import { articleListActions, articleListInitialState } from '@realworld/articles/data-access';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

export const profileFavoritesResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const username = route?.parent?.params['username'];
  const store = inject(Store);

  store.dispatch(
    articleListActions.setListConfig({
      config: {
        ...articleListInitialState.listConfig,
        filters: {
          ...articleListInitialState.listConfig.filters,
          favorited: username,
        },
      },
    }),
  );

  return of(true);
};
