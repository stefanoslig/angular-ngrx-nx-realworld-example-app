import { articleListInitialState, ArticlesFacade } from '@realworld/articles/data-access';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProfileFavoritesResolverService implements Resolve<void> {
  constructor(private readonly articlesFacade: ArticlesFacade) {}

  resolve(route: ActivatedRouteSnapshot): void {
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
