import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { articlesEffects } from '@realworld/articles/data-access';
import { ArticleComponent } from './article.component';

export const ARTICLE_ROUTES: Routes = [
  {
    path: ':slug',
    component: ArticleComponent,
    providers: [provideEffects(articlesEffects)],
  },
];
