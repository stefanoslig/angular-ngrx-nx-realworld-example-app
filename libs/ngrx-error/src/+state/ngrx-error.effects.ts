import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { NgrxErrorState } from './ngrx-error.interfaces';
import { Throw401Error, Throw404Error, NgrxErrorActionTypes } from './ngrx-error.actions';
import { map } from 'rxjs/operators/map';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators/switchMap';
import * as fromActions from './ngrx-error.actions';

@Injectable()
export class NgrxErrorEffects {
	@Effect()
	error401 = this.actions
		.ofType<Throw401Error>(NgrxErrorActionTypes.THROW_401_ERROR)
		.pipe(map(_ => ({ type: '[Router] Go', payload: { path: ['/login'] } })));

	@Effect()
	error404 = this.actions
		.ofType<Throw404Error>(NgrxErrorActionTypes.THROW_404_ERROR)
		.pipe(map(_ => ({ type: '[Router] Go', payload: { path: ['/'] } })));

	constructor(private actions: Actions, private store: Store<any>) { }
}
