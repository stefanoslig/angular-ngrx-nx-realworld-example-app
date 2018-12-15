import { AuthFacade, GetUser } from '@angular-ngrx-nx-realworld-example-app/auth';
import { NgrxFormsFacade, SetErrors } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { SettingsService } from '../settings.service';
import { EditSettings, SettingsActionTypes } from './settings.actions';

@Injectable()
export class SettingsEffects {
	@Effect()
	editSettings = this.actions.ofType<EditSettings>(SettingsActionTypes.EDIT_SETTINGS).pipe(
		withLatestFrom(this.ngrxFormsFacade.data$, this.authFacade.user$),
		map(([_, data, user]) => ({
			...user,
			image: data.image,
			username: data.username,
			bio: data.bio,
			pass: data.pass,
			email: data.email
		})),
		concatMap(data =>
			this.settingsService
				.update(data)
				.pipe(
					mergeMap(result => [new GetUser(), { type: '[router] Go', payload: { path: ['profile', result.username] } }]),
					catchError(result => of(new SetErrors(result.error.errors)))
				)
		)
	);

	constructor(
		private actions: Actions,
		private settingsService: SettingsService,
		private authFacade: AuthFacade,
		private ngrxFormsFacade: NgrxFormsFacade
	) { }
}
