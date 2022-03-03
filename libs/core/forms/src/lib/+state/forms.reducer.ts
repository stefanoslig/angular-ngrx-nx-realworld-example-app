import { Errors, Field } from './forms.interfaces';
import * as NgrxFormsActions from './forms.actions';
import { createFeature, createReducer, on } from '@ngrx/store';

export interface NgrxFormsState {
  data: any;
  structure: Field[];
  valid: boolean;
  errors: Errors;
  touched: boolean;
}

export const ngrxFormsInitialState: NgrxFormsState = {
  data: {},
  structure: [],
  valid: true,
  errors: {},
  touched: false,
};

export const ngrxFormsFeature = createFeature({
  name: 'ngrxForms',
  reducer: createReducer(
    ngrxFormsInitialState,
    on(NgrxFormsActions.setData, (state, action) => ({ ...state, data: action.data })),
    on(NgrxFormsActions.updateData, (state, action) => {
      const data = { ...state.data, ...action.data };
      return { ...state, data, touched: true };
    }),
    on(NgrxFormsActions.setStructure, (state, action) => ({ ...state, structure: action.structure.slice(0) })),
    on(NgrxFormsActions.setErrors, (state, action) => ({ ...state, errors: action.errors })),
    on(NgrxFormsActions.initializeErrors, (state) => ({ ...state, errors: {} })),
    on(NgrxFormsActions.initializeForm, () => ngrxFormsInitialState),
    on(NgrxFormsActions.resetForm, (state) => ({ ...state, touched: false })),
  ),
});
