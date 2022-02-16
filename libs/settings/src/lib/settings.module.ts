import { AuthGuardService } from '@angular-ngrx-nx-realworld-example-app/auth';
import {
  DynamicFormComponentModule,
  ListErrorsComponentModule,
} from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { SettingsService } from './settings.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SettingsEffects } from './+state/settings.effects';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    ListErrorsComponentModule,
    DynamicFormComponentModule,
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
  declarations: [SettingsComponent],
  providers: [SettingsService],
})
export class SettingsModule {}
