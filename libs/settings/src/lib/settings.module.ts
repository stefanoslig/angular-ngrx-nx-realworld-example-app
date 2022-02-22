import { AuthGuardService } from '@angular-ngrx-nx-realworld-example-app/auth';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SettingsEffects } from './+state/settings.effects';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: SettingsComponent,
        canActivate: [AuthGuardService],
      },
    ]),
    EffectsModule.forFeature([SettingsEffects]),
  ],
})
export class SettingsModule {}
