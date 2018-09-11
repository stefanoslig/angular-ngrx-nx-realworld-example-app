import { Errors } from './ngrx-forms.reducer';
import { Action } from '@ngrx/store';

export enum NgrxFormsActionTypes {
  SET_DATA = '[ngrxForms] SET_DATA',
  UPDATE_DATA = '[ngrxForms] UPDATE_DATA',
  SET_STRUCTURE = '[ngrxForms] SET_STRUCTURE',
  SET_ERRORS = '[ngrxForms] SET_ERRORS',
  INITIALIZE_ERRORS = '[ngrxForms] INITIALIZE_ERRORS',
  INITIALIZE_FORM = '[ngrxForms] INITIALIZE_FORM',
  RESET_FORM = '[ngrxForms] RESET_FORM'
}

export class SetData implements Action {
  readonly type = NgrxFormsActionTypes.SET_DATA;
  constructor(public payload: any) {}
}

export class UpdateData implements Action {
  readonly type = NgrxFormsActionTypes.UPDATE_DATA;
  constructor(public payload: any) {}
}

export class SetStructure implements Action {
  readonly type = NgrxFormsActionTypes.SET_STRUCTURE;
  constructor(public payload: any) {}
}

export class SetErrors implements Action {
  readonly type = NgrxFormsActionTypes.SET_ERRORS;
  constructor(public payload: Errors) {}
}

export class InitializeErrors implements Action {
  readonly type = NgrxFormsActionTypes.INITIALIZE_ERRORS;
}

export class InitializeForm implements Action {
  readonly type = NgrxFormsActionTypes.INITIALIZE_FORM;
}

export class ResetForm implements Action {
  readonly type = NgrxFormsActionTypes.RESET_FORM;
}

export type NgrxFormsAction =
  | SetData
  | UpdateData
  | SetStructure
  | SetErrors
  | InitializeErrors
  | InitializeForm
  | ResetForm;
