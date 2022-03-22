import { SettingsDataAccessModule } from '@realworld/settings/data-access';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { AuthGuardService } from '@realworld/auth/data-access';

@NgModule({
  imports: [
    SettingsDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: SettingsComponent,
        canActivate: [AuthGuardService],
      },
    ]),
  ],
})
export class SettingsFeatureSettingsModule {}
