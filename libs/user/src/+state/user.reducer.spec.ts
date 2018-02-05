import { userReducer } from './user.reducer';
import { userInitialState } from './user.init';
import { User } from './user.interfaces';
import { DataLoaded } from './user.actions';

describe('userReducer', () => {
  it('should work', () => {
    const state: User = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = userReducer(state, action);
    expect(actual).toEqual({});
  });
});
