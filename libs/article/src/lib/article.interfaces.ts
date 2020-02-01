import { Profile } from '@angular-ngrx-nx-realworld-example-app/api';

export interface SingleCommentResponse {
  comment: Comment;
}

export interface MultipleCommentsResponse {
  comments: Comment[];
}

export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}
