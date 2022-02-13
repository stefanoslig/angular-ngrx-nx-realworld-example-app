import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ArticleListEffects } from './+state/article-list.effects';
import { ArticleListFacade } from './+state/article-list.facade';
import { articleListFeature } from './+state/article-list.reducer';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import { ArticleListComponent } from './article-list.component';
import { ArticleListService } from './article-list.service';
import { PagerComponentModule } from '@angular-ngrx-nx-realworld-example-app/shared';

@NgModule({
  imports: [
    CommonModule,
    PagerComponentModule,
    RouterModule,
    StoreModule.forFeature(articleListFeature),
    EffectsModule.forFeature([ArticleListEffects]),
  ],
  declarations: [ArticleListComponent, ArticleListItemComponent],
  providers: [ArticleListService, ArticleListEffects, ArticleListFacade],
  exports: [ArticleListComponent],
})
export class ArticleListModule {}
