import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ArticleStore } from '@realworld/articles/data-access/src';
import { of } from 'rxjs';

export const articleEditResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const slug = route.params['slug'];
  const articleStore = inject(ArticleStore);

  if (slug) {
    articleStore.getArticle(slug);
  }

  return of(true);
};
