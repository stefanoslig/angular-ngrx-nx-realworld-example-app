import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleEditResolverService } from './article-edit-resolver.service';
import { ArticleEditComponent } from './article-edit.component';
import { ArticlesDataAccessModule } from '@realworld/articles/data-access';
import { AuthGuardService } from '@realworld/auth/data-access';

@NgModule({
  imports: [
    ArticlesDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ArticleEditComponent,
        resolve: { ArticleEditResolverService },
        canActivate: [AuthGuardService],
      },
      {
        path: ':slug',
        component: ArticleEditComponent,
        resolve: { ArticleEditResolverService },
      },
    ]),
  ],
  providers: [ArticleEditResolverService],
})
export class ArticlesFeatureArticleEditModule {}
