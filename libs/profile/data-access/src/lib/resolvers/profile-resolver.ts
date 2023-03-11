import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { profileActions } from '../+state/profile.actions';

export const profileResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const username = route.params['username'];
  const store = inject(Store);

  store.dispatch(profileActions.loadProfile({ id: username }));

  return of(true);
};
