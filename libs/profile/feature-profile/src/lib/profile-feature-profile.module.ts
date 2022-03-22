import { ArticleListComponent } from '@realworld/articles/articles-list';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ArticlesDataAccessModule } from '@realworld/articles/data-access';
import {
  ProfileResolverService,
  ProfileArticlesResolverService,
  ProfileFavoritesResolverService,
  ProfileDataAccessModule,
} from '@realworld/profile/data-access';
import { AuthGuardService } from '@realworld/auth/data-access';

@NgModule({
  imports: [
    ProfileDataAccessModule,
    ArticlesDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
        resolve: { ProfileResolverService },
        canActivate: [AuthGuardService],
        children: [
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
        ],
      },
    ]),
  ],
})
export class ProfileFeatureProfileModule {}
