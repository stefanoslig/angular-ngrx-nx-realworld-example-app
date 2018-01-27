import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { LoadData } from './app.actions';
import { AppState } from './app.interfaces';

@Injectable()
export class AppEffects {
	@Effect()
	loadData = this.dataPersistence.fetch('LOAD_DATA', {
		run: (action: LoadData, state: AppState) => {
			return {
				type: 'DATA_LOADED',
				payload: {}
			};
		},

		onError: (action: LoadData, error) => {
			console.error('Error', error);
		}
	});

	constructor(private actions: Actions, private dataPersistence: DataPersistence<AppState>) { }
}
