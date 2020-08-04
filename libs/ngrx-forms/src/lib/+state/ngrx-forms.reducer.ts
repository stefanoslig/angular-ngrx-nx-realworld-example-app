import { NgrxForms } from './ngrx-forms.interfaces';
import * as NgrxFormsActions from './ngrx-forms.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const ngrxFormsFeatureKey = 'ngrxForms';

export interface NgrxFormsState {
  readonly [ngrxFormsFeatureKey]: NgrxForms;
}

export const ngrxFormsInitialState: NgrxForms = {
  data: {},
  structure: [],
  valid: true,
  errors: {},
  touched: false,
};

const reducer = createReducer(
  ngrxFormsInitialState,
  on(NgrxFormsActions.setData, (state, action) => ({ ...state, data: action.data })),
  on(NgrxFormsActions.updateData, (state, action) => {
    const data = { ...state.data, ...action.data };
    return { ...state, data, touched: true };
  }),
  on(NgrxFormsActions.setStructure, (state, action) => ({ ...state, structure: action.structure.slice(0) })),
  on(NgrxFormsActions.setErrors, (state, action) => ({ ...state, errors: action.errors })),
  on(NgrxFormsActions.initializeErrors, (state, action) => ({ ...state, errors: {} })),
  on(NgrxFormsActions.initializeForm, (state, action) => ngrxFormsInitialState),
  on(NgrxFormsActions.resetForm, (state, action) => ({ ...state, touched: false })),
);

export function ngrxFormsReducer(state: NgrxForms | undefined, action: Action): NgrxForms {
  return reducer(state, action);
}
