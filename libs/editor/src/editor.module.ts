import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { editorReducer } from './+state/editor.reducer';
import { editorInitialState } from './+state/editor.init';
import { EditorEffects } from './+state/editor.effects';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-form/dynamic-field.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './fields/input/input.component';
import { TextareaComponent } from './fields/textarea/textarea.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		StoreModule.forFeature('editor', editorReducer, { initialState: editorInitialState }),
		EffectsModule.forFeature([EditorEffects])
	],
	providers: [EditorEffects],
	declarations: [DynamicFormComponent, DynamicFieldDirective, InputComponent, TextareaComponent],
	entryComponents: [InputComponent, TextareaComponent]
})
export class EditorModule { }
