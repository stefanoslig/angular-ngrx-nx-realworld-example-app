import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { NgrxErrorActionTypes, Throw401Error, Throw404Error } from './ngrx-error.actions';

@Injectable()
export class NgrxErrorEffects {
	@Effect()
	error401 = this.actions
		.ofType<Throw401Error>(NgrxErrorActionTypes.THROW_401_ERROR)
		.pipe(map(_ => ({ type: '[router] Go', payload: { path: ['/login'] } })));

	@Effect()
	error404 = this.actions
		.ofType<Throw404Error>(NgrxErrorActionTypes.THROW_404_ERROR)
		.pipe(map(_ => ({ type: '[router] Go', payload: { path: ['/'] } })));

	constructor(private actions: Actions) { }
}
