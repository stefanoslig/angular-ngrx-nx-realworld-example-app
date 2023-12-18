import { Article, Comment } from '@realworld/core/api-types';

export interface ArticleState {
  data: Article;
  comments: Comment[];
}
