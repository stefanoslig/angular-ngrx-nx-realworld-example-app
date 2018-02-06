import { Article } from '@angular-ngrx-nx/article/src/+state/article.interfaces';

export interface PublishArticle {
  type: '[editor] PUBLISH_ARTICLE';
  payload: Article;
}

export type EditorAction = PublishArticle;
