import { createAction, props } from '@ngrx/store';
import { Article, Profile } from '@realworld/core/api-types';

export const loadArticle = createAction('[article] LOAD_ARTICLE', props<{ slug: string }>());

export const loadArticleSuccess = createAction('[article] LOAD_ARTICLE_SUCCESS', props<{ article: Article }>());

export const loadArticleFail = createAction('[article] LOAD_ARTICLE_FAIL', props<{ error: Error }>());

export const deleteArticle = createAction('[article] DELETE_ARTICLE', props<{ slug: string }>());

export const deleteArticleFail = createAction('[article] DELETE_ARTICLE_FAIL', props<{ error: Error }>());

export const deleteArticleSuccess = createAction('[article] DELETE_ARTICLE_SUCCESS');

export const initializeArticle = createAction('[article] INITIALIZE_ARTICLE');

export const loadComments = createAction('[article] LOAD_COMMENTS', props<{ slug: string }>());

export const loadCommentsSuccess = createAction('[article] LOAD_COMMENTS_SUCCESS', props<{ comments: Comment[] }>());

export const loadCommentsFail = createAction('[article] LOAD_COMMENTS_FAIL', props<{ error: Error }>());

export const follow = createAction('[article] FOLLOW', props<{ username: string }>());

export const followSuccess = createAction('[article] FOLLOW_SUCCESS', props<{ profile: Profile }>());

export const followFail = createAction('[article] FOLLOW_FAIL', props<{ error: Error }>());

export const unFollow = createAction('[article] UNFOLLOW', props<{ username: string }>());

export const unFollowSuccess = createAction('[article] UNFOLLOW_SUCCESS', props<{ profile: Profile }>());

export const unFollowFail = createAction('[article] UNFOLLOW_FAIL', props<{ error: Error }>());

export const addComment = createAction('[article] ADD_COMMENT', props<{ slug: string }>());

export const addCommentFail = createAction('[article] ADD_COMMENT_FAIL', props<{ error: Error }>());

export const addCommentSuccess = createAction('[article] ADD_COMMENT_SUCCESS', props<{ comment: Comment }>());

export const deleteComment = createAction('[article] DELETE_COMMENT', props<{ commentId: number; slug: string }>());

export const deleteCommentFail = createAction('[article] DELETE_COMMENT_FAIL', props<{ error: Error }>());

export const deleteCommentSuccess = createAction('[article] DELETE_COMMENT_SUCCESS', props<{ commentId: number }>());
