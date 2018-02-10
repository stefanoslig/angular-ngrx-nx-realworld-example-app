import { Profile, ProfileState } from './profile.interfaces';
import { ProfileAction } from './profile.actions';
import { profileInitialState } from '@angular-ngrx-nx/profile/src/+state/profile.init';

export function profileReducer(state: Profile, action: ProfileAction): Profile {
  switch (action.type) {
    case '[profile] GET_PROFILE_SUCCESS': {
      return action.payload;
    }
    case '[profile] GET_PROFILE_FAIL': {
      return profileInitialState;
    }
    default: {
      return state;
    }
  }
}

export const getProfile = (state: ProfileState) => state.profile;
