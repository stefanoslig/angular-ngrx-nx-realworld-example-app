import { NgModule } from '@angular/core';
import { ArticleGuardService } from './article-guard.service';
import { RouterModule } from '@angular/router';
import { ArticleComponent } from './article.component';
import { ArticlesDataAccessModule } from '@realworld/articles/data-access';

@NgModule({
  imports: [
    ArticlesDataAccessModule,
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
