import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NgrxFormsEffects } from './+state/ngrx-forms.effects';
import { NgrxFormsFacade } from './+state/ngrx-forms.facade';
import { ngrxFormsFeature } from './+state/ngrx-forms.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(ngrxFormsFeature), EffectsModule.forFeature([NgrxFormsEffects])],
  providers: [NgrxFormsEffects, NgrxFormsFacade],
})
export class NgrxFormsModule {}
