import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { AuthGuardService } from '@realworld/auth/data-access';
import { SettingsEffects } from '@realworld/settings/data-access';
import { SettingsComponent } from './settings.component';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [AuthGuardService],
    providers: [importProvidersFrom(EffectsModule.forFeature([SettingsEffects]))],
  },
];
