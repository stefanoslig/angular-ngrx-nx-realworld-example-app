import { ApiService } from '@angular-ngrx-nx/api/src/api.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { tap } from 'rxjs/operators/tap';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

import { LocalStorageJwtService } from '../local-storage-jwt.service';
import { GetUser, SetUser } from './auth.actions';

@Injectable()
export class AuthEffects {
	@Effect()
	getUser = this.actions.ofType<GetUser>('GET_USER').pipe(
		withLatestFrom(this.localStorageJwtService.getItem()),
		filter(([_, token]) => !!token),
		switchMap(item =>
			this.apiService.get('/user').pipe(
				map((data: any) => ({
					type: 'SET_USER',
					payload: data.user
				})),
				catchError(error =>
					of({
						type: 'SET_USER',
						payload: ''
					})
				)
			)
		)
	);

	@Effect()
	setUser = this.actions
		.ofType<SetUser>('SET_USER')
		.pipe(tap(action => this.localStorageJwtService.setItem(action.payload.token)));

	constructor(
		private actions: Actions,
		private localStorageJwtService: LocalStorageJwtService,
		private apiService: ApiService
	) { }
}
