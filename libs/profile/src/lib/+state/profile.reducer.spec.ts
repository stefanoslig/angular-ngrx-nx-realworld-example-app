import { profileReducer } from './profile.reducer';
import { profileInitialState } from './profile.init';
import { Profile } from './profile.interfaces';
import { DataLoaded } from './profile.actions';

describe('profileReducer', () => {
  it('should work', () => {
    const state: Profile = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = profileReducer(state, action);
    expect(actual).toEqual({});
  });
});
