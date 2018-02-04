import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthState, User } from '@angular-ngrx-nx/auth/src/+state/auth.interfaces';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	user$: Observable<User>;
	isLoggedIn$: Observable<boolean>;

	constructor(private store: Store<AuthState>) { }

	ngOnInit() {
		this.user$ = this.store.select(fromAuth.getUser);
		this.isLoggedIn$ = this.store.select(fromAuth.getLoggedIn);
		this.store.dispatch({
			type: '[auth] GET_USER'
		});
	}
}
