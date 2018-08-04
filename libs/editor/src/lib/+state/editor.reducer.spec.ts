import { editorReducer } from './editor.reducer';
import { editorInitialState } from './editor.init';
import { Editor } from './editor.interfaces';
import { DataLoaded } from './editor.actions';

describe('editorReducer', () => {
  it('should work', () => {
    const state: Editor = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = editorReducer(state, action);
    expect(actual).toEqual({});
  });
});
