import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NgrxErrorEffects } from './+state/ngrx-error.effects';
import { ngrxErrorInitialState } from './+state/ngrx-error.init';
import { ngrxErrorReducer } from './+state/ngrx-error.reducer';
import { NgrxErrorHandler } from './ngrx-error.service';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('ngrxError', ngrxErrorReducer, { initialState: ngrxErrorInitialState }),
		EffectsModule.forFeature([NgrxErrorEffects])
	],
	providers: [
		NgrxErrorEffects,
		{
			provide: ErrorHandler,
			useClass: NgrxErrorHandler
		}
	]
})
export class NgrxErrorModule { }
