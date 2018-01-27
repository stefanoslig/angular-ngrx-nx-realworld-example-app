import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromHome from './+state/home.reducer';
import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';
import { ArticleListConfig, Home, HomeState } from './+state/home.interfaces';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	listConfig$: Observable<ArticleListConfig>;
	isAuthenticated: boolean;

	constructor(private store: Store<any>, private router: Router) { }

	ngOnInit() {
		this.listConfig$ = this.store.select(fromHome.getListConfig);
		this.store.select(fromAuth.getLoggedIn).subscribe(isLoggedIn => (this.isAuthenticated = isLoggedIn));
	}

	setListTo(type: string) {
		if (type === 'FEED' && !this.isAuthenticated) {
			this.router.navigate([`/login`]);
			return;
		}

		this.store.dispatch({
			type: 'SET_LIST_CONFIG',
			payload: {
				type: type
			}
		});
	}
}
