import { ApiService } from '@angular-ngrx-nx/api/src/api.service';
import { AuthService } from '@angular-ngrx-nx/auth/src/auth.service';
import { SaveForm } from '@angular-ngrx-nx/editor/src/+state/editor.actions';
import { EditorState } from '@angular-ngrx-nx/editor/src/+state/editor.interfaces';
import * as fromEditor from '@angular-ngrx-nx/editor/src/+state/editor.reducer';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
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
	getUser = this.actions.ofType<GetUser>('[auth] GET_USER').pipe(
		withLatestFrom(this.localStorageJwtService.getItem()),
		filter(([_, token]) => !!token),
		switchMap(item =>
			this.apiService.get('/user').pipe(
				map((data: any) => ({
					type: '[auth] SET_USER',
					payload: data.user
				})),
				catchError(error =>
					of({
						type: '[auth] SET_USER',
						payload: ''
					})
				)
			)
		)
	);

	@Effect()
	setUser = this.actions
		.ofType<SetUser>('[auth] SET_USER')
		.pipe(tap(action => this.localStorageJwtService.setItem(action.payload.token)));

	@Effect()
	saveForm = this.actions
		.ofType<SaveForm>('[editor] SAVE_FORM')
		.pipe(
		withLatestFrom(this.store.select(fromEditor.getdata)),
		switchMap(([action, data]) =>
			this.authService
				.authUser(action.payload.formType, data)
				.pipe(
				map(data => this.localStorageJwtService.setItem(data.user.token)),
				catchError(err => of({ type: '[editor] SAVE_FORM_FAIL' }))
				)
		)
		);

	constructor(
		private actions: Actions,
		private localStorageJwtService: LocalStorageJwtService,
		private apiService: ApiService,
		private store: Store<EditorState>,
		private authService: AuthService,
		private router: Router
	) { }
}
