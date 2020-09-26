import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NgrxFormsEffects } from './+state/ngrx-forms.effects';
import { NgrxFormsFacade } from './+state/ngrx-forms.facade';
import { ngrxFormsInitialState, ngrxFormsReducer, ngrxFormsFeatureKey } from './+state/ngrx-forms.reducer';
import { DynamicFieldDirective } from './dynamic-form/dynamic-field.directive';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { InputComponent } from './fields/input/input.component';
import { TextareaComponent } from './fields/textarea/textarea.component';
import { ListErrorsComponent } from './list-errors/list-errors.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(ngrxFormsFeatureKey, ngrxFormsReducer, {
      initialState: ngrxFormsInitialState,
    }),
    EffectsModule.forFeature([NgrxFormsEffects]),
  ],
  providers: [NgrxFormsEffects, NgrxFormsFacade],
  declarations: [DynamicFormComponent, DynamicFieldDirective, InputComponent, TextareaComponent, ListErrorsComponent],
  entryComponents: [InputComponent, TextareaComponent],
  exports: [DynamicFormComponent, ListErrorsComponent],
})
export class NgrxFormsModule {}
