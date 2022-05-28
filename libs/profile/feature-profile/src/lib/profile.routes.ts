import { Route } from '@angular/router';
import { ArticleListComponent } from '@realworld/articles/feature-articles-list/src';
import { ProfileArticlesResolverService, ProfileFavoritesResolverService } from '@realworld/profile/data-access';

export const profileRoutes: Route[] = [
  {
    path: '',
    component: ArticleListComponent,
    resolve: { ProfileArticlesResolverService },
  },
  {
    path: 'favorites',
    component: ArticleListComponent,
    resolve: { ProfileFavoritesResolverService },
  },
];
