import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState } from './auth.reducer';
import { authQuery } from './auth.selectors';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthFacade {
  auht$ = this.store.select(authQuery.getAuth);
  user$ = this.store.select(authQuery.getUser);
  isLoggedIn$ = this.store.select(authQuery.getLoggedIn);

  constructor(private store: Store<AuthState>) {}

  login() {
    this.store.dispatch(AuthActions.login());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  register() {
    this.store.dispatch(AuthActions.register());
  }

  user() {
    this.store.dispatch(AuthActions.getUser());
  }
}
