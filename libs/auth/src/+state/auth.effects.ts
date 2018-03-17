import { ApiService } from '@angular-ngrx-nx-realworld-example-app/api';
import { AuthService } from '@angular-ngrx-nx-realworld-example-app/auth/src/auth.service';
import { LocalStorageJwtService } from '@angular-ngrx-nx-realworld-example-app/core';
import { NgrxFormsState } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import * as fromNgrxForms from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { concatMap } from 'rxjs/operators/concatMap';
import { exhaustMap } from 'rxjs/operators/exhaustMap';
import { map } from 'rxjs/operators/map';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { switchMap } from 'rxjs/operators/switchMap';
import { tap } from 'rxjs/operators/tap';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

import { GetUser, Login, Register, SetLocalStorage, AuthActionTypes } from './auth.actions';
import * as fromActions from './auth.actions';

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
	getUser = this.actions.ofType<GetUser>(AuthActionTypes.GET_USER).pipe(
		switchMap(item =>
			this.apiService.get('/user').pipe(
				map((data: any) => new fromActions.SetUser(data.user)),
				catchError(error => of(new fromActions.GetUserFail(error)))
			)
		)
	);

	@Effect()
	login = this.actions.ofType<Login>(AuthActionTypes.LOGIN).pipe(
		withLatestFrom(this.store.select(fromNgrxForms.getData)),
		exhaustMap(([action, data]) =>
			this.authService.authUser('LOGIN', data).pipe(
				mergeMap(result => [
					new fromActions.SetLocalStorage(result.user.token),
					new fromActions.LoginSuccess()
				]),
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
	register = this.actions.ofType<Register>(AuthActionTypes.REGISTER).pipe(
		withLatestFrom(this.store.select(fromNgrxForms.getData)),
		exhaustMap(([action, data]) =>
			this.authService.authUser('REGISTER', data).pipe(
				mergeMap(result => [
					new fromActions.SetLocalStorage(result.user.token),
					new fromActions.RegisterSuccess()
				]),
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
	setLocalStorage = this.actions
		.ofType<SetLocalStorage>(AuthActionTypes.SET_LOCAL_STORAGE)
		.pipe(
			map(action => action.payload),
			tap(token => this.localStorageJwtService.setItem(token)),
			concatMap(_ => [new fromActions.GetUser(), { type: '[Router] Go', payload: { path: ['/'] } }])
		);

	@Effect()
	removeoLcalStorage = this.actions
		.ofType<SetLocalStorage>(AuthActionTypes.REMOVE_LOCAL_STORAGE)
		.pipe(
			map(action => action.payload),
			tap(token => this.localStorageJwtService.removeItem()),
			concatMap(_ => [new fromActions.InializeUser(), { type: '[Router] Go', payload: { path: ['/'] } }])
		);

	constructor(
		private actions: Actions,
		private localStorageJwtService: LocalStorageJwtService,
		private apiService: ApiService,
		private store: Store<NgrxFormsState>,
		private authService: AuthService
	) { }
}
