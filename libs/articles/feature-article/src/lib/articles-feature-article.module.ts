import { NgModule } from '@angular/core';
import { ArticleGuardService } from './article-guard.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { ArticleComponent } from './article.component';
import { articleFeature, ArticleEffects } from '@realworld/articles/data-access';

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
export class ArticlesFeatureArticleModule {}
