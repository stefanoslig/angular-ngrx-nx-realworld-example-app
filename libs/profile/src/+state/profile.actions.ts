import { Profile } from '@angular-ngrx-nx/profile/src/+state/profile.interfaces';

export interface GetProfile {
	type: '[profile] GET_PROFILE';
	payload: string;
}

export interface GetProfileSuccess {
	type: '[profile] GET_PROFILE_SUCCESS';
	payload: Profile;
}

export interface GetProfileFail {
	type: '[profile] GET_PROFILE_FAIL';
	payload: Error;
}

export interface Follow {
	type: '[profile] FOLLOW';
	payload: string;
}

export interface FollowSuccess {
	type: '[profile] FOLLOW_SUCCESS';
	payload: Profile;
}

export interface FollowFail {
	type: '[profile] FOLLOW_FAIL';
	payload: Error;
}

export interface UnFollow {
	type: '[profile] UNFOLLOW';
	payload: string;
}

export interface UnFollowSuccess {
	type: '[profile] UNFOLLOW_SUCCESS';
	payload: Profile;
}

export interface UnFollowFail {
	type: '[profile] UNFOLLOW_FAIL';
	payload: Error;
}



export type ProfileAction =
	GetProfile |
	GetProfileSuccess |
	GetProfileFail |
	Follow |
	FollowSuccess |
	FollowFail |
	UnFollow |
	UnFollowSuccess |
	UnFollowFail;
