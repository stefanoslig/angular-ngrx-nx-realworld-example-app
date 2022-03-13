import { ArticlesFeatureArticlesListModule } from '@realworld/articles/articles-list';
import { ArticleListComponent } from '@realworld/articles/articles-list';
import { AuthGuardService } from '@angular-ngrx-nx-realworld-example-app/auth';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { articleListFeature, articlesFeatureEffects } from '@realworld/articles/data-access';

import { ProfileEffects } from './+state/profile.effects';
import { ProfileFacade } from './+state/profile.facade';
import { profileFeature } from './+state/profile.reducer';
import {
  ProfileArticlesResolverService,
  ProfileFavoritesResolverService,
  ProfileResolverService,
} from './profile-resolver.service';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    ArticlesFeatureArticlesListModule,
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
    StoreModule.forFeature(articleListFeature),
    EffectsModule.forFeature(articlesFeatureEffects),
    StoreModule.forFeature(profileFeature),
    EffectsModule.forFeature([ProfileEffects]),
  ],
  providers: [ProfileResolverService, ProfileArticlesResolverService, ProfileFavoritesResolverService, ProfileFacade],
})
export class ProfileModule {}
