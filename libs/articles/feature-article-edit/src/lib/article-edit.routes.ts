import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ArticleEditEffects, articleFeature } from '@realworld/articles/data-access';
import { AuthGuardService } from '@realworld/auth/data-access';
import { ArticleEditResolverService } from './article-edit-resolver.service';
import { ArticleEditComponent } from './article-edit.component';

export const ARTICLE_EDIT_ROUTES: Routes = [
  {
    path: '',
    component: ArticleEditComponent,
    providers: [provideState(articleFeature), importProvidersFrom(EffectsModule.forFeature([ArticleEditEffects]))],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ArticleEditComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: ':slug',
        component: ArticleEditComponent,
        resolve: { ArticleEditResolverService },
      },
    ],
  },
];
