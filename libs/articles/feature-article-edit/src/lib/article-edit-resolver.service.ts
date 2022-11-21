import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { articleActions } from '@realworld/articles/data-access';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticleEditResolverService implements Resolve<Observable<boolean>> {
  constructor(private readonly store: Store) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const slug = route.params['slug'];
    if (slug) {
      this.store.dispatch(articleActions.loadArticle({ slug }));
    }
    return of(true);
  }
}
