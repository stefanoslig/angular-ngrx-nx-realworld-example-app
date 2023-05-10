import { User } from '@realworld/core/api-types';
import { createActionGroup, props, emptyProps } from '@ngrx/store';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    getUser: emptyProps(),
    getUserFailure: props<{ error: Error }>(),
    getUserSuccess: props<{ user: User }>(),
    login: emptyProps(),
    loginFailure: props<{ error: Error }>(),
    loginSuccess: props<{ user: User }>(),
    register: emptyProps(),
    registerFailure: props<{ error: Error }>(),
    registerSuccess: props<{ user: User }>(),
    logout: emptyProps(),
  },
});
