import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { articleListFeature, articlesFeatureEffects } from '@realworld/articles/data-access';

@NgModule({
  imports: [StoreModule.forFeature(articleListFeature), EffectsModule.forFeature(articlesFeatureEffects)],
})
export class ArticlesFeatureArticlesListModule {}
