import { NgrxForms, NgrxFormsState } from './ngrx-forms.interfaces';
import { NgrxFormsAction } from './ngrx-forms.actions';
import { ngrxFormsInitialState } from './ngrx-forms.init';

export function ngrxFormsReducer(state: NgrxForms, action: NgrxFormsAction): NgrxForms {
	switch (action.type) {
		case '[ngrxForms] SET_DATA': {
			return { ...state, data: action.payload };
		}
		case '[ngrxForms] SET_STRUCTURE': {
			return { ...state, structure: action.payload };
		}
		case '[ngrxForms] SET_ERRORS': {
			return { ...state, errors: action.payload };
		}
		case '[ngrxForms] INITIALIZE_ERRORS': {
			return { ...state, errors: {} };
		}
		case '[ngrxForms] INITIALIZE_FORM': {
			return ngrxFormsInitialState;
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
