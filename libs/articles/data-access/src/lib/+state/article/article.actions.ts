import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article, Profile, Comment } from '@realworld/core/api-types';

export const articleActions = createActionGroup({
  source: 'Article',
  events: {
    loadArticle: props<{ slug: string }>(),
    loadArticleFailure: props<{ error: Error }>(),
    loadArticleSuccess: props<{ article: Article }>(),
    deleteArticle: props<{ slug: string }>(),
    deleteArticleFailure: props<{ error: Error }>(),
    deleteArticleSuccess: emptyProps(),
    initializeArticle: emptyProps(),
    loadComments: props<{ slug: string }>(),
    loadCommentsFailure: props<{ error: Error }>(),
    loadCommentsSuccess: props<{ comments: Comment[] }>(),
    follow: props<{ username: string }>(),
    followFailure: props<{ error: Error }>(),
    followSuccess: props<{ profile: Profile }>(),
    unfollow: props<{ username: string }>(),
    unfollowFailure: props<{ error: Error }>(),
    unfollowSuccess: props<{ profile: Profile }>(),
    addComment: props<{ slug: string }>(),
    addCommentFailure: props<{ error: Error }>(),
    addCommentSuccess: props<{ comment: Comment }>(),
    deleteComment: props<{ commentId: number; slug: string }>(),
    deleteCommentFailure: props<{ error: Error }>(),
    deleteCommentSuccess: props<{ commentId: number }>(),
  },
});
