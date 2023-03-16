import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { articleListEffects, articleListFeature } from '@realworld/articles/data-access/src';
import { ArticleListComponent } from '@realworld/articles/feature-articles-list/src';
import { authGuard } from '@realworld/auth/data-access';
import {
  profileArticlesResolver,
  profileEffects,
  profileFavoritesResolver,
  profileFeature,
  profileResolver,
} from '@realworld/profile/data-access';
import { ProfileComponent } from './profile.component';

export const PROFILE_ROUTES: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    providers: [
      provideState(profileFeature),
      provideState(articleListFeature),
      provideEffects(profileEffects, articleListEffects),
    ],
    resolve: { profileResolver },
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: ArticleListComponent,
        resolve: { profileArticlesResolver },
      },
      {
        path: 'favorites',
        component: ArticleListComponent,
        resolve: { profileFavoritesResolver },
      },
    ],
  },
];
