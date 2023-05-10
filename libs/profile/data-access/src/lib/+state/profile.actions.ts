import { Profile } from '@realworld/core/api-types';
import { createActionGroup, props } from '@ngrx/store';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    loadProfile: props<{ id: string }>(),
    loadProfileFailure: props<{ error: Error }>(),
    loadProfileSuccess: props<{ profile: Profile }>(),
    follow: props<{ id: string }>(),
    followFailure: props<{ error: Error }>(),
    followSuccess: props<{ profile: Profile }>(),
    unfollow: props<{ id: string }>(),
    unfollowFailure: props<{ error: Error }>(),
    unfollowSuccess: props<{ profile: Profile }>(),
  },
});
