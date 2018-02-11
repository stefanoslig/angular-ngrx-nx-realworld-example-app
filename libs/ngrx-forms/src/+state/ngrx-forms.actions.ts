import { Errors } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.interfaces';

export interface SetData {
  type: '[ngrxForms] SET_DATA';
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

export type NgrxFormsAction = SetData | SetStructure | SetErrors | InitializeErrors;
