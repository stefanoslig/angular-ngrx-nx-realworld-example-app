import { articleListReducer } from './article-list.reducer';
import { articleListInitialState } from './article-list.init';
import { ArticleList } from './article-list.interfaces';
import { DataLoaded } from './article-list.actions';

describe('articleListReducer', () => {
  it('should work', () => {
    const state: ArticleList = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = articleListReducer(state, action);
    expect(actual).toEqual({});
  });
});
