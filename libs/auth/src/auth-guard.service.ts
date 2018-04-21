import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';

import { AuthState } from './+state/auth.interfaces';

@Injectable()
export class AuthGuardService implements CanActivate {
	constructor(private store: Store<AuthState>, private router: Router) { }

	canActivate(): Observable<boolean> {
		return this.store.select('auth').pipe(map(auth => {
			if (!auth.loggedIn) {
				this.router.navigate(['/login']);
				return false;
			}

			return true;
		}), take(1));
	}
}
