import { NgrxForms, NgrxFormsState } from './ngrx-forms.interfaces';
import { NgrxFormsAction } from './ngrx-forms.actions';
import { ngrxFormsInitialState } from './ngrx-forms.init';

export function ngrxFormsReducer(state: NgrxForms, action: NgrxFormsAction): NgrxForms {
	switch (action.type) {
		case '[ngrxForms] SET_DATA': {
			return { ...state, data: action.payload };
		}
		case '[ngrxForms] UPDATE_DATA': {
			const data = { ...state.data, ...action.payload };
			return { ...state, data, touched: true };
		}
		case '[ngrxForms] SET_STRUCTURE': {
			const structure = action.payload.slice(0);
			return { ...state, structure };
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
		case '[ngrxForms] RESET_FORM': {
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
