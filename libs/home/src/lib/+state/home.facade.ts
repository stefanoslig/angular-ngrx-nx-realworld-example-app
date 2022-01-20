import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { homeQuery } from './home.selectors';
import * as HomeActions from './home.actions';
import { HomeState } from './home.reducer';

@Injectable()
export class HomeFacade {
  home$ = this.store.select(homeQuery.selectHomeState);
  tags$ = this.store.select(homeQuery.selectTags);

  constructor(private store: Store<HomeState>) {}

  loadTags() {
    this.store.dispatch(HomeActions.loadTags());
  }
}
