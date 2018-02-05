import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { EditSettings } from './settings.actions';
import { SettingsState } from './settings.interfaces';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { Store } from '@ngrx/store';
import * as fromNgrxForms from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.reducer';
import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';

import { switchMap } from 'rxjs/operators/switchMap';
import { SettingsService } from '@angular-ngrx-nx/settings/src/settings.service';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';

@Injectable()
export class SettingsEffects {
	@Effect()
	editSettings = this.actions.ofType<EditSettings>('[settings] EDIT_SETTINGS').pipe(
		withLatestFrom(this.store.select(fromNgrxForms.getData), this.store.select(fromAuth.getUser)),
		map(([_, data, user]) => ({ ...user, image: data.image, username: data.username, bio: data.bio, pass: data.pass, email: data.email })),
		switchMap(data =>
			this.settingsService.update(data).pipe(
				mergeMap(result => {
					return [{ type: '[auth] SET_USER' }, { type: '[Router] Go', payload: { path: ['/'] } }];
				})
			)
		)
	);

	constructor(private actions: Actions, private store: Store<any>, private settingsService: SettingsService) { }
}
