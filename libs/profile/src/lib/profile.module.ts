import { ArticleListModule } from '@angular-ngrx-nx-realworld-example-app/article-list';
import { AuthGuardService } from '@angular-ngrx-nx-realworld-example-app/auth';
import { SharedModule } from '@angular-ngrx-nx-realworld-example-app/shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProfileEffects } from './+state/profile.effects';
import { ProfileFacade } from './+state/profile.facade';
import { profileInitialState, profileReducer, profileFeatureKey } from './+state/profile.reducer';
import { ProfileArticlesComponent } from './profile-articles.component';
import {
  ProfileArticlesResolverService,
  ProfileFavoritesResolverService,
  ProfileResolverService,
} from './profile-resolver.service';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';

@NgModule({
  imports: [
    CommonModule,
    ArticleListModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
        resolve: { ProfileResolverService },
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: ProfileArticlesComponent,
            resolve: { ProfileArticlesResolverService },
          },
          {
            path: 'favorites',
            component: ProfileArticlesComponent,
            resolve: { ProfileFavoritesResolverService },
          },
        ],
      },
    ]),
    StoreModule.forFeature(profileFeatureKey, profileReducer, {
      initialState: profileInitialState,
    }),
    EffectsModule.forFeature([ProfileEffects]),
  ],
  providers: [
    ProfileEffects,
    ProfileService,
    ProfileResolverService,
    ProfileArticlesResolverService,
    ProfileFavoritesResolverService,
    ProfileFacade,
  ],
  declarations: [ProfileComponent, ProfileArticlesComponent],
})
export class ProfileModule {}
