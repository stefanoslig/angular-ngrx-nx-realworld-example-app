import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { articleEditEffects } from '@realworld/articles/data-access';
import { authGuard } from '@realworld/auth/data-access';
import { ArticleEditComponent } from './article-edit.component';
import { articleEditResolver } from './resolvers/article-edit-resolver';

export const ARTICLE_EDIT_ROUTES: Routes = [
  {
    path: '',
    component: ArticleEditComponent,
    providers: [provideEffects(articleEditEffects)],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ArticleEditComponent,
        canActivate: [authGuard],
      },
      {
        path: ':slug',
        component: ArticleEditComponent,
        resolve: { articleEditResolver },
      },
    ],
  },
];
