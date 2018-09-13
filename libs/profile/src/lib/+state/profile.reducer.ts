import { ProfileAction, ProfileActionTypes } from './profile.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
  loading: boolean;
}

export interface ProfileState {
  readonly profile: Profile;
}

export const profileInitialState: Profile = {
  username: '',
  bio: '',
  image: '',
  following: false,
  loading: false
};

export function profileReducer(state: Profile, action: ProfileAction): Profile {
  switch (action.type) {
    case ProfileActionTypes.GET_PROFILE: {
      return { ...state, loading: true };
    }
    case ProfileActionTypes.GET_PROFILE_SUCCESS: {
      return { ...action.payload, loading: false };
    }
    case ProfileActionTypes.GET_PROFILE_FAIL: {
      return profileInitialState;
    }
    case ProfileActionTypes.FOLLOW_SUCCESS:
    case ProfileActionTypes.UNFOLLOW_SUCCESS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

export const getProfile = createFeatureSelector<Profile>('profile');
