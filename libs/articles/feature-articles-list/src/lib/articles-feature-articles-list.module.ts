import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [StoreModule.forFeature(articleListFeature), EffectsModule.forFeature([ArticleListEffects])],
  providers: [ArticleListFacade],
})
export class ArticlesFeatureArticlesListModule {}
