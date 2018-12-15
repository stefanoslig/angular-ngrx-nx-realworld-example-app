import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { GetUser, Login, Logout, Register } from './auth.actions';
import { AuthState } from './auth.reducer';
import { authQuery } from './auth.selectors';

@Injectable()
export class AuthFacade {
	auht$ = this.store.select(authQuery.getAuth);
	user$ = this.store.select(authQuery.getUser);
	isLoggedIn$ = this.store.select(authQuery.getLoggedIn);

	constructor(private store: Store<AuthState>) { }

	login() {
		this.store.dispatch(new Login());
	}

	logout() {
		this.store.dispatch(new Logout());
	}

	register() {
		this.store.dispatch(new Register());
	}

	user() {
		this.store.dispatch(new GetUser());
	}
}
