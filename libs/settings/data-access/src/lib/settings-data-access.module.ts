import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SettingsEffects } from './+state/settings.effects';

@NgModule({
  imports: [EffectsModule.forFeature([SettingsEffects])],
})
export class SettingsDataAccessModule {}
