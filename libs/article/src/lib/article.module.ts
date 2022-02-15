import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ArticleEffects } from './+state/article.effects';
import { articleFeature } from './+state/article.reducer';
import { ArticleGuardService } from './article-guard.service';
import { ArticleComponent } from './article.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ArticleComponent,
        canActivate: [ArticleGuardService],
      },
    ]),
    StoreModule.forFeature(articleFeature),
    EffectsModule.forFeature([ArticleEffects]),
  ],
  providers: [ArticleGuardService],
})
export class ArticleModule {}
