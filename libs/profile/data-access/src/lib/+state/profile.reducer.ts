import { Profile } from '@realworld/core/api-types';
import { createFeature, createReducer, on } from '@ngrx/store';
import { profileActions } from './profile.actions';

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
    on(profileActions.loadProfile, (state) => ({ ...state, loading: true })),
    on(profileActions.loadProfileSuccess, (state, action) => ({ ...action.profile, loading: false })),
    on(profileActions.loadProfileFailure, () => profileInitialState),
    on(profileActions.followSuccess, profileActions.unfollowSuccess, (state, action) => action.profile),
  ),
});
