import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ArticleListComponent } from '@realworld/articles/feature-articles-list';
import { AuthGuardService } from '@realworld/auth/data-access';
import {
  ProfileArticlesResolverService,
  ProfileEffects,
  ProfileFavoritesResolverService,
  profileFeature,
  ProfileResolverService,
} from '@realworld/profile/data-access';

export const profileRoutes: Routes = [
  {
    path: '',
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
    providers: [
      importProvidersFrom(EffectsModule.forFeature([ProfileEffects]), StoreModule.forFeature(profileFeature)),
    ],
    resolve: { ProfileResolverService },
    canActivate: [AuthGuardService],
  },
];
