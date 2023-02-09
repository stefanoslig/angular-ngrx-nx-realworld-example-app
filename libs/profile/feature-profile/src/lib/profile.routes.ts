import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ArticleListEffects, articleListFeature } from '@realworld/articles/data-access/src';
import { ArticleListComponent } from '@realworld/articles/feature-articles-list/src';
import { AuthGuardService } from '@realworld/auth/data-access';
import {
  ProfileArticlesResolverService,
  profileEffects,
  ProfileFavoritesResolverService,
  profileFeature,
  ProfileResolverService,
} from '@realworld/profile/data-access';
import { ProfileComponent } from './profile.component';

export const PROFILE_ROUTES: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    providers: [
      provideState(profileFeature),
      provideState(articleListFeature),
      provideEffects(profileEffects, ArticleListEffects),
    ],
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
];
