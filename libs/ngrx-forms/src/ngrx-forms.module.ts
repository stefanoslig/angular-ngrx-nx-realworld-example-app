import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ngrxFormsReducer } from './+state/ngrx-forms.reducer';
import { ngrxFormsInitialState } from './+state/ngrx-forms.init';
import { NgrxFormsEffects } from './+state/ngrx-forms.effects';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-form/dynamic-field.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './fields/input/input.component';
import { TextareaComponent } from './fields/textarea/textarea.component';
import { ListErrorsComponent } from './list-errors/list-errors.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		StoreModule.forFeature('ngrxForms', ngrxFormsReducer, { initialState: ngrxFormsInitialState }),
		EffectsModule.forFeature([NgrxFormsEffects])
	],
	providers: [NgrxFormsEffects],
	declarations: [DynamicFormComponent, DynamicFieldDirective, InputComponent, TextareaComponent, ListErrorsComponent],
	entryComponents: [InputComponent, TextareaComponent],
	exports: [DynamicFormComponent, ListErrorsComponent]
})
export class NgrxFormsModule { }
