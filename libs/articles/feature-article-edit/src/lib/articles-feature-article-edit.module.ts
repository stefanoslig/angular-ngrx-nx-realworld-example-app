import { AuthGuardService } from '@angular-ngrx-nx-realworld-example-app/auth';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleEditResolverService } from './article-edit-resolver.service';
import { ArticleEditComponent } from './article-edit.component';
import { ArticlesDataAccessModule } from '@realworld/articles/data-access';

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
