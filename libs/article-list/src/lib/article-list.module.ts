import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ArticleListEffects } from './+state/article-list.effects';
import { articleListFeature } from './+state/article-list.reducer';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import { ArticleListComponent } from './article-list.component';
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
  exports: [ArticleListComponent],
})
export class ArticleListModule {}
