import { NgrxForms, NgrxFormsState } from './ngrx-forms.interfaces';
import { NgrxFormsAction, NgrxFormsActionTypes } from './ngrx-forms.actions';
import { ngrxFormsInitialState } from './ngrx-forms.init';

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

export const getStructure = (state: NgrxFormsState) => state.ngrxForms.structure;
export const getData = (state: NgrxFormsState) => state.ngrxForms.data;
export const isValid = (state: NgrxFormsState) => state.ngrxForms.valid;
export const getErrors = (state: NgrxFormsState) => state.ngrxForms.errors;
export const getTouchedForm = (state: NgrxFormsState) => state.ngrxForms.touched;
