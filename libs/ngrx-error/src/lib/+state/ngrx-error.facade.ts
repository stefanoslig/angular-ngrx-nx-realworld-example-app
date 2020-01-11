import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { NgrxErrorState } from './ngrx-error.reducer';
import * as NgrxErrorActions from './ngrx-error.actions';

@Injectable()
export class NgrxErrorFacade {
  constructor(private store: Store<NgrxErrorState>) {}

  throw401Error(error: HttpErrorResponse) {
    this.store.dispatch(NgrxErrorActions.throw401Error({ error }));
  }

  throw404Error(error: HttpErrorResponse) {
    this.store.dispatch(NgrxErrorActions.throw404Error({ error }));
  }
}
