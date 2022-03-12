import { articleListInitialState, ArticlesFacade } from '@realworld/articles/data-access';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getProfile } from './+state/profile.actions';
import { Profile } from '@realworld/core/api-types';

@Injectable()
export class ProfileResolverService implements Resolve<Profile> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const username = route.params['username'];
    this.store.dispatch(getProfile({ id: username }));
  }
}

@Injectable()
export class ProfileArticlesResolverService implements Resolve<Profile> {
  constructor(private readonly articlesFacade: ArticlesFacade) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const username = route.params['username'];
    this.articlesFacade.setListConfig({
      ...articleListInitialState.listConfig,
      filters: {
        ...articleListInitialState.listConfig.filters,
        author: username,
      },
    });
  }
}

@Injectable()
export class ProfileFavoritesResolverService implements Resolve<Profile> {
  constructor(private readonly articlesFacade: ArticlesFacade) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const username = route?.parent?.params['username'];
    this.articlesFacade.setListConfig({
      ...articleListInitialState.listConfig,
      filters: {
        ...articleListInitialState.listConfig.filters,
        favorited: username,
      },
    });
  }
}
