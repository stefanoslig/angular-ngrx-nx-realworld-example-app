import { NgModule } from '@angular/core';
import { ArticleGuardService } from './article-guard.service';
import { RouterModule } from '@angular/router';
import { ArticleComponent } from './article.component';
import { articleFeature, ArticleEffects } from '@realworld/articles/data-access';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    StoreModule.forFeature(articleFeature),
    EffectsModule.forFeature([ArticleEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: ArticleComponent,
        canActivate: [ArticleGuardService],
      },
    ]),
  ],
  providers: [ArticleGuardService],
})
export class ArticleFeatureArticleModule {}
