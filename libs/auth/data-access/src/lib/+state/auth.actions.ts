import { User } from '@realworld/core/api-types';
import { createActionGroup, props, emptyProps } from '@ngrx/store';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'Get User': emptyProps(),
    'Get User Failure': props<{ error: Error }>(),
    'Get User Success': props<{ user: User }>(),
    Login: emptyProps(),
    'Login Failure': props<{ error: Error }>(),
    'Login Success': props<{ user: User }>(),
    Register: emptyProps(),
    'Register Failure': props<{ error: Error }>(),
    'Register Success': props<{ user: User }>(),
    Logout: emptyProps(),
  },
});
