import { createFeatureSelector, Action, createReducer, on } from '@ngrx/store';
import { Profile } from '@angular-ngrx-nx-realworld-example-app/api';
import * as ProfileActions from './profile.actions';

export const profileFeatureKey = 'profile';

export interface ProfileState {
  readonly [profileFeatureKey]: Profile;
}

export const profileInitialState: Profile = {
  username: '',
  bio: '',
  image: '',
  following: false,
  loading: false,
};

export const getProfile = createFeatureSelector<Profile>(profileFeatureKey);

const reducer = createReducer(
  profileInitialState,
  on(ProfileActions.getProfile, (state, action) => ({ ...state, loading: true })),
  on(ProfileActions.getProfileSuccess, (state, action) => ({ ...action.profile, loading: false })),
  on(ProfileActions.getProfileFail, (state, action) => profileInitialState),
  on(ProfileActions.followSuccess, ProfileActions.unFollowSuccess, (state, action) => action.profile),
);

export function profileReducer(state: Profile | undefined, action: Action): Profile {
  return reducer(state, action);
}
