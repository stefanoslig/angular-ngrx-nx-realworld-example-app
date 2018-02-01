import { Options } from '@angular-ngrx-nx/editor/src/+state/editor.interfaces';

export interface SetData {
  type: '[editor] SET_DATA';
  payload: any;
}

export interface SetStructure {
  type: '[editor] SET_STRUCTURE';
  payload: any;
}

export interface SaveForm {
  type: '[editor] SAVE_FORM';
  payload: Options;
}

export interface SaveFormSuccess {
  type: '[editor] SAVE_FORM_SUCCESS';
}

export interface SaveFormFail {
  type: '[editor] SAVE_FORM_FAIL';
}

export type EditorAction = SetData | SaveForm | SaveFormSuccess | SaveFormFail | SetStructure;
