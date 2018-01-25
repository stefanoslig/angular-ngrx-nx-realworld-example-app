import { authReducer } from './auth.reducer';
import { authInitialState } from './auth.init';
import { Auth } from './auth.interfaces';
import { DataLoaded } from './auth.actions';

describe('authReducer', () => {
  it('should work', () => {
    const state: Auth = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = authReducer(state, action);
    expect(actual).toEqual({});
  });
});
