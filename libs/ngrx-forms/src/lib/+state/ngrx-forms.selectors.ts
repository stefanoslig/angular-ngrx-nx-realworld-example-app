import { ngrxFormsFeature } from './ngrx-forms.reducer';

export const { selectNgrxFormsState, selectData, selectErrors, selectStructure, selectTouched, selectValid } =
  ngrxFormsFeature;

export const ngrxFormsQuery = {
  selectNgrxFormsState,
  selectData,
  selectErrors,
  selectStructure,
  selectTouched,
  selectValid,
};
