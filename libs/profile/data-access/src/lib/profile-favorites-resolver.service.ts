import { articleListActions, articleListInitialState } from '@realworld/articles/data-access';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class ProfileFavoritesResolverService implements Resolve<void> {
  constructor(private readonly store: Store) {}

  resolve(route: ActivatedRouteSnapshot): void {
    const username = route?.parent?.params['username'];
    this.store.dispatch(
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
  }
}
