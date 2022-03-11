import { AuthGuardService } from '@angular-ngrx-nx-realworld-example-app/auth';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ArticleEditResolverService } from './article-edit-resolver.service';
import { ArticleEditComponent } from './article-edit.component';
import { articleFeature, articlesFeatureEffects } from '@realworld/articles/data-access';

@NgModule({
  imports: [
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
    StoreModule.forFeature(articleFeature),
    EffectsModule.forFeature(articlesFeatureEffects),
  ],
  providers: [ArticleEditResolverService],
})
export class ArticlesFeatureArticleEditModule {}
