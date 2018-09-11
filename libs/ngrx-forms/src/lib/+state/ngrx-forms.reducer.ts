import { ValidatorFn } from '@angular/forms';

import { NgrxFormsAction, NgrxFormsActionTypes } from './ngrx-forms.actions';

export interface NgrxForms {
  data: any;
  structure: Field[];
  valid: boolean;
  errors: Errors;
  touched: boolean;
}

export interface NgrxFormsState {
  readonly ngrxForms: NgrxForms;
}

export interface Field {
  type: FieldType;
  name: string;
  label?: string;
  placeholder?: string;
  validator?: ValidatorFn[];
  attrs?: any;
}

export type FieldType = 'INPUT' | 'TEXTAREA';

export interface Errors {
  [key: string]: string;
}

export const ngrxFormsInitialState: NgrxForms = {
  data: {},
  structure: [],
  valid: true,
  errors: {},
  touched: false
};

export function ngrxFormsReducer(state: NgrxForms, action: NgrxFormsAction): NgrxForms {
  switch (action.type) {
    case NgrxFormsActionTypes.SET_DATA: {
      return { ...state, data: action.payload };
    }
    case NgrxFormsActionTypes.UPDATE_DATA: {
      const data = { ...state.data, ...action.payload };
      return { ...state, data, touched: true };
    }
    case NgrxFormsActionTypes.SET_STRUCTURE: {
      const structure = action.payload.slice(0);
      return { ...state, structure };
    }
    case NgrxFormsActionTypes.SET_ERRORS: {
      return { ...state, errors: action.payload };
    }
    case NgrxFormsActionTypes.INITIALIZE_ERRORS: {
      return { ...state, errors: {} };
    }
    case NgrxFormsActionTypes.INITIALIZE_FORM: {
      return ngrxFormsInitialState;
    }
    case NgrxFormsActionTypes.RESET_FORM: {
      return { ...state, touched: false };
    }
    default: {
      return state;
    }
  }
}
