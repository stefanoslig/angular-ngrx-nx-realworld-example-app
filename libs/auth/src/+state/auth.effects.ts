import { ApiService } from '@angular-ngrx-nx/api/src/api.service';
import { AuthService } from '@angular-ngrx-nx/auth/src/auth.service';
import { NgrxFormsState } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.interfaces';
import * as fromNgrxForms from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.reducer';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { switchMap } from 'rxjs/operators/switchMap';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

import { GetUser, Login, Register, SetLocalStorage } from './auth.actions';
import { LocalStorageJwtService } from '@angular-ngrx-nx/core/src/local-storage-jwt.service';
import { tap } from 'rxjs/operators/tap';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

class MyError implements Error {
	name: string;
	message: string;
	constructor(private initialError: Response) {
		this.name = initialError.statusText;
	}
}

@Injectable()
export class AuthEffects {
	@Effect()
	getUser = this.actions.ofType<GetUser>('[auth] GET_USER').pipe(
		switchMap(item =>
			this.apiService.get('/user').pipe(
				map((data: any) => ({
					type: '[auth] SET_USER',
					payload: data.user
				})),
				catchError(error =>
					of({
						type: '[auth] GET_USER_FAIL',
						payload: error
					})
				)
			)
		)
	);

	@Effect()
	login = this.actions.ofType<Login>('[auth] LOGIN').pipe(
		withLatestFrom(this.store.select(fromNgrxForms.getData)),
		switchMap(([action, data]) =>
			this.authService.authUser('LOGIN', data).pipe(
				mergeMap(result => {
					return [
						{ type: '[auth] SET_LOCAL_STORAGE', payload: result.user.token },
						{ type: '[auth] LOGIN_SUCCESS' }
					];
				}),
				catchError(result =>
					of({
						type: '[ngrxForms] SET_ERRORS',
						payload: result.error.errors
					})
				)
			)
		)
	);

	@Effect()
	register = this.actions.ofType<Register>('[auth] REGISTER').pipe(
		withLatestFrom(this.store.select(fromNgrxForms.getData)),
		switchMap(([action, data]) =>
			this.authService.authUser('REGISTER', data).pipe(
				mergeMap(result => {
					return [
						{ type: '[auth] SET_LOCAL_STORAGE', payload: result.user.token },
						{ type: '[auth] REGISTER_SUCCESS' }
					];
				}),
				catchError(result =>
					of({
						type: '[ngrxForms] SET_ERRORS',
						payload: result.error.errors
					})
				)
			)
		)
	);

	@Effect()
	setLocalStorage = this.actions.ofType<SetLocalStorage>('[auth] SET_LOCAL_STORAGE').pipe(
		map(action => action.payload),
		switchMap(token => this.localStorageJwtService.setItem(token).pipe(
			mergeMap(_ => ([
				{ type: '[auth] GET_USER' },
				{ type: '[Router] Go', payload: { path: ['/'] } }
			]))
		))
	);

	@Effect()
	removeoLcalStorage = this.actions.ofType<SetLocalStorage>('[auth] REMOVE_LOCAL_STORAGE').pipe(
		map(action => action.payload),
		switchMap(token => this.localStorageJwtService.removeItem().pipe(
			mergeMap(_ => ([
				{ type: '[auth] INITIALIZE_USER' },
				{ type: '[Router] Go', payload: { path: ['login'] } }
			]))
		))
	);

	constructor(
		private actions: Actions,
		private localStorageJwtService: LocalStorageJwtService,
		private apiService: ApiService,
		private store: Store<NgrxFormsState>,
		private authService: AuthService
	) { }
}
