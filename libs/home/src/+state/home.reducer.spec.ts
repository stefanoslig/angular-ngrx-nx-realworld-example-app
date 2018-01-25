import { homeReducer } from './home.reducer';
import { homeInitialState } from './home.init';
import { Home } from './home.interfaces';
import { DataLoaded } from './home.actions';

describe('homeReducer', () => {
  it('should work', () => {
    const state: Home = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = homeReducer(state, action);
    expect(actual).toEqual({});
  });
});
