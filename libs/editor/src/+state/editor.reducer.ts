import { Editor, EditorState } from './editor.interfaces';
import { EditorAction } from './editor.actions';

export function editorReducer(state: Editor, action: EditorAction): Editor {
  switch (action.type) {
    case '[editor] SET_DATA': {
      return { ...state, data: action.payload };
    }
    case '[editor] SET_STRUCTURE': {
      return { ...state, structure: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const getStructure = (state: EditorState) => state.editor.structure;
export const getData = (state: EditorState) => state.editor.data;
export const isValid = (state: EditorState) => state.editor.valid;
