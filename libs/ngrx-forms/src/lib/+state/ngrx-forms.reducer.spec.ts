import { ngrxFormsReducer } from './ngrx-forms.reducer';
import { ngrxFormsInitialState } from './ngrx-forms.init';
import { NgrxForms } from './ngrx-forms.interfaces';
import { DataLoaded } from './ngrx-forms.actions';

describe('ngrxFormsReducer', () => {
  it('should work', () => {
    const state: NgrxForms = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = ngrxFormsReducer(state, action);
    expect(actual).toEqual({});
  });
});
