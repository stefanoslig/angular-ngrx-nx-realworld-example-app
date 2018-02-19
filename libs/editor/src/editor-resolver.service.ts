import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Resolve } from '@angular/router/src/interfaces';

@Injectable()
export class EditorResolverService implements Resolve<Observable<boolean>> {
	constructor(private store: Store<any>) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		const slug = route.params['slug'];
		if (slug) {
			this.store.dispatch({
				type: '[editor] LOAD_ARTICLE',
				payload: slug
			});
		}
		return of(true);
	}
}
