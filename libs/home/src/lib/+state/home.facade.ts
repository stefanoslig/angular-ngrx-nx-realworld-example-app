import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { HomeState } from './home.reducer';
import { homeQuery } from './home.selectors';
import { LoadTags, LoadTagsSuccess, LoadTagsFail } from './home.actions';

@Injectable()
export class HomeFacade {
  home$ = this.store.select(homeQuery.getHome);
  tags$ = this.store.select(homeQuery.getTags);

  constructor(private store: Store<HomeState>) {}

  loadTags() {
    this.store.dispatch(new LoadTags());
  }
}
