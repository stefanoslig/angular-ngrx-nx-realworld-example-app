import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NgrxFormsEffects } from './+state/ngrx-forms.effects';
import { ngrxFormsFeature } from './+state/ngrx-forms.reducer';
import { InputComponent } from './fields/input/input.component';
import { TextareaComponent } from './fields/textarea/textarea.component';

@NgModule({
  declarations: [InputComponent, TextareaComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(ngrxFormsFeature),
    EffectsModule.forFeature([NgrxFormsEffects]),
    ReactiveFormsModule,
  ],
})
export class NgrxFormsModule {}
