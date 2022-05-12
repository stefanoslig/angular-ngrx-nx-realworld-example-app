import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { homeQuery } from './home.selectors';
import { homeActions } from './home.actions';

@Injectable({ providedIn: 'root' })
export class HomeFacade {
  home$ = this.store.select(homeQuery.selectHomeState);
  tags$ = this.store.select(homeQuery.selectTags);

  constructor(private store: Store) {}

  loadTags() {
    this.store.dispatch(homeActions.loadTags());
  }
}
