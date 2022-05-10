import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { profileActions } from './profile.actions';

import { ProfileState } from './profile.reducer';
import { profileQuery } from './profile.selectors';

@Injectable()
export class ProfileFacade {
  profile$ = this.store.select(profileQuery.selectProfileState);

  constructor(private store: Store<ProfileState>) {}

  follow(id: string) {
    this.store.dispatch(profileActions.follow({ id }));
  }

  unfollow(id: string) {
    this.store.dispatch(profileActions.unfollow({ id }));
  }
}
