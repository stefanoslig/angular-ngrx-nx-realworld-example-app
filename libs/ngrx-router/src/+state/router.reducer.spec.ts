import { routerReducer } from './router.reducer';
import { routerInitialState } from './router.init';
import { Router } from './router.interfaces';
import { DataLoaded } from './router.actions';

describe('routerReducer', () => {
  it('should work', () => {
    const state: Router = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = routerReducer(state, action);
    expect(actual).toEqual({});
  });
});
