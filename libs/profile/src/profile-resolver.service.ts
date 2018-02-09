import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Profile } from '@angular-ngrx-nx/profile/src/+state/profile.interfaces';
import { Store } from '@ngrx/store';

@Injectable()
export class ProfileResolverService implements Resolve<Profile>  {
	constructor(private store: Store<any>) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		const username = route.params['username'];
		this.store.dispatch({
			type: '[profile] GET_PROFILE',
			payload: username
		});
	}
}
