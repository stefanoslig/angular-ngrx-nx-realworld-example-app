import { Profile } from './profile.reducer';
import { Action } from '@ngrx/store';

export enum ProfileActionTypes {
  GET_PROFILE = '[profile] GET_PROFILE',
  GET_PROFILE_SUCCESS = '[profile] GET_PROFILE_SUCCESS',
  GET_PROFILE_FAIL = '[profile] GET_PROFILE_FAIL',
  FOLLOW = '[profile] FOLLOW',
  FOLLOW_SUCCESS = '[profile] FOLLOW_SUCCESS',
  FOLLOW_FAIL = '[profile] FOLLOW_FAIL',
  UNFOLLOW = '[profile] UNFOLLOW',
  UNFOLLOW_SUCCESS = '[profile] UNFOLLOW_SUCCESS',
  UNFOLLOW_FAIL = '[profile] UNFOLLOW_FAIL'
}

export class GetProfile implements Action {
  readonly type = ProfileActionTypes.GET_PROFILE;
  constructor(public payload: string) {}
}

export class GetProfileSuccess implements Action {
  readonly type = ProfileActionTypes.GET_PROFILE_SUCCESS;
  constructor(public payload: Profile) {}
}

export class GetProfileFail implements Action {
  readonly type = ProfileActionTypes.GET_PROFILE_FAIL;
  constructor(public payload: Error) {}
}

export class Follow implements Action {
  readonly type = ProfileActionTypes.FOLLOW;
  constructor(public payload: string) {}
}

export class FollowSuccess implements Action {
  readonly type = ProfileActionTypes.FOLLOW_SUCCESS;
  constructor(public payload: Profile) {}
}

export class FollowFail implements Action {
  readonly type = ProfileActionTypes.FOLLOW_FAIL;
  constructor(public payload: Error) {}
}

export class UnFollow implements Action {
  readonly type = ProfileActionTypes.UNFOLLOW;
  constructor(public payload: string) {}
}

export class UnFollowSuccess implements Action {
  readonly type = ProfileActionTypes.UNFOLLOW_SUCCESS;
  constructor(public payload: Profile) {}
}

export class UnFollowFail implements Action {
  readonly type = ProfileActionTypes.UNFOLLOW_FAIL;
  constructor(public payload: Error) {}
}

export type ProfileAction =
  | GetProfile
  | GetProfileSuccess
  | GetProfileFail
  | Follow
  | FollowSuccess
  | FollowFail
  | UnFollow
  | UnFollowSuccess
  | UnFollowFail;
