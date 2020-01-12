import { Errors } from './ngrx-forms.interfaces';
import { props, createAction } from '@ngrx/store';

export const setData = createAction('[ngrxForms] SET_DATA', props<{ data: any }>());
export const updateData = createAction('[ngrxForms] UPDATE_DATA', props<{ data: any }>());
export const setStructure = createAction('[ngrxForms] SET_STRUCTURE', props<{ structure: any }>());
export const setErrors = createAction('[ngrxForms] SET_ERRORS', props<{ errors: Errors }>());
export const initializeErrors = createAction('[ngrxForms] INITIALIZE_ERRORS');
export const initializeForm = createAction('[ngrxForms] INITIALIZE_FORM');
export const resetForm = createAction('[ngrxForms] RESET_FORM');
