import { Routes } from '@angular/router';
import { ArticleComponent } from './article.component';

export const ARTICLE_ROUTES: Routes = [
  {
    path: ':slug',
    component: ArticleComponent,
  },
];
