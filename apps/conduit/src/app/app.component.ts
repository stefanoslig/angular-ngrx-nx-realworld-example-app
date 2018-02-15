import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthState, User } from '@angular-ngrx-nx/auth/src/+state/auth.interfaces';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';
import { LocalStorageJwtService } from '@angular-ngrx-nx/core/src/local-storage-jwt.service';
import { take } from 'rxjs/operators/take';
import { filter } from 'rxjs/operators/filter';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
	user$: Observable<User>;
	isLoggedIn$: Observable<boolean>;

	constructor(private store: Store<AuthState>, private localStorageJwtService: LocalStorageJwtService) { }

	ngOnInit() {
		this.user$ = this.store.select(fromAuth.getUser);
		this.isLoggedIn$ = this.store.select(fromAuth.getLoggedIn);
		this.localStorageJwtService.getItem().pipe(take(1), filter(token => !!token)).subscribe(token => {
			this.store.dispatch({ type: '[auth] GET_USER' })
		})
	}
}
