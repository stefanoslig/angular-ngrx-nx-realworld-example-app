import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { NgrxErrorState } from './ngrx-error.interfaces';
import { ThrowError } from './ngrx-error.actions';
import { map } from 'rxjs/operators/map';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators/switchMap';

@Injectable()
export class NgrxErrorEffects {
	@Effect()
	error401 = this.actions
		.ofType<ThrowError>('[ngrx-error] THROW_401_ERROR')
		.pipe(switchMap(_ => of({ type: '[Router] Go', payload: { path: ['/login'] } })));

	constructor(private actions: Actions, private store: Store<any>) { }
}
