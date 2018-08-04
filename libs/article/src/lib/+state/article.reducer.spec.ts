import { articleReducer } from './article.reducer';
import { articleInitialState } from './article.init';
import { Article } from './article.interfaces';
import { DataLoaded } from './article.actions';

describe('articleReducer', () => {
  it('should work', () => {
    const state: Article = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = articleReducer(state, action);
    expect(actual).toEqual({});
  });
});
