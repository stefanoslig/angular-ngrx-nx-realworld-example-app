import { ArticleListModule } from '@angular-ngrx-nx-realworld-example-app/article-list';
import { ArticleListComponent } from '@angular-ngrx-nx-realworld-example-app/article-list/src/lib/article-list.component';
import { AuthGuardService } from '@angular-ngrx-nx-realworld-example-app/auth';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

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
    ArticleListModule,
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
    StoreModule.forFeature(profileFeature),
    EffectsModule.forFeature([ProfileEffects]),
  ],
  providers: [ProfileResolverService, ProfileArticlesResolverService, ProfileFavoritesResolverService, ProfileFacade],
})
export class ProfileModule {}
