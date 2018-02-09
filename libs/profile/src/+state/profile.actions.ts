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

export type ProfileAction = GetProfile | GetProfileSuccess | GetProfileFail;
