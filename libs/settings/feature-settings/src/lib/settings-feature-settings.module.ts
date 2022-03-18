import { AuthGuardService } from '@angular-ngrx-nx-realworld-example-app/auth';
import { SettingsDataAccessModule } from '@realworld/settings/data-access';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';

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
