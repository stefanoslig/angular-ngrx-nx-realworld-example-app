import { NgrxFormsModule } from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { SettingsService } from '@angular-ngrx-nx-realworld-example-app/settings/src/settings.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SettingsEffects } from './+state/settings.effects';
import { settingsInitialState } from './+state/settings.init';
import { settingsReducer } from './+state/settings.reducer';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
	imports: [
		CommonModule,
		NgrxFormsModule,
		RouterModule.forChild([{ path: '', pathMatch: 'full', component: SettingsComponent }]),
		StoreModule.forFeature('settings', settingsReducer, { initialState: settingsInitialState }),
		EffectsModule.forFeature([SettingsEffects])
	],
	declarations: [SettingsComponent],
	providers: [SettingsEffects, SettingsService]
})
export class SettingsModule { }
