import { Profile, Article } from '@angular-ngrx-nx-realworld-example-app/api';

export interface SingleCommentResponse {
  comment: Comment;
}

export interface MultipleCommentsResponse {
  comments: Comment[];
}

export interface SingleArticleResponse {
  article: Article;
}

export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}
