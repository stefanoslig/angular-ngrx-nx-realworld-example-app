import { articleListInitialState } from '@angular-ngrx-nx-realworld-example-app/article-list';
import * as fromArticleList from '@angular-ngrx-nx-realworld-example-app/article-list';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getProfile } from './+state/profile.actions';
import { Profile } from '@angular-ngrx-nx-realworld-example-app/api';

@Injectable()
export class ProfileResolverService implements Resolve<Profile> {
  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const username = route.params['username'];
    this.store.dispatch(getProfile({ id: username }));
  }
}

@Injectable()
export class ProfileArticlesResolverService implements Resolve<Profile> {
  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const username = route.params['username'];
    this.store.dispatch(
      fromArticleList.setListConfig({
        config: {
          ...articleListInitialState.listConfig,
          filters: {
            ...articleListInitialState.listConfig.filters,
            author: username,
          },
        },
      }),
    );
  }
}

@Injectable()
export class ProfileFavoritesResolverService implements Resolve<Profile> {
  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const username = route.parent.params['username'];
    this.store.dispatch(
      fromArticleList.setListConfig({
        config: {
          ...articleListInitialState.listConfig,
          filters: {
            ...articleListInitialState.listConfig.filters,
            favorited: username,
          },
        },
      }),
    );
  }
}
