import { Profile } from '@realworld/core/api-types';

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
