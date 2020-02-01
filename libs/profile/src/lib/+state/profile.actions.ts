import { createAction, props } from '@ngrx/store';
import { Profile } from '@angular-ngrx-nx-realworld-example-app/api';

export const getProfile = createAction('[profile] GET_PROFILE', props<{ id: string }>());
export const getProfileSuccess = createAction('[profile] GET_PROFILE_SUCCESS', props<{ profile: Profile }>());
export const getProfileFail = createAction('[profile] GET_PROFILE_FAIL', props<{ error: Error }>());
export const follow = createAction('[profile] FOLLOW', props<{ id: string }>());
export const followSuccess = createAction('[profile] FOLLOW_SUCCESS', props<{ profile: Profile }>());
export const followFail = createAction('[profile] FOLLOW_FAIL', props<{ error: Error }>());
export const unFollow = createAction('[profile] UNFOLLOW', props<{ id: string }>());
export const unFollowSuccess = createAction('[profile] UNFOLLOW_SUCCESS', props<{ profile: Profile }>());
export const unFollowFail = createAction('[profile] UNFOLLOW_FAIL', props<{ error: Error }>());
