import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ArticleListEffects } from './+state/article-list.effects';
import { ArticleListFacade } from './+state/article-list.facade';
import { articleListFeature } from './+state/article-list.reducer';
import { ArticleListComponentModule } from './article-list.component';

@NgModule({
  imports: [StoreModule.forFeature(articleListFeature), EffectsModule.forFeature([ArticleListEffects])],
  providers: [ArticleListFacade],
})
export class ArticleListModule {}
