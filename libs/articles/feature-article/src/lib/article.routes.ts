import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ArticleEffects, articleFeature } from '@realworld/articles/data-access';
import { ArticleGuardService } from './article-guard.service';
import { ArticleComponent } from './article.component';

export const ARTICLE_ROUTES: Routes = [
  {
    path: ':slug',
    component: ArticleComponent,
    providers: [
      importProvidersFrom(StoreModule.forFeature(articleFeature), EffectsModule.forFeature([ArticleEffects])),
    ],
    canActivate: [ArticleGuardService],
  },
];
