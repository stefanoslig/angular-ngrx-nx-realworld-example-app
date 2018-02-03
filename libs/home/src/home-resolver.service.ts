import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { homeInitialState } from './+state/home.init';
import { take } from 'rxjs/operators/take';

@Injectable()
export class HomeResolverService {
	constructor(private store: Store<any>) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		this.store.dispatch({ type: '[home] LOAD_TAGS' });
		return of(true);
	}
}
