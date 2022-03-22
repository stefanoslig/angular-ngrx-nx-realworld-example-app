import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { authQuery } from './auth.selectors';
import * as AuthActions from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  auth$ = this.store.select(authQuery.selectAuthState);
  user$ = this.store.select(authQuery.selectUser);
  isLoggedIn$ = this.store.select(authQuery.selectLoggedIn);

  constructor(private store: Store) {}

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
