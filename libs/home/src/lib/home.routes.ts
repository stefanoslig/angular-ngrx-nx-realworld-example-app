import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ArticleListEffects, articleListFeature } from '@realworld/articles/data-access';
import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    providers: [
      importProvidersFrom(StoreModule.forFeature(articleListFeature), EffectsModule.forFeature([ArticleListEffects])),
    ],
  },
];
