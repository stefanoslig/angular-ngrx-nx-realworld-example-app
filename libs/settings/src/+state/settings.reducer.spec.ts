import { settingsReducer } from './settings.reducer';
import { settingsInitialState } from './settings.init';
import { Settings } from './settings.interfaces';
import { DataLoaded } from './settings.actions';

describe('settingsReducer', () => {
  it('should work', () => {
    const state: Settings = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = settingsReducer(state, action);
    expect(actual).toEqual({});
  });
});
