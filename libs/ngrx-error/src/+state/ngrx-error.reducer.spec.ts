import { ngrxErrorReducer } from './ngrx-error.reducer';
import { ngrxErrorInitialState } from './ngrx-error.init';
import { NgrxError } from './ngrx-error.interfaces';
import { DataLoaded } from './ngrx-error.actions';

describe('ngrxErrorReducer', () => {
  it('should work', () => {
    const state: NgrxError = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = ngrxErrorReducer(state, action);
    expect(actual).toEqual({});
  });
});
