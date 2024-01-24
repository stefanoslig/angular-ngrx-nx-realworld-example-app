import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { ArticlesListStore, articlesListInitialState } from '@realworld/articles/data-access';

export const profileFavoritesResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const username = route?.parent?.params['username'];
  const articlesListStore = inject(ArticlesListStore);

  articlesListStore.setListConfig({
    ...articlesListInitialState.listConfig,
    filters: {
      ...articlesListInitialState.listConfig.filters,
      favorited: username,
    },
  });

  return of(true);
};
