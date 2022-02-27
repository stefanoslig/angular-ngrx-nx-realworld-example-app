import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ErrorHandlerState } from './error-handler.reducer';
import * as ErrorHandlerActions from './error-handler.actions';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerFacade {
  constructor(private store: Store<ErrorHandlerState>) {}

  throw401Error(error: HttpErrorResponse) {
    this.store.dispatch(ErrorHandlerActions.throw401Error({ error }));
  }

  throw404Error(error: HttpErrorResponse) {
    this.store.dispatch(ErrorHandlerActions.throw404Error({ error }));
  }
}
