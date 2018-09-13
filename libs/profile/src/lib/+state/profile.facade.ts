import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Follow, UnFollow } from './profile.actions';
import { getProfile, ProfileState } from './profile.reducer';

@Injectable()
export class ProfileFacade {
  profile$ = this.store.select(getProfile);

  constructor(private store: Store<ProfileState>) {}

  follow(username: string) {
    this.store.dispatch(new Follow(username));
  }

  unfollow(username: string) {
    this.store.dispatch(new UnFollow(username));
  }
}
