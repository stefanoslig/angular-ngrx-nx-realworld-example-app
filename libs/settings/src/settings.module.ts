import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { settingsReducer } from './+state/settings.reducer';
import { settingsInitialState } from './+state/settings.init';
import { SettingsEffects } from './+state/settings.effects';
import { NgrxFormsModule } from '@angular-ngrx-nx/ngrx-forms';
import { SettingsService } from '@angular-ngrx-nx/settings/src/settings.service';
import { CoreModule } from '@angular-ngrx-nx/core';
import { AuthGuardService } from '@angular-ngrx-nx/auth/src/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgrxFormsModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: SettingsComponent }]),
    StoreModule.forFeature('settings', settingsReducer, { initialState: settingsInitialState }),
    EffectsModule.forFeature([SettingsEffects])
  ],
  declarations: [SettingsComponent],
  providers: [SettingsEffects, SettingsService]
})
export class SettingsModule {}
