import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { articleActions } from '@realworld/articles/data-access';
import { of } from 'rxjs';

export const articleEditResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const slug = route.params['slug'];
  const store = inject(Store);

  if (slug) {
    store.dispatch(articleActions.loadArticle({ slug }));
  }

  return of(true);
};
