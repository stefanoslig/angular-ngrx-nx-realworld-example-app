import { Profile } from '@realworld/core/api-types';
import { createFeature, createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';

export type ProfileState = Profile;

export const profileInitialState: ProfileState = {
  username: '',
  bio: '',
  image: '',
  following: false,
  loading: false,
};

export const profileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    profileInitialState,
    on(ProfileActions.getProfile, (state) => ({ ...state, loading: true })),
    on(ProfileActions.getProfileSuccess, (state, action) => ({ ...action.profile, loading: false })),
    on(ProfileActions.getProfileFail, () => profileInitialState),
    on(ProfileActions.followSuccess, ProfileActions.unFollowSuccess, (state, action) => action.profile),
  ),
});
