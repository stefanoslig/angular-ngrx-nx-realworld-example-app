import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';

import { profileActions } from './+state/profile.actions';

@Injectable({ providedIn: 'root' })
export class ProfileResolverService implements Resolve<void> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot): void {
    const username = route.params['username'];
    this.store.dispatch(profileActions.loadProfile({ id: username }));
  }
}
