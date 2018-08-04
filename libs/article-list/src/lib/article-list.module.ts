import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list.component';
import { ArticleListService } from './article-list.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { articleListReducer } from './+state/article-list.reducer';
import { articleListInitialState } from './+state/article-list.init';
import { ArticleListEffects } from './+state/article-list.effects';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import { SharedModule } from '@angular-ngrx-nx-realworld-example-app/shared';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature('articleList', articleListReducer, { initialState: articleListInitialState }),
    EffectsModule.forFeature([ArticleListEffects])
  ],
  declarations: [ArticleListComponent, ArticleListItemComponent],
  providers: [ArticleListService, ArticleListEffects],
  exports: [ArticleListComponent]
})
export class ArticleListModule {}
