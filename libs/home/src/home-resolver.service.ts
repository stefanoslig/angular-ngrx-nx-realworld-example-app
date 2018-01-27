import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';

import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';

@Injectable()
export class HomeResolverService {
	constructor(private store: Store<any>) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		this.store.select(fromAuth.getLoggedIn).subscribe(isLoggedIn => {
			if (isLoggedIn) {
				this.store.dispatch({ type: 'SET_LIST_CONFIG', payload: { type: 'FEED', filters: {} } });
			} else {
				this.store.dispatch({ type: 'SET_LIST_CONFIG', payload: { type: 'ALL', filters: {} } });
			}
		});

		return of(true);
	}
}
