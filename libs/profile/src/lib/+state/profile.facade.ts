import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProfileActions from './profile.actions';

import { getProfile, ProfileState } from './profile.reducer';

@Injectable()
export class ProfileFacade {
  profile$ = this.store.select(getProfile);

  constructor(private store: Store<ProfileState>) {}

  follow(id: string) {
    this.store.dispatch(ProfileActions.follow({ id }));
  }

  unfollow(id: string) {
    this.store.dispatch(ProfileActions.unFollow({ id }));
  }
}
