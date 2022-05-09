import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article, Profile, Comment } from '@realworld/core/api-types';

export const articleActions = createActionGroup({
  source: 'Article',
  events: {
    'Load Article': props<{ slug: string }>(),
    'Load Article Failure': props<{ error: Error }>(),
    'Load Article Success': props<{ article: Article }>(),
    'Delete Article': props<{ slug: string }>(),
    'Delete Article Failure': props<{ error: Error }>(),
    'Delete Article Success': emptyProps(),
    'Initialize Article': emptyProps(),
    'Load Comments': props<{ slug: string }>(),
    'Load Comments Failure': props<{ error: Error }>(),
    'Load Comments Success': props<{ comments: Comment[] }>(),
    Follow: props<{ username: string }>(),
    'Follow Failure': props<{ error: Error }>(),
    'Follow Success': props<{ profile: Profile }>(),
    Unfollow: props<{ username: string }>(),
    'Unfollow Failure': props<{ error: Error }>(),
    'Unfollow Success': props<{ profile: Profile }>(),
    'Add Comment': props<{ slug: string }>(),
    'Add Comment Failure': props<{ error: Error }>(),
    'Add Comment Success': props<{ comment: Comment }>(),
    'Delete Comment': props<{ commentId: number; slug: string }>(),
    'Delete Comment Failure': props<{ error: Error }>(),
    'Delete Comment Success': props<{ commentId: number }>(),
  },
});
