import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { articleFeature } from './+state/article/article.reducer';
import { articlesFeatureEffects } from './+state/articles.effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(articleFeature), EffectsModule.forFeature(articlesFeatureEffects)],
})
export class ArticlesDataAccessModule {}
