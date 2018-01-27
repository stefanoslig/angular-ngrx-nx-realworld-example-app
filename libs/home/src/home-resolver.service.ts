import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { homeInitialState } from './+state/home.init';

@Injectable()
export class HomeResolverService {
	constructor(private store: Store<any>) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		this.store.select(fromAuth.getLoggedIn).subscribe(isLoggedIn => {
			if (isLoggedIn) {
				this.store.dispatch({ type: '[home] SET_LIST_CONFIG', payload: { type: 'FEED', currentPage: 1, filters: homeInitialState.listConfig.filters } });
				this.store.dispatch({ type: '[home] LOAD_ARTICLES' });
			} else {
				this.store.dispatch({ type: '[home] SET_LIST_CONFIG', payload: { type: 'ALL', currentPage: 1, filters: homeInitialState.listConfig.filters } });
				this.store.dispatch({ type: '[home] LOAD_ARTICLES' });
			}
		});

		return of(true);
	}
}
