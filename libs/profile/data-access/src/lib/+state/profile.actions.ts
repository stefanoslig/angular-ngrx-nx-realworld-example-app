import { Profile } from '@realworld/core/api-types';
import { createActionGroup, props } from '@ngrx/store';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Load Profile': props<{ id: string }>(),
    'Load Profile Failure': props<{ error: Error }>(),
    'Load Profile Success': props<{ profile: Profile }>(),
    Follow: props<{ id: string }>(),
    'Follow Failure': props<{ error: Error }>(),
    'Follow Success': props<{ profile: Profile }>(),
    Unfollow: props<{ id: string }>(),
    'Unfollow Failure': props<{ error: Error }>(),
    'Unfollow Success': props<{ profile: Profile }>(),
  },
});
