import { ApiService } from '@angular-ngrx-nx-realworld-example-app/api';
import { AuthService } from '../auth.service';
import { NgrxFormsState, NgrxFormsFacade } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import * as fromNgrxForms from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import * as fromActions from './auth.actions';
import { AuthActionTypes, GetUser, Login, LoginSuccess, Register, RegisterSuccess, Logout } from './auth.actions';
import { LocalStorageJwtService } from '../local-storage-jwt.service';

@Injectable()
export class AuthEffects {
	@Effect()
	getUser$ = this.actions
		.ofType<GetUser>(AuthActionTypes.GET_USER)
		.pipe(
			switchMap(item =>
				this.authService.user()
					.pipe(
						map(data => new fromActions.GetUserSuccess(data.user)),
						catchError(error => of(new fromActions.GetUserFail(error)))
					)
			)
		);

	@Effect()
	login$ = this.actions
		.ofType<Login>(AuthActionTypes.LOGIN)
		.pipe(
			withLatestFrom(this.ngrxFormsFacade.data$),
			exhaustMap(([action, data]) =>
				this.authService
					.login(data)
					.pipe(
						map(user => new fromActions.LoginSuccess(user)),
						catchError(result => of(new fromNgrxForms.SetErrors(result.error.errors)))
					)
			)
		);

	@Effect({ dispatch: false })
	loginOrRegisterSuccess$ = this.actions
		.ofType<LoginSuccess | RegisterSuccess>(AuthActionTypes.LOGIN_SUCCESS, AuthActionTypes.REGISTER_SUCCESS)
		.pipe(
			tap(action => {
				this.localStorageJwtService.setItem(action.payload.token);
				this.router.navigateByUrl('/');
			})
		);

	@Effect()
	register$ = this.actions
		.ofType<Register>(AuthActionTypes.REGISTER)
		.pipe(
			withLatestFrom(this.ngrxFormsFacade.data$),
			exhaustMap(([action, data]) =>
				this.authService
					.register(data)
					.pipe(
						map(user => new fromActions.RegisterSuccess(user)),
						catchError(result => of(new fromNgrxForms.SetErrors(result.error.errors)))
					)
			)
		);

	@Effect({ dispatch: false })
	logout$ = this.actions.ofType<Logout>(AuthActionTypes.LOGOUT).pipe(
		tap(action => {
			this.localStorageJwtService.removeItem();
			this.router.navigateByUrl('/login');
		})
	);

	constructor(
		private actions: Actions,
		private localStorageJwtService: LocalStorageJwtService,
		private ngrxFormsFacade: NgrxFormsFacade,
		private authService: AuthService,
		private router: Router
	) { }
}
