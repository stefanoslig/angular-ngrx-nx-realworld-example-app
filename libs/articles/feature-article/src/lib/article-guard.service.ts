import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { articleActions, articleQuery } from '@realworld/articles/data-access';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ArticleGuardService implements CanActivate {
  constructor(private readonly store: Store) {}

  waitForArticleToLoad(): Observable<boolean> {
    return this.store.select(articleQuery.selectLoaded).pipe(
      filter((loaded) => loaded),
      take(1),
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const slug = route.params['slug'];
    this.store.dispatch(articleActions.loadArticle({ slug }));

    return this.waitForArticleToLoad().pipe(tap(() => this.store.dispatch(articleActions.loadComments({ slug }))));
  }
}
