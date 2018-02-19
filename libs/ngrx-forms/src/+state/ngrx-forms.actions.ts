import { Errors } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.interfaces';

export interface SetData {
	type: '[ngrxForms] SET_DATA';
	payload: any;
}

export interface UpdateData {
	type: '[ngrxForms] UPDATE_DATA';
	payload: any;
}

export interface SetStructure {
	type: '[ngrxForms] SET_STRUCTURE';
	payload: any;
}

export interface SetErrors {
	type: '[ngrxForms] SET_ERRORS';
	payload: Errors;
}

export interface InitializeErrors {
	type: '[ngrxForms] INITIALIZE_ERRORS';
}

export interface InitializeForm {
	type: '[ngrxForms] INITIALIZE_FORM';
}

export type NgrxFormsAction = SetData | UpdateData | SetStructure | SetErrors | InitializeErrors | InitializeForm;
