import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { authQuery } from './auth.selectors';
import { authActions } from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  auth$ = this.store.select(authQuery.selectAuthState);
  user$ = this.store.select(authQuery.selectUser);
  isLoggedIn$ = this.store.select(authQuery.selectLoggedIn);

  constructor(private store: Store) {}

  login() {
    this.store.dispatch(authActions.login());
  }

  logout() {
    this.store.dispatch(authActions.logout());
  }

  register() {
    this.store.dispatch(authActions.register());
  }

  getUser() {
    this.store.dispatch(authActions.getUser());
  }
}
